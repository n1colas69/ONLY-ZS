// ============================================================
// FAVORITOS — lógica pura
// ------------------------------------------------------------
// Una lista de slugs, nada más. El estado y localStorage se
// manejan en src/lib/store.ts.
// ============================================================

import type { ProductLite } from '@/types';

export function toggleWish(wishlist: string[], slug: string): string[] {
  return wishlist.includes(slug)
    ? wishlist.filter((item) => item !== slug)
    : [...wishlist, slug];
}

export function isWished(wishlist: string[], slug: string): boolean {
  return wishlist.includes(slug);
}

export function removeWish(wishlist: string[], slug: string): string[] {
  return wishlist.filter((item) => item !== slug);
}

/**
 * Cruza favoritos con el catálogo, en el orden en que se fueron
 * guardando. Los slugs que ya no existen se descartan solos.
 */
export function resolveWishlist(wishlist: string[], catalog: ProductLite[]): ProductLite[] {
  return wishlist
    .map((slug) => catalog.find((product) => product.slug === slug))
    .filter((product): product is ProductLite => product !== undefined);
}
