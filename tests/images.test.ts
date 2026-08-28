import { describe, expect, it } from 'vitest';
import { getProductImages } from '@/lib/images';

// ============================================================
// TESTS DEL RESOLVER DE FOTOS
// ------------------------------------------------------------
// Las fotos de un producto no se escriben en ningún archivo de
// datos: se leen directo de public/images/products/{slug}/. Estos
// tests verifican que esa lectura funcione como se espera.
// ============================================================

describe('fotos de un producto (leídas de la carpeta)', () => {
  it('lee las fotos de un producto real, en orden numérico', () => {
    const images = getProductImages('campera-carhartt');
    expect(images.length).toBeGreaterThan(0);
    // La foto "1" es siempre la portada.
    expect(images[0]).toBe('/images/products/campera-carhartt/1.jpg');
  });

  it('ordena por número, no alfabéticamente (10 no va antes que 2)', () => {
    const images = getProductImages('bermuda-dickies-beige');
    const numbers = images.map((src) => Number(src.split('/').pop()?.split('.')[0]));
    expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
  });

  it('una carpeta que no existe da un array vacío, no un error', () => {
    expect(getProductImages('esta-carpeta-no-existe-nunca')).toEqual([]);
  });

  it('las rutas empiezan con /images/products/ y con el slug pedido', () => {
    const images = getProductImages('campera-carhartt');
    expect(images.every((src) => src.startsWith('/images/products/campera-carhartt/'))).toBe(
      true
    );
  });
});
