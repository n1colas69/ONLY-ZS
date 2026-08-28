// ============================================================
// CARRITO — lógica pura
// ------------------------------------------------------------
// Este archivo NO toca el DOM ni React: son funciones que reciben
// un carrito y devuelven otro. Por eso se puede testear (ver tests/).
// El estado y localStorage se manejan en src/lib/store.ts.
//
// Para modificar:
// - unidades máximas por pieza:  MAX_QTY_PER_ITEM
// - qué se puede comprar:        canAddToCart
// ============================================================

import type { CartLine, ProductLite, ResolvedCartLine } from '@/types';

/**
 * Una unidad por pieza.
 * ONLY ZS vende vintage: cada prenda es única, no hay dos iguales.
 * En el sitio viejo esto pasaba por accidente (una función devolvía 1
 * siempre); acá es una decisión explícita.
 */
export const MAX_QTY_PER_ITEM = 1;

/** Solo se puede agregar al carrito lo que está disponible. */
export function canAddToCart(product: Pick<ProductLite, 'status' | 'price'>): boolean {
  return product.status === 'available' && product.price !== null;
}

export function addLine(cart: CartLine[], slug: string): CartLine[] {
  const existing = cart.find((line) => line.slug === slug);
  if (!existing) return [...cart, { slug, qty: 1 }];
  if (existing.qty >= MAX_QTY_PER_ITEM) return cart;
  return cart.map((line) =>
    line.slug === slug ? { ...line, qty: line.qty + 1 } : line
  );
}

export function removeLine(cart: CartLine[], slug: string): CartLine[] {
  return cart.filter((line) => line.slug !== slug);
}

/** Cambia la cantidad. Si queda en 0 o menos, la línea se elimina. */
export function setQty(cart: CartLine[], slug: string, qty: number): CartLine[] {
  if (qty <= 0) return removeLine(cart, slug);
  const clamped = Math.min(qty, MAX_QTY_PER_ITEM);
  return cart.map((line) => (line.slug === slug ? { ...line, qty: clamped } : line));
}

export function clearCart(): CartLine[] {
  return [];
}

export function isInCart(cart: CartLine[], slug: string): boolean {
  return cart.some((line) => line.slug === slug);
}

export function countItems(cart: CartLine[]): number {
  return cart.reduce((total, line) => total + line.qty, 0);
}

/**
 * Cruza el carrito con el catálogo.
 *
 * Importante: el carrito guarda SOLO el slug y la cantidad. El precio,
 * el nombre y la foto se leen siempre del catálogo actual. Así, si
 * cambiás un precio, los carritos guardados en el navegador de la
 * gente se actualizan solos. El sitio viejo guardaba una copia entera
 * del producto y quedaba con precios viejos para siempre.
 *
 * Si una pieza se vendió o se borró mientras estaba en un carrito,
 * la línea simplemente desaparece.
 */
export function resolveCart(cart: CartLine[], catalog: ProductLite[]): ResolvedCartLine[] {
  const lines: ResolvedCartLine[] = [];
  for (const line of cart) {
    const product = catalog.find((p) => p.slug === line.slug);
    if (!product || !canAddToCart(product)) continue;
    const qty = Math.min(line.qty, MAX_QTY_PER_ITEM);
    lines.push({ product, qty, lineTotal: (product.price ?? 0) * qty });
  }
  return lines;
}

export function cartSubtotal(lines: ResolvedCartLine[]): number {
  return lines.reduce((total, line) => total + line.lineTotal, 0);
}

/**
 * El total es igual al subtotal: el envío se cotiza por WhatsApp,
 * porque depende de la ubicación y no se paga en la web.
 */
export function cartTotal(lines: ResolvedCartLine[]): number {
  return cartSubtotal(lines);
}
