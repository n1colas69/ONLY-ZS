// ============================================================
// CATÁLOGO — consultas sobre los productos
// ------------------------------------------------------------
// Todo lo que lee el catálogo pasa por acá. Ninguna página
// importa `products` directamente: así, si algún día los datos
// vienen de otro lado, solo cambia este archivo.
//
// Acá también se le "pegan" las fotos a cada producto: en
// src/data/products.ts no hay ningún campo de fotos — se resuelven
// solas a partir de la carpeta public/images/products/{slug}/, con
// getProductImages() (src/lib/images.ts).
//
// Para modificar:
// - qué se publica:        getPublicProducts (hoy: todo menos 'draft')
// - orden por defecto:     el orden de src/data/products.ts
// - productos relacionados: getRelatedProducts
// - de dónde salen las fotos: src/lib/images.ts
// ============================================================

import { getImageUrl } from '@/data/image-sizes';
import { products as productEntries } from '@/data/products';
import { isForSale } from '@/lib/format';
import { getProductImages } from '@/lib/images';
import type { CategorySlug, Product, ProductEntry, ProductLite } from '@/types';

/** Le agrega las fotos (leídas de la carpeta) a un producto crudo. */
function resolveProduct(entry: ProductEntry): Product {
  return { ...entry, images: getProductImages(entry.slug) };
}

/**
 * Achica un producto a lo que el navegador necesita.
 * El carrito, los favoritos y el buscador trabajan con esto:
 * así no se le manda al celular de cada visitante las 58
 * descripciones largas y todas las listas de fotos.
 */
export function toLite(product: Product): ProductLite {
  return {
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    status: product.status,
    isNew: product.isNew,
    size: product.size,
    // Versionada: esta es la foto que ven la bolsa, favoritos y el
    // buscador. Ninguno de los tres mide la foto con getImageSize
    // (la muestran en una caja de tamaño fijo), así que acá se puede
    // versionar directo sin romper ningún cálculo de proporción.
    image: product.images[0] ? getImageUrl(product.images[0]) : null,
    tags: product.tags,
  };
}

/** El catálogo liviano completo, para pasarle a los componentes de cliente. */
export function getLiteCatalog(): ProductLite[] {
  return getPublicProducts().map(toLite);
}

/**
 * Los productos que el sitio muestra.
 * Los 'draft' quedan afuera de todo: catálogo, búsqueda, sitemap y URLs.
 */
export function getPublicProducts(): Product[] {
  return productEntries.filter((product) => product.status !== 'draft').map(resolveProduct);
}

export function getProduct(slug: string): Product | undefined {
  const entry = productEntries.find((p) => p.slug === slug);
  if (!entry || entry.status === 'draft') return undefined;
  return resolveProduct(entry);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return getPublicProducts().filter((product) => product.category === category);
}

/** Para la home: la selección marcada con featured, o lo disponible más reciente. */
export function getFeaturedProducts(limit = 8): Product[] {
  const featured = getPublicProducts().filter((product) => product.featured);
  if (featured.length >= limit) return featured.slice(0, limit);

  // Completa con lo disponible más reciente, sin repetir.
  const rest = getPublicProducts().filter(
    (product) => isForSale(product.status) && !product.featured
  );
  return [...featured, ...rest].slice(0, limit);
}

/** Últimos ingresos: el orden del archivo de datos ya es "lo nuevo arriba". */
export function getLatestProducts(limit = 8): Product[] {
  return getPublicProducts()
    .filter((product) => isForSale(product.status))
    .slice(0, limit);
}

/**
 * Relacionados: primero la misma marca, después la misma categoría.
 * Prioriza lo disponible, porque mostrar cuatro piezas vendidas
 * al pie de una ficha no le sirve a nadie.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const pool = getPublicProducts().filter((p) => p.slug !== product.slug);

  const score = (p: Product) =>
    (p.brand === product.brand && p.brand !== 'Sin marca' ? 2 : 0) +
    (p.category === product.category ? 1 : 0) +
    (isForSale(p.status) ? 1 : 0);

  return pool
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** Todas las marcas con al menos un producto público, ordenadas alfabéticamente. */
export function getBrands(): string[] {
  const brands = new Set(
    getPublicProducts()
      .map((product) => product.brand)
      .filter((brand) => brand !== 'Sin marca')
  );
  return [...brands].sort((a, b) => a.localeCompare(b, 'es'));
}

/** Cuántas piezas hay en cada categoría. Se usa en los filtros. */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const product of getPublicProducts()) {
    counts[product.category] = (counts[product.category] ?? 0) + 1;
  }
  return counts;
}

/**
 * Portada de una categoría: la foto de tapa de una pieza real de esa
 * categoría, sorteada entre las candidatas — no una foto fija ni
 * siempre la misma pieza. Cambia sola en cada visita (igual que la
 * foto de apertura de la home, ver src/app/page.tsx), así que la
 * página que la muestra tiene que ser dinámica (`force-dynamic` o,
 * como en /categoria/[slug], leer `searchParams`) para que el sorteo
 * pase en cada visita real y no una sola vez en el build.
 *
 * Prioriza lo que se puede comprar (disponible o precio privado)
 * sobre lo vendido; si nada de la categoría se puede comprar, sortea
 * entre lo vendido con tal de no dejar la portada vacía. Si ninguna
 * pieza de la categoría tiene fotos todavía, devuelve null.
 */
export function getCategoryImage(category: CategorySlug): string | null {
  const products = getProductsByCategory(category).filter((product) => product.images[0]);
  const forSale = products.filter((product) => isForSale(product.status));
  const pool = forSale.length > 0 ? forSale : products;
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)]!.images[0]!;
}
