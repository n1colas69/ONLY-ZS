/**
 * Mide el ancho y alto real de cada foto, y calcula una huella de su
 * contenido. Genera src/data/image-sizes.ts.
 *
 * Correlo cada vez que agregues o cambies fotos:
 *     npm run images
 *
 * Para qué sirve el tamaño:
 * - Next.js necesita saber el tamaño para reservar el espacio y que la
 *   página no "salte" mientras carga.
 * - El catálogo usa la proporción real de cada foto, así ninguna se
 *   recorta y la grilla queda irregular de verdad, no simulada.
 *
 * Para qué sirve la huella (versión):
 * - Las fotos se guardan en caché durante un año (ver next.config.ts,
 *   minimumCacheTTL) tanto en el navegador de cada visita como en el
 *   optimizador de Next. Es a propósito, para que la página cargue
 *   rápido — pero tiene una consecuencia: si REEMPLAZÁS una foto sin
 *   cambiarle el nombre de archivo (pisás products/mi-remera/1.jpg con
 *   otra foto), el navegador de la gente sigue mostrando la vieja
 *   durante ese año entero, porque para él sigue siendo "la misma
 *   URL" y ni siquiera vuelve a pedirla.
 * - La huella resuelve esto sin que nadie tenga que acordarse de
 *   cambiar nombres: es un hash del contenido del archivo. Mientras la
 *   foto no cambie, la huella es siempre la misma. En cuanto cambia un
 *   solo píxel, la huella cambia — y con eso, la URL que arma
 *   `getImageUrl()` (foto.jpg?v=xxxxx) también cambia, así que para el
 *   navegador es una URL nueva que nunca vio: la pide de cero.
 *
 * No usa ninguna librería externa: lee los primeros bytes del archivo
 * para el tamaño, y usa el módulo `crypto` (viene con Node) para la
 * huella.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

/** Lee ancho/alto de un JPEG o PNG ya cargado en memoria. */
function readDimensions(buffer) {
  // PNG: la cabecera IHDR tiene el tamaño en los bytes 16..24
  if (buffer[0] === 0x89 && buffer[1] === 0x50) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // JPEG: hay que recorrer los marcadores hasta encontrar un SOF
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length - 9) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      const isStartOfFrame =
        marker >= 0xc0 && marker <= 0xcf &&
        marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isStartOfFrame) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  }

  return null;
}

/** Huella corta del contenido del archivo: 10 caracteres alcanzan de sobra acá. */
function contentHash(buffer) {
  return crypto.createHash('md5').update(buffer).digest('hex').slice(0, 10);
}

const ROOTS = ['public/images'];
const sizes = {};
const versions = {};
let measured = 0;
let failed = 0;

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    if (!/\.(jpe?g|png)$/i.test(entry.name)) continue;

    const buffer = fs.readFileSync(full);
    const url = '/' + path.relative('public', full).split(path.sep).join('/');
    const dimensions = readDimensions(buffer);
    if (dimensions) {
      sizes[url] = [dimensions.width, dimensions.height];
      versions[url] = contentHash(buffer);
      measured += 1;
    } else {
      console.warn('no se pudo medir:', url);
      failed += 1;
    }
  }
}

for (const root of ROOTS) walk(root);

const sizeEntries = Object.keys(sizes)
  .sort()
  .map((url) => `  '${url}': [${sizes[url][0]}, ${sizes[url][1]}],`)
  .join('\n');

const versionEntries = Object.keys(versions)
  .sort()
  .map((url) => `  '${url}': '${versions[url]}',`)
  .join('\n');

const file = `// ARCHIVO GENERADO — no lo edites a mano.
// Se regenera con:  npm run images
//
// Guarda el tamaño real de cada foto para que Next.js reserve el
// espacio correcto y el catálogo respete la proporción original, y
// una huella de su contenido para que reemplazar una foto (sin
// cambiarle el nombre) se vea al toque — ver la explicación completa
// arriba, en scripts/measure-images.mjs.

export const imageSizes: Record<string, readonly [number, number]> = {
${sizeEntries}
};

const imageVersions: Record<string, string> = {
${versionEntries}
};

/** Proporción por defecto cuando una foto todavía no fue medida. */
export const DEFAULT_ASPECT = [4, 5] as const;

/** Devuelve [ancho, alto] de una foto, o la proporción por defecto. */
export function getImageSize(src: string): readonly [number, number] {
  return imageSizes[src] ?? DEFAULT_ASPECT;
}

/**
 * Agrega la huella de la foto a su dirección ("foto.jpg?v=a1b2c3").
 * Usá esto (no la ruta pelada) en el \`src\` de cualquier <Image> que
 * lea de una foto que se pueda reemplazar con el tiempo (producto,
 * galería, categoría, colaboración): así, si el archivo cambia, el
 * navegador de la gente lo nota solo, sin esperar a que venza el
 * año de caché.
 */
export function getImageUrl(src: string): string {
  const version = imageVersions[src];
  return version ? \`\${src}?v=\${version}\` : src;
}
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/image-sizes.ts', file, 'utf8');
console.log(`medidas: ${measured} fotos${failed ? `, ${failed} fallaron` : ''}`);
