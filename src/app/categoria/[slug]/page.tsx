import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FilterBar } from '@/components/filters/FilterBar';
import { ProductGrid } from '@/components/products/ProductGrid';
import { categories, getCategory } from '@/data/categories';
import { getImageUrl } from '@/data/image-sizes';
import { site } from '@/data/site';
import { getBrands, getCategoryImage, getProductsByCategory } from '@/lib/catalog';
import {
  applyFilters,
  parseFilters,
  parseSort,
  sortProducts,
  type SearchParams,
} from '@/lib/filters';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/seo';

// ============================================================
// CATEGORÍA — /categoria/{slug}
// ------------------------------------------------------------
// Una página por categoría, con su propia foto, su propio título
// y su propia descripción para Google.
//
// La foto (banner + metadata de Open Graph) sale sorteada entre las
// piezas de la categoría — ver getCategoryImage en src/lib/catalog.ts
// — y cambia en cada visita real porque esta página ya es dinámica:
// lee `searchParams` (los filtros de la URL), y eso alcanza para que
// Next.js la renderice de nuevo en cada pedido en vez de dejarla fija
// desde el build.
//
// Para modificar:
// - el nombre y la foto:  src/data/categories.ts
// - los filtros:          src/components/filters/FilterBar.tsx
// ============================================================

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: 'Categoría no encontrada' };

  const count = getProductsByCategory(category.slug).length;
  const cover = category.image ?? getCategoryImage(category.slug);
  return {
    title: category.title,
    description: `${count} piezas de ${category.title.toLowerCase()} en ${site.name}. Vintage y second hand seleccionado a mano, envío a todo el país.`,
    alternates: { canonical: `/categoria/${category.slug}` },
    openGraph: {
      title: `${category.title} | ${site.name}`,
      images: cover ? [{ url: `${site.url}${getImageUrl(cover)}` }] : undefined,
    },
  };
}

const CATEGORY_SLUGS = categories.map((category) => category.slug);

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const query = await searchParams;
  // La categoría ya está fijada por la URL: el filtro de categoría
  // dentro de la barra se ignora acá.
  const filters = { ...parseFilters(query, CATEGORY_SLUGS), category: null };
  const sort = parseSort(query);

  const all = getProductsByCategory(category.slug);
  const results = sortProducts(applyFilters(all, filters), sort);
  const cover = category.image ?? getCategoryImage(category.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: 'Tienda', url: '/tienda' },
            { name: category.title, url: `/categoria/${category.slug}` },
          ])
        )}
      />

      <header className="relative">
        {cover && (
          <div className="relative aspect-2/1 w-full md:aspect-5/1">
            <Image
              src={getImageUrl(cover)}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
        {/* Faja de tinta, igual que en la portada y en la galería:
            la foto no lleva velo encima y el contraste del título
            no depende de qué haya debajo. */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="inline-block bg-ink px-3 pt-2 pb-1 md:px-4">
            <p className="label text-paper/70">
              <Link href="/tienda" className="hover:text-paper">
                Tienda
              </Link>
              <span className="px-1.5">/</span>
              {all.length} piezas
            </p>
            <h1 className="d1 text-paper">{category.title}</h1>
          </div>
        </div>
      </header>

      <div className="edge py-6 md:py-10">
        <FilterBar
          base={`/categoria/${category.slug}`}
          params={query}
          filters={filters}
          sort={sort}
          brands={getBrands()}
          count={results.length}
          showCategories={false}
        />
        <div className="pt-6">
          <ProductGrid products={results} numbered />
        </div>
      </div>
    </>
  );
}
