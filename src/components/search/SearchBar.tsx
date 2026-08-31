import { Icon } from '@/components/ui/Icon';

// ============================================================
// BUSCADOR PRINCIPAL — home
// ------------------------------------------------------------
// Un <form> común con method="get": manda a /tienda?q=..., que ya
// sabe leer ese parámetro (src/lib/filters.ts). No necesita
// JavaScript ni estado propio.
// ============================================================

export function SearchBar() {
  return (
    <form action="/tienda" method="get" role="search" className="flex gap-2">
      <label htmlFor="home-search" className="sr-only-focusable">
        Buscar en el catálogo
      </label>
      <div className="relative w-full">
        <Icon
          name="search"
          size={18}
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-ash"
        />
        <input
          id="home-search"
          type="search"
          name="q"
          placeholder="Campera, Dickies, talle XL…"
          autoComplete="off"
          className="font-display w-full border-b-2 border-line-strong bg-transparent py-2 pl-7 text-2xl leading-none outline-none placeholder:text-ash focus:border-ink md:text-3xl"
        />
      </div>
      <button
        type="submit"
        className="label-ink min-h-11 shrink-0 self-end border border-ink px-4 pb-2 hover:bg-ink hover:text-paper"
      >
        Buscar
      </button>
    </form>
  );
}
