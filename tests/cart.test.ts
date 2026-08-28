import { describe, expect, it } from 'vitest';
import {
  addLine,
  canAddToCart,
  cartSubtotal,
  cartTotal,
  clearCart,
  countItems,
  isInCart,
  MAX_QTY_PER_ITEM,
  removeLine,
  resolveCart,
  setQty,
} from '@/lib/cart';
import type { CartLine, ProductLite } from '@/types';

// ============================================================
// TESTS DEL CARRITO
// ------------------------------------------------------------
// Estos tests existen para que un cambio futuro no rompa la
// compra sin que nadie se entere. Se corren con:  npm test
//
// Si cambiás una regla a propósito (por ejemplo, permitir más de
// una unidad por pieza), actualizá el test que corresponda.
// ============================================================

const producto = (overrides: Partial<ProductLite> = {}): ProductLite => ({
  slug: 'campera-carhartt',
  name: 'Campera Carhartt',
  brand: 'Carhartt',
  category: 'abrigos',
  price: 50000,
  status: 'available',
  isNew: false,
  size: 'L',
  image: '/images/products/campera-carhartt/1.jpg',
  tags: ['carhartt'],
  ...overrides,
});

describe('qué se puede comprar', () => {
  it('acepta una pieza disponible con precio', () => {
    expect(canAddToCart(producto())).toBe(true);
  });

  it('rechaza una pieza vendida', () => {
    expect(canAddToCart(producto({ status: 'sold', price: null }))).toBe(false);
  });

  it('rechaza una pieza que viene "próximamente"', () => {
    expect(canAddToCart(producto({ status: 'coming-soon', price: null }))).toBe(false);
  });

  it('rechaza una pieza sin precio, aunque figure disponible', () => {
    expect(canAddToCart(producto({ price: null }))).toBe(false);
  });
});

describe('agregar y quitar', () => {
  it('agrega una pieza nueva', () => {
    expect(addLine([], 'a')).toEqual([{ slug: 'a', qty: 1 }]);
  });

  it('NO duplica: cada prenda vintage es única', () => {
    const once = addLine([], 'a');
    const twice = addLine(once, 'a');
    expect(countItems(twice)).toBe(MAX_QTY_PER_ITEM);
    expect(twice).toHaveLength(1);
  });

  it('quita una pieza sin tocar las demás', () => {
    const cart: CartLine[] = [
      { slug: 'a', qty: 1 },
      { slug: 'b', qty: 1 },
    ];
    expect(removeLine(cart, 'a')).toEqual([{ slug: 'b', qty: 1 }]);
  });

  it('poner la cantidad en 0 elimina la línea', () => {
    expect(setQty([{ slug: 'a', qty: 1 }], 'a', 0)).toEqual([]);
  });

  it('nunca deja pasar de una unidad', () => {
    expect(setQty([{ slug: 'a', qty: 1 }], 'a', 9)).toEqual([{ slug: 'a', qty: 1 }]);
  });

  it('vaciar deja el carrito en cero', () => {
    expect(clearCart()).toEqual([]);
    expect(countItems(clearCart())).toBe(0);
  });

  it('sabe si algo ya está adentro', () => {
    expect(isInCart([{ slug: 'a', qty: 1 }], 'a')).toBe(true);
    expect(isInCart([{ slug: 'a', qty: 1 }], 'b')).toBe(false);
  });
});

describe('cruce con el catálogo', () => {
  const catalogo = [
    producto(),
    producto({ slug: 'sueter-levis', name: "Suéter Levi's", price: 30000 }),
  ];

  it('usa SIEMPRE el precio actual del catálogo, no el guardado', () => {
    const lines = resolveCart([{ slug: 'campera-carhartt', qty: 1 }], [
      producto({ price: 61000 }),
    ]);
    expect(lines[0]?.lineTotal).toBe(61000);
  });

  it('descarta una pieza que se vendió mientras estaba en el carrito', () => {
    const lines = resolveCart([{ slug: 'campera-carhartt', qty: 1 }], [
      producto({ status: 'sold', price: null }),
    ]);
    expect(lines).toHaveLength(0);
  });

  it('descarta una pieza que ya no existe en el catálogo', () => {
    expect(resolveCart([{ slug: 'no-existe', qty: 1 }], catalogo)).toHaveLength(0);
  });

  it('suma bien el total', () => {
    const lines = resolveCart(
      [
        { slug: 'campera-carhartt', qty: 1 },
        { slug: 'sueter-levis', qty: 1 },
      ],
      catalogo
    );
    expect(cartSubtotal(lines)).toBe(80000);
    // El total es igual al subtotal: el envío se cotiza por WhatsApp.
    expect(cartTotal(lines)).toBe(80000);
  });

  it('un carrito vacío suma cero', () => {
    expect(cartSubtotal([])).toBe(0);
  });
});
