import type { Metadata } from 'next';
import { FilterBar } from '@/components/filters/FilterBar';
import { ProductGrid } from '@/components/products/ProductGrid';
import { categories } from '@/data/categories';
import { getBrands, getPublicProducts } from '@/lib/catalog';
import {
  applyFilters,
  parseFilters,
  parseSort,
  sortProducts,
  type SearchParams,
} from '@/lib/filters';

// ============================================================
// CATÁLOGO — /tienda
// ------------------------------------------------------------
// Todas las piezas, con filtros. Los filtros están en la URL, así
// que /tienda?marca=Carhartt&disponible=1 es un link que se puede
// compartir y que Google puede leer.
//
// Todo se filtra y se ordena en el servidor: el navegador recibe
// el HTML ya listo.
//
// Para modificar:
// - qué filtros hay:    src/components/filters/FilterBar.tsx
// - cómo se ordena:     sortProducts en src/lib/filters.ts
// - la grilla:          src/components/products/ProductGrid.tsx
// ============================================================

export const metadata: Metadata = {
  title: 'Tienda',
  description:
    'Todo el catálogo de ONLY ZS: piezas únicas de vintage y second hand, seleccionadas a mano. Carhartt, Dickies, Polo Ralph Lauren, Nautica, Champion y más.',
  alternates: { canonical: '/tienda' },
};

const CATEGORY_SLUGS = categories.map((category) => category.slug);

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filters = parseFilters(params, CATEGORY_SLUGS);
  const sort = parseSort(params);

  const catalog = getPublicProducts();
  const results = sortProducts(applyFilters(catalog, filters), sort);

  return (
    <div className="edge py-6 md:py-10">
      <header className="mb-5 border-b border-dashed border-line-strong pb-3">
        <h1 className="d1">Catálogo</h1>
        <p className="label mt-2">{catalog.length} piezas · Cada una es única</p>
      </header>

      <FilterBar
        base="/tienda"
        params={params}
        filters={filters}
        sort={sort}
        brands={getBrands()}
        count={results.length}
      />

      <div className="pt-6">
        <ProductGrid products={results} numbered />
      </div>
    </div>
  );
}
