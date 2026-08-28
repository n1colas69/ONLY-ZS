/**
 * Script de migración de un solo uso.
 * Lee legacy/js/data.js, reorganiza las fotos y emite src/data/products.ts
 *
 * Se corre una sola vez:  node scripts/migrate-products.mjs
 * Después el archivo generado se revisa y edita a mano.
 */
import fs from 'node:fs';
import path from 'node:path';

const src = fs.readFileSync('legacy/js/data.js', 'utf8');
const { productsData } = new Function(src + '\nreturn { productsData };')();

// ---------------------------------------------------------------
// Marcas: se detectan por palabra clave, del más específico al más general.
// ---------------------------------------------------------------
const BRAND_RULES = [
  [/russell/i, 'Russell'],
  [/gildan/i, 'Gildan'],
  [/chaps/i, 'Chaps'],
  [/champion/i, 'Champion'],
  [/dickies/i, 'Dickies'],
  [/carhartt/i, 'Carhartt'],
  [/nautica/i, 'Nautica'],
  [/columbia/i, 'Columbia'],
  [/l\.?\s?l\.?[\s-]?bean/i, 'L.L. Bean'],
  [/levi/i, "Levi's"],
  [/tommy/i, 'Tommy Hilfiger'],
  [/missoni/i, 'Missoni'],
  [/dockers/i, 'Dockers'],
  [/wrangler/i, 'Wrangler'],
  [/lacoste/i, 'Lacoste'],
  [/casio/i, 'Casio'],
  [/john[\s-]?deere/i, 'John Deere'],
  [/goodyear/i, 'Goodyear'],
  [/real[\s-]?tree/i, 'Real Tree'],
  [/adidas/i, 'Adidas'],
  [/nike/i, 'Nike'],
  [/paisano/i, "Paisano's"],
  [/ralph\s?lauren|polo/i, 'Polo Ralph Lauren'],
];

/** Marcas que el texto no deja deducir y se fijan a mano. */
const BRAND_OVERRIDES = {
  'camiseta-nike-boca': 'Nike',
  'sueter-vintage': 'Sin marca',
  'remera-vintage': 'Sin marca',
};

function detectBrand(product) {
  if (BRAND_OVERRIDES[product.id]) return BRAND_OVERRIDES[product.id];
  const haystack = `${product.id} ${product.name} ${product.description || ''}`;
  for (const [re, brand] of BRAND_RULES) if (re.test(haystack)) return brand;
  return 'Sin marca';
}

// ---------------------------------------------------------------
// Categorías: "Buzos" se absorbe dentro de "abrigos" (ver MIGRATION.md §8)
// ---------------------------------------------------------------
const CATEGORY_MAP = {
  Abrigos: 'abrigos',
  Buzos: 'abrigos',
  Remeras: 'remeras',
  Camisas: 'camisas',
  Pantalones: 'pantalones',
  Camisetas: 'camisetas',
  Accesorios: 'accesorios',
};

// ---------------------------------------------------------------
// Parseo de la descripción: separa talle, estado y medidas del texto.
// ---------------------------------------------------------------
const MEASURE_LABEL = /^(largo|ancho|cintura|mangas?|medidas)\s*:?\s*(.+)$/i;
const LOOSE_MEASURE = /^(\d+\s*x\s*\d+|\d+\s*cm\b|.*\bde\s+(cintura|largo|ancho)\b.*|.*\bcm\s+de\b.*)$/i;

function parseDescription(raw) {
  const lines = (raw || '').split('\n').map((l) => l.trim()).filter(Boolean);
  let size = null;
  let condition = null;
  const measurements = [];
  const prose = [];

  for (const line of lines) {
    // "Talle: XL"
    let m = line.match(/^talle\s*:\s*(.+)$/i);
    if (m) { size = m[1].replace(/\.$/, '').trim(); continue; }

    // "Talle L: 70cm de largo por 58cm de ancho."  -> talle + medidas en una línea
    m = line.match(/^talle\s+(.+?)\s*:\s*(.+)$/i);
    if (m) {
      size = m[1].trim();
      measurements.push(m[2].replace(/\.$/, '').trim());
      continue;
    }

    // "Estado: 10/10." o el typo "State: 9/10."
    m = line.match(/^(?:estado|state)\s*:?\s*(.+)$/i);
    if (m) { condition = m[1].replace(/\.$/, '').trim(); continue; }

    // "Largo: 66cm", "Medidas: 70x64", "Ancho 48cm"
    m = line.match(MEASURE_LABEL);
    if (m) {
      const label = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
      measurements.push(`${label}: ${m[2].replace(/\.$/, '').trim()}`);
      continue;
    }

    // Medidas sin etiqueta: "75x61", "68cm de largo", "48 de Cintura"
    if (LOOSE_MEASURE.test(line) && line.length < 60) {
      measurements.push(line.replace(/\.$/, '').trim());
      continue;
    }

    prose.push(line);
  }

  return {
    size,
    condition,
    measurements: measurements.length ? measurements.join(' · ') : null,
    description: prose.join('\n'),
  };
}

// ---------------------------------------------------------------
// Tags: sirven para la búsqueda. Marca + categoría + color + tipo de prenda.
// ---------------------------------------------------------------
const TAG_WORDS = [
  'workwear', 'hoodie', 'crewneck', 'puffer', 'polar', 'chomba', 'camisa',
  'jean', 'cargo', 'carpintero', 'rompevientos', 'sueter', 'chaleco',
  'musculosa', 'bermuda', 'short', 'gorra', 'pasamontañas', 'balaclava',
  'reloj', 'vintage', 'deportivo', 'capucha', 'spell out', 'piqué', 'pique',
  'beige', 'negro', 'azul', 'rojo', 'gris', 'verde', 'blanco', 'naranja',
  'rosa', 'marron', 'marrón', 'camuflado', 'camo', 'multicolor', 'crudo',
  'rayas', 'cuadrille', 'bordado', 'estampado',
];

function buildTags(product, brand, categorySlug) {
  const haystack = `${product.name} ${product.description || ''}`.toLowerCase();
  const tags = new Set();
  if (brand !== 'Sin marca') tags.add(brand.toLowerCase());
  tags.add(categorySlug);
  for (const word of TAG_WORDS) if (haystack.includes(word)) tags.add(word);
  if (/pink/i.test(haystack)) tags.add('rosa');
  return [...tags];
}

// ---------------------------------------------------------------
// Slug: el id viejo, sin apóstrofos ni acentos. Corrige dos typos.
// ---------------------------------------------------------------
const SLUG_OVERRIDES = {
  "sueter-levi's": 'sueter-levis',      // el apóstrofo rompía el onclick del sitio viejo
  'chomba-polo-verda-ml': 'chomba-polo-verde-ml',
};

function toSlug(id) {
  if (SLUG_OVERRIDES[id]) return SLUG_OVERRIDES[id];
  return id
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

// ---------------------------------------------------------------
// Estado
// ---------------------------------------------------------------
function resolveStatus(product, imageCount) {
  if (imageCount === 0) return 'draft';           // sin fotos no se puede publicar
  if (product.isComingSoon === true) return 'coming-soon';
  if (product.inStock === true) return 'available';
  return 'sold';
}

/** Selección editorial para la home. Se cambia a mano cuando quieras. */
const FEATURED = new Set([
  'buzo-nike-capucha',
  'campera-carhartt',
  'hoodie-champion-pink',
  'campera-rompevientos-columbia',
  'pantalon-polo-ralph-lauren',
  'campera-ll-bean',
]);

// ---------------------------------------------------------------
// Migración
// ---------------------------------------------------------------
const PRODUCTS_DIR = 'public/images/products';
fs.mkdirSync(PRODUCTS_DIR, { recursive: true });

const moved = new Set();
const report = [];
const output = [];

for (const product of productsData) {
  const slug = toSlug(product.id);
  const brand = detectBrand(product);
  const category = CATEGORY_MAP[product.category];
  if (!category) throw new Error(`Categoría desconocida: ${product.category} (${product.id})`);

  // Fotos reales: las del array, o la principal si el array está vacío.
  // HERO-ZS.PNG era el placeholder del sitio viejo -> no cuenta como foto.
  const sources = (product.images && product.images.length ? product.images : [product.image])
    .filter(Boolean)
    .filter((p) => !/HERO-ZS/i.test(p));

  const images = [];
  sources.forEach((source, index) => {
    if (!fs.existsSync(source)) {
      report.push(`FALTA  ${slug}: ${source}`);
      return;
    }
    const ext = path.extname(source).toLowerCase();
    const destDir = path.join(PRODUCTS_DIR, slug);
    const dest = path.join(destDir, `${index + 1}${ext}`);
    fs.mkdirSync(destDir, { recursive: true });
    if (!fs.existsSync(dest)) fs.renameSync(source, dest);
    moved.add(path.resolve(source));
    images.push(`/images/products/${slug}/${index + 1}${ext}`);
  });

  const status = resolveStatus(product, images.length);
  const parsed = parseDescription(product.description);

  // Un producto que no está disponible no muestra precio.
  // Así se eliminan los "$0" y los precios de piezas ya vendidas.
  const price = status === 'available' ? (product.price || null) : null;
  if (status === 'available' && !price) report.push(`SIN PRECIO  ${slug}`);

  output.push({
    slug,
    name: product.name,
    brand,
    category,
    price,
    status,
    isNew: product.isNew === true,
    featured: FEATURED.has(slug),
    size: parsed.size,
    condition: parsed.condition,
    measurements: parsed.measurements,
    description: parsed.description,
    images,
    tags: buildTags(product, brand, category),
  });
}

// ---------------------------------------------------------------
// Fotos que no estaban asignadas a ningún producto: no se pierden.
// ---------------------------------------------------------------
const UNASSIGNED_DIR = 'public/images/products/_sin-asignar';
const leftovers = [];
(function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name) && !moved.has(path.resolve(full))) {
      leftovers.push(full);
    }
  }
})('assets/images/Productos');

for (const file of leftovers) {
  const folder = path.basename(path.dirname(file));
  const destDir = path.join(UNASSIGNED_DIR, folder);
  fs.mkdirSync(destDir, { recursive: true });
  fs.renameSync(file, path.join(destDir, path.basename(file)));
}

// ---------------------------------------------------------------
// Emitir src/data/products.ts
// ---------------------------------------------------------------
const q = (value) =>
  value === null ? 'null' : JSON.stringify(value);

const body = output
  .map(
    (p) => `  {
    slug: ${q(p.slug)},
    name: ${q(p.name)},
    brand: ${q(p.brand)},
    category: ${q(p.category)},
    price: ${p.price === null ? 'null' : p.price},
    status: ${q(p.status)},
    isNew: ${p.isNew},
    featured: ${p.featured},
    size: ${q(p.size)},
    condition: ${q(p.condition)},
    measurements: ${q(p.measurements)},
    description: ${q(p.description)},
    images: [
${p.images.map((i) => `      ${q(i)},`).join('\n')}
    ],
    tags: [${p.tags.map(q).join(', ')}],
  },`
  )
  .join('\n');

const header = `import type { Product } from '@/types';

// ============================================================
// CATÁLOGO DE PRODUCTOS
// ------------------------------------------------------------
// Este archivo ES la tienda. No hay base de datos ni panel:
// agregar un producto acá lo publica en el sitio.
//
// Para modificar:
// - agregar producto:  copiá un bloque entero y cambiá los datos
// - cambiar precio:    el campo "price" (número, sin puntos ni $)
// - marcar vendido:    status: 'sold'  (el precio pasa a null)
// - ocultar:           status: 'draft'
// - destacar en home:  featured: true
// - fotos:             ponelas en public/images/products/<slug>/
//
// El ORDEN de esta lista es el orden del catálogo.
// Lo nuevo va ARRIBA.
//
// Guía completa en CUSTOMIZATION.md
// ============================================================

export const products: Product[] = [
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/products.ts', header + body + '\n];\n', 'utf8');

// ---------------------------------------------------------------
console.log(`productos migrados: ${output.length}`);
console.log(`fotos movidas:      ${moved.size}`);
console.log(`sin asignar:        ${leftovers.length} -> ${UNASSIGNED_DIR}`);
const counts = output.reduce((acc, p) => ({ ...acc, [p.status]: (acc[p.status] || 0) + 1 }), {});
console.log('estados:', counts);
console.log('marcas:', [...new Set(output.map((p) => p.brand))].sort().join(', '));
if (report.length) console.log('\nREVISAR:\n' + report.join('\n'));
