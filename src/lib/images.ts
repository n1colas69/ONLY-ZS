import fs from 'node:fs';
import path from 'node:path';

// ============================================================
// FOTOS DE UN PRODUCTO — resueltas desde la carpeta
// ------------------------------------------------------------
// Este es el sistema de imágenes: las fotos de un producto NO se
// escriben a mano en ningún archivo de código. Se leen directo de
//
//     public/images/products/{slug}/
//
// Convención:
// - los archivos se numeran: 1.jpg, 2.jpg, 3.jpg…
// - el número decide el orden. El "1" es siempre la portada.
// - formatos válidos: .jpg, .jpeg, .png, .webp, .avif
//
// Para agregar una foto a un producto que ya existe: soltala en
// su carpeta con el número que sigue. Para reemplazar una: pisá el
// archivo con el mismo nombre. Para un producto nuevo: creá la
// carpeta con el slug exacto del producto y numerá las fotos
// desde 1. En los tres casos, después corré `npm run images` y
// listo — no hay que tocar ningún componente ni archivo de datos.
//
// Guía completa (con capturas del flujo) en CUSTOMIZATION.md.
// ============================================================

const PRODUCTS_DIR = path.join(process.cwd(), 'public', 'images', 'products');
const VALID_EXTENSION = /\.(jpe?g|png|webp|avif)$/i;

/** Extrae el número inicial de un nombre de archivo: "10.jpg" -> 10. */
function leadingNumber(filename: string): number | null {
  const match = filename.match(/^(\d+)/);
  return match ? Number(match[1]) : null;
}

/**
 * Lee las fotos de un producto directo de su carpeta, en orden.
 * Si la carpeta no existe o está vacía, devuelve un array vacío
 * (el producto se muestra sin foto, no rompe la página).
 */
export function getProductImages(slug: string): string[] {
  const dir = path.join(PRODUCTS_DIR, slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((filename) => VALID_EXTENSION.test(filename))
    .sort((a, b) => {
      const numA = leadingNumber(a);
      const numB = leadingNumber(b);
      // Orden numérico cuando los dos nombres empiezan con número
      // (evita el clásico bug de "10" ordenado antes que "2").
      if (numA !== null && numB !== null) return numA - numB;
      return a.localeCompare(b, 'es');
    })
    .map((filename) => `/images/products/${slug}/${filename}`);
}
