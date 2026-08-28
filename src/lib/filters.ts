// ============================================================
// FILTROS Y ORDENAMIENTO
// ------------------------------------------------------------
// Para modificar:
// - agregar un filtro:      sumá el campo a Filters y el caso a applyFilters
// - agregar un orden:       sumá la opción a SortOption y el caso a sortProducts
// - orden por defecto:      DEFAULT_SORT
// ============================================================

import { isForSale } from '@/lib/format';
import { searchProducts, type Searchable } from '@/lib/search';
import type { CategorySlug, ProductLite } from '@/types';

/**
 * Lo mínimo que necesita una pieza para poder filtrarse y ordenarse.
 * Lo cumplen tanto `Product` como `ProductLite`.
 */
export type Filterable = Searchable & Pick<ProductLite, 'price' | 'isNew'>;

export type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'name';

export const DEFAULT_SORT: SortOption = 'latest';

export const SORT_LABELS: Record<SortOption, string> = {
  latest: 'Últimos ingresos',
  'price-asc': 'Menor precio',
  'price-desc': 'Mayor precio',
  name: 'Nombre (A-Z)',
};

export interface Filters {
  category: CategorySlug | null;
  brand: string | null;
  /** true = solo lo que se puede comprar ahora. */
  onlyAvailable: boolean;
  /** true = solo lo marcado como nuevo y disponible. */
  onlyNew: boolean;
  /** Precio máximo, en pesos. null = sin tope. */
  maxPrice: number | null;
  query: string;
}

export const EMPTY_FILTERS: Filters = {
  category: null,
  brand: null,
  onlyAvailable: false,
  onlyNew: false,
  maxPrice: null,
  query: '',
};

export function applyFilters<T extends Filterable>(catalog: T[], filters: Filters): T[] {
  let result = catalog;

  if (filters.query.trim()) {
    result = searchProducts(result, filters.query);
  }
  if (filters.category) {
    result = result.filter((product) => product.category === filters.category);
  }
  if (filters.brand) {
    result = result.filter((product) => product.brand === filters.brand);
  }
  if (filters.onlyAvailable) {
    result = result.filter((product) => isForSale(product.status));
  }
  if (filters.onlyNew) {
    // "Nuevo" solo tiene sentido sobre lo que se puede comprar.
    result = result.filter((product) => product.isNew && isForSale(product.status));
  }
  if (filters.maxPrice !== null) {
    const max = filters.maxPrice;
    result = result.filter((product) => product.price !== null && product.price <= max);
  }

  return result;
}

/**
 * Ordenar por precio deja afuera lo que no tiene precio (vendido,
 * próximamente). Sin esto el orden se rompía con NaN, que es lo que
 * pasaba en el sitio viejo.
 */
export function sortProducts<T extends Filterable>(products: T[], sort: SortOption): T[] {
  const copy = [...products];

  switch (sort) {
    case 'price-asc':
      return copy
        .filter((product) => product.price !== null)
        .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

    case 'price-desc':
      return copy
        .filter((product) => product.price !== null)
        .sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name, 'es'));

    case 'latest':
    default:
      // El orden del archivo src/data/products.ts ya es "lo nuevo arriba".
      return copy;
  }
}

export function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.category !== null ||
    filters.brand !== null ||
    filters.onlyAvailable ||
    filters.onlyNew ||
    filters.maxPrice !== null ||
    filters.query.trim() !== ''
  );
}

// ---------------------------------------------------------------
// Filtros en la URL
// ---------------------------------------------------------------
// Los filtros viven en la dirección web: /tienda?marca=Carhartt
//
// Por qué: así se pueden compartir y guardar en favoritos, el botón
// "atrás" del navegador funciona, y sobre todo el catálogo se filtra
// en el SERVIDOR. El navegador recibe HTML ya filtrado en vez de
// descargar los 58 productos para filtrarlos con JavaScript.

export type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined): string | null => {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
};

export function parseFilters(params: SearchParams, validCategories: string[]): Filters {
  const category = first(params.categoria);
  const maxPrice = Number(first(params.hasta));

  return {
    category:
      category && validCategories.includes(category) ? (category as CategorySlug) : null,
    brand: first(params.marca),
    onlyAvailable: first(params.disponible) === '1',
    onlyNew: first(params.nuevo) === '1',
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : null,
    query: first(params.q) ?? '',
  };
}

export function parseSort(params: SearchParams): SortOption {
  const value = first(params.orden);
  return value && value in SORT_LABELS ? (value as SortOption) : DEFAULT_SORT;
}

/**
 * Arma la dirección de un filtro a partir de la actual.
 * Pasar `null` en un campo lo saca de la URL.
 */
export function buildHref(
  base: string,
  current: SearchParams,
  patch: Record<string, string | null>
): string {
  const next = new URLSearchParams();

  for (const [key, value] of Object.entries(current)) {
    const single = first(value);
    if (single) next.set(key, single);
  }
  for (const [key, value] of Object.entries(patch)) {
    if (value === null) next.delete(key);
    else next.set(key, value);
  }

  const query = next.toString();
  return query ? `${base}?${query}` : base;
}

/** Cuántos filtros hay puestos. Se muestra en el botón de filtros del celular. */
export function countActiveFilters(filters: Filters): number {
  return [
    filters.category !== null,
    filters.brand !== null,
    filters.onlyAvailable,
    filters.onlyNew,
    filters.maxPrice !== null,
  ].filter(Boolean).length;
}
