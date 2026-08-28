import { describe, expect, it } from 'vitest';
import {
  applyFilters,
  buildHref,
  countActiveFilters,
  EMPTY_FILTERS,
  hasActiveFilters,
  parseFilters,
  parseSort,
  sortProducts,
} from '@/lib/filters';
import { normalize, searchProducts } from '@/lib/search';
import type { ProductLite } from '@/types';

// ============================================================
// TESTS DE BÚSQUEDA Y FILTROS
// ============================================================

const CATEGORIES = ['abrigos', 'remeras', 'pantalones', 'camisas', 'camisetas', 'accesorios'];

const p = (overrides: Partial<ProductLite> & { slug: string }): ProductLite => ({
  name: 'Pieza',
  brand: 'Sin marca',
  category: 'abrigos',
  price: 20000,
  status: 'available',
  isNew: false,
  size: null,
  image: null,
  tags: [],
  ...overrides,
});

const catalogo: ProductLite[] = [
  p({
    slug: 'campera-carhartt',
    name: 'Campera Carhartt',
    brand: 'Carhartt',
    price: 50000,
    size: 'L',
    tags: ['carhartt', 'abrigos', 'workwear'],
  }),
  p({
    slug: 'bermuda-dickies-beige',
    name: 'Bermuda Dickies Beige',
    brand: 'Dickies',
    category: 'pantalones',
    price: 25000,
    size: '40 US',
    tags: ['dickies', 'beige', 'workwear'],
  }),
  p({
    slug: 'chomba-polo',
    name: 'Chomba Polo Ralph Lauren',
    brand: 'Polo Ralph Lauren',
    category: 'remeras',
    price: null,
    status: 'sold',
    size: 'XL',
    tags: ['polo ralph lauren', 'remeras'],
  }),
];

describe('búsqueda', () => {
  it('ignora acentos y mayúsculas', () => {
    expect(normalize('Pantalón')).toBe('pantalon');
    expect(normalize('  CARHARTT ')).toBe('carhartt');
  });

  it('encuentra por marca (el sitio viejo no podía)', () => {
    const results = searchProducts(catalogo, 'carhartt');
    expect(results.map((product) => product.slug)).toEqual(['campera-carhartt']);
  });

  it('encuentra por talle', () => {
    expect(searchProducts(catalogo, '40 us')).toHaveLength(1);
  });

  it('encuentra por etiqueta', () => {
    expect(searchProducts(catalogo, 'workwear')).toHaveLength(2);
  });

  it('exige TODAS las palabras, no cualquiera', () => {
    expect(searchProducts(catalogo, 'campera carhartt')).toHaveLength(1);
    expect(searchProducts(catalogo, 'campera dickies')).toHaveLength(0);
  });

  it('pone primero lo disponible', () => {
    const results = searchProducts(catalogo, 'a');
    const statuses = results.map((product) => product.status);
    expect(statuses.indexOf('sold')).toBe(statuses.length - 1);
  });

  it('con la búsqueda vacía no devuelve nada', () => {
    expect(searchProducts(catalogo, '   ')).toEqual([]);
  });
});

describe('filtros', () => {
  it('sin filtros devuelve todo', () => {
    expect(applyFilters(catalogo, EMPTY_FILTERS)).toHaveLength(3);
  });

  it('filtra por categoría', () => {
    const result = applyFilters(catalogo, { ...EMPTY_FILTERS, category: 'pantalones' });
    expect(result.map((product) => product.slug)).toEqual(['bermuda-dickies-beige']);
  });

  it('filtra por marca', () => {
    expect(applyFilters(catalogo, { ...EMPTY_FILTERS, brand: 'Dickies' })).toHaveLength(1);
  });

  it('"solo disponible" deja afuera lo vendido', () => {
    const result = applyFilters(catalogo, { ...EMPTY_FILTERS, onlyAvailable: true });
    expect(result.every((product) => product.status === 'available')).toBe(true);
  });

  it('filtra por precio máximo', () => {
    const result = applyFilters(catalogo, { ...EMPTY_FILTERS, maxPrice: 30000 });
    expect(result.map((product) => product.slug)).toEqual(['bermuda-dickies-beige']);
  });

  it('combina filtros', () => {
    const result = applyFilters(catalogo, {
      ...EMPTY_FILTERS,
      category: 'pantalones',
      brand: 'Carhartt',
    });
    expect(result).toHaveLength(0);
  });

  it('sabe cuántos filtros hay puestos', () => {
    expect(hasActiveFilters(EMPTY_FILTERS)).toBe(false);
    expect(countActiveFilters({ ...EMPTY_FILTERS, brand: 'Dickies', onlyNew: true })).toBe(2);
  });
});

describe('ordenamiento', () => {
  it('por precio, y deja afuera lo que no tiene precio', () => {
    // Esto es lo que se rompía en el sitio viejo: ordenar con
    // precios en null daba NaN y el orden salía cualquier cosa.
    const result = sortProducts(catalogo, 'price-asc');
    expect(result.map((product) => product.price)).toEqual([25000, 50000]);
  });

  it('por precio descendente', () => {
    expect(sortProducts(catalogo, 'price-desc').map((product) => product.price)).toEqual([
      50000, 25000,
    ]);
  });

  it('por nombre', () => {
    expect(sortProducts(catalogo, 'name')[0]?.name).toBe('Bermuda Dickies Beige');
  });

  it('"últimos ingresos" respeta el orden del archivo de datos', () => {
    expect(sortProducts(catalogo, 'latest').map((product) => product.slug)).toEqual(
      catalogo.map((product) => product.slug)
    );
  });
});

describe('filtros en la URL', () => {
  it('lee los parámetros', () => {
    const filters = parseFilters(
      { categoria: 'abrigos', marca: 'Carhartt', disponible: '1', hasta: '30000', q: 'campera' },
      CATEGORIES
    );
    expect(filters).toEqual({
      category: 'abrigos',
      brand: 'Carhartt',
      onlyAvailable: true,
      onlyNew: false,
      maxPrice: 30000,
      query: 'campera',
    });
  });

  it('ignora una categoría inventada', () => {
    expect(parseFilters({ categoria: 'zapatos' }, CATEGORIES).category).toBeNull();
  });

  it('ignora un orden inventado', () => {
    expect(parseSort({ orden: 'lo-que-sea' })).toBe('latest');
  });

  it('arma links conservando los filtros que ya estaban', () => {
    expect(buildHref('/tienda', { marca: 'Dickies' }, { categoria: 'abrigos' })).toBe(
      '/tienda?marca=Dickies&categoria=abrigos'
    );
  });

  it('pasar null saca ese filtro', () => {
    expect(buildHref('/tienda', { marca: 'Dickies' }, { marca: null })).toBe('/tienda');
  });
});
