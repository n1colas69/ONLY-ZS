// ============================================================
// BÚSQUEDA
// ------------------------------------------------------------
// Búsqueda instantánea sobre el catálogo. Sin backend, sin índice:
// son 58 productos, filtrar un array es instantáneo.
//
// Busca en: nombre, marca, categoría, talle y tags.
// (El sitio viejo solo buscaba nombre y categoría, así que no se
// podía encontrar nada escribiendo "carhartt" o "XL".)
//
// Para modificar:
// - qué campos se buscan:  haystack()
// - cuántos resultados:    el parámetro `limit`
// ============================================================

import { getCategoryName } from '@/data/categories';
import { isForSale } from '@/lib/format';
import type { ProductLite } from '@/types';

/** Saca acentos y pasa a minúsculas: "Pantalón" y "pantalon" son lo mismo. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

/**
 * Lo mínimo que necesita una pieza para poder buscarse.
 * Lo cumplen tanto `Product` (servidor) como `ProductLite`
 * (navegador), así que la misma función sirve para los dos.
 */
export type Searchable = Pick<
  ProductLite,
  'name' | 'brand' | 'category' | 'size' | 'tags' | 'status'
>;

function haystack(product: Searchable): string {
  return normalize(
    [
      product.name,
      product.brand,
      getCategoryName(product.category),
      product.size ?? '',
      product.tags.join(' '),
    ].join(' ')
  );
}

/**
 * Todos los términos tienen que aparecer (búsqueda tipo AND).
 * Así "carhartt campera" encuentra la campera Carhartt y no
 * todo lo que sea Carhartt o toda campera.
 */
export function searchProducts<T extends Searchable>(catalog: T[], query: string, limit?: number): T[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const results = catalog.filter((product) => {
    const text = haystack(product);
    return terms.every((term) => text.includes(term));
  });

  // Lo disponible primero: es lo que la persona puede comprar ahora.
  const sorted = results.sort((a, b) => {
    const rank = (p: Searchable) => (isForSale(p.status) ? 0 : 1);
    return rank(a) - rank(b);
  });

  return limit ? sorted.slice(0, limit) : sorted;
}
