import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { categories } from '@/data/categories';
import { cn } from '@/lib/cn';
import {
  buildHref,
  countActiveFilters,
  hasActiveFilters,
  SORT_LABELS,
  type Filters,
  type SearchParams,
  type SortOption,
} from '@/lib/filters';

// ============================================================
// FILTROS
// ------------------------------------------------------------
// Son links, no botones con JavaScript. Cada filtro cambia la
// dirección de la página (/tienda?marca=Carhartt) y el servidor
// devuelve el catálogo ya filtrado.
//
// Ventajas concretas:
// - se puede compartir un filtro por WhatsApp
// - el botón "atrás" funciona
// - funciona sin JavaScript
// - el navegador no descarga los 58 productos para filtrarlos
//
// En celular todo vive dentro de un <details>: se abre y se cierra
// sin una línea de JavaScript.
//
// Para modificar:
// - qué se puede filtrar:   este archivo + applyFilters en lib/filters.ts
// - las categorías:         src/data/categories.ts
// ============================================================

interface FilterBarProps {
  /** Ruta base sobre la que se arman los links. */
  base: string;
  params: SearchParams;
  filters: Filters;
  sort: SortOption;
  brands: string[];
  /** Cuántas piezas se están mostrando. */
  count: number;
  /** false en las páginas de categoría, donde la categoría ya está fijada. */
  showCategories?: boolean;
}

/** Un filtro suelto. Si ya está puesto, el link lo saca. */
function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'label-ink inline-flex min-h-9 items-center border px-2.5 whitespace-nowrap transition-colors',
        active ? 'border-ink bg-ink text-paper' : 'border-line-strong hover:border-ink'
      )}
    >
      {children}
    </Link>
  );
}

/**
 * Un grupo de filtros: el título a la izquierda y los chips fluyendo
 * al lado, no debajo.
 *
 * Antes cada grupo era título ARRIBA y chips abajo, con 20px entre
 * grupo y grupo. Con cuatro grupos (categoría, marca, mostrar,
 * ordenar) eso son ocho renglones: en escritorio la barra medía
 * 630px y empujaba la primera foto del catálogo fuera de la
 * pantalla. En una tienda donde lo que vende es la foto, la
 * herramienta para encontrarla no puede ocupar más que la mercadería.
 * En línea ocupa la mitad, y no cambia en nada cómo se filtra.
 */
function FilterRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:gap-4">
      <h3 className="label shrink-0 md:w-20 md:pt-1.5">{title}</h3>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export function FilterBar({
  base,
  params,
  filters,
  sort,
  brands,
  count,
  showCategories = true,
}: FilterBarProps) {
  const active = countActiveFilters(filters);

  const body = (
    <div className="space-y-3 pt-4 md:pt-0">
      {showCategories && (
        <FilterRow title="Categoría">
          {categories.map((category) => {
            const isActive = filters.category === category.slug;
            return (
              <Chip
                key={category.slug}
                active={isActive}
                href={buildHref(base, params, { categoria: isActive ? null : category.slug })}
              >
                {category.name}
              </Chip>
            );
          })}
        </FilterRow>
      )}

      <FilterRow title="Marca">
        {brands.map((brand) => {
          const isActive = filters.brand === brand;
          return (
            <Chip
              key={brand}
              active={isActive}
              href={buildHref(base, params, { marca: isActive ? null : brand })}
            >
              {brand}
            </Chip>
          );
        })}
      </FilterRow>

      <FilterRow title="Mostrar">
        <Chip
          active={filters.onlyAvailable}
          href={buildHref(base, params, { disponible: filters.onlyAvailable ? null : '1' })}
        >
          Solo disponible
        </Chip>
        <Chip
          active={filters.onlyNew}
          href={buildHref(base, params, { nuevo: filters.onlyNew ? null : '1' })}
        >
          Novedades
        </Chip>
        {[30000, 50000].map((limit) => {
          const isActive = filters.maxPrice === limit;
          return (
            <Chip
              key={limit}
              active={isActive}
              href={buildHref(base, params, { hasta: isActive ? null : String(limit) })}
            >
              Hasta ${limit / 1000} mil
            </Chip>
          );
        })}
      </FilterRow>

      <FilterRow title="Ordenar">
        {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
          <Chip
            key={option}
            active={sort === option}
            href={buildHref(base, params, { orden: option })}
          >
            {SORT_LABELS[option]}
          </Chip>
        ))}
      </FilterRow>

      {hasActiveFilters(filters) && (
        <Link href={base} className="label-ink inline-flex min-h-9 items-center gap-1.5 underline decoration-accent decoration-2 underline-offset-4">
          <Icon name="close" size={13} />
          Quitar todos los filtros
        </Link>
      )}
    </div>
  );

  return (
    <section aria-label="Filtros" className="border-b border-dashed border-line-strong pb-4">
      {/* Buscador. Es un formulario común: funciona sin JavaScript. */}
      <form action={base} method="get" role="search" className="flex gap-2 pb-4">
        <label htmlFor="catalogo-q" className="sr-only-focusable">
          Buscar en el catálogo
        </label>
        <input
          id="catalogo-q"
          type="search"
          name="q"
          defaultValue={filters.query}
          placeholder="Buscar por marca, prenda o talle"
          className="min-h-11 w-full border border-line-strong bg-transparent px-3 text-[0.8125rem] outline-none focus:border-ink"
        />
        <button
          type="submit"
          className="label-ink min-h-11 shrink-0 border border-ink px-4 hover:bg-ink hover:text-paper"
        >
          Buscar
        </button>
      </form>

      {/* Celular: los filtros van adentro de un desplegable nativo. */}
      <details className="md:hidden">
        <summary className="label-ink flex min-h-11 cursor-pointer list-none items-center justify-between border border-line-strong px-3">
          <span className="inline-flex items-center gap-2">
            <Icon name="sliders" size={15} />
            Filtrar y ordenar{active > 0 && ` · ${active}`}
          </span>
          <Icon name="chevron-down" size={15} />
        </summary>
        {body}
      </details>

      <div className="hidden md:block">{body}</div>

      <p className="label mt-4" role="status">
        {count} {count === 1 ? 'pieza' : 'piezas'}
        {filters.query && ` para “${filters.query}”`}
      </p>
    </section>
  );
}
