'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { priceLabel } from '@/lib/format';
import { searchProducts } from '@/lib/search';
import type { ProductLite } from '@/types';

// ============================================================
// BUSCADOR PRINCIPAL — home
// ------------------------------------------------------------
// Manda a /tienda?q=..., que ya sabe leer ese parámetro
// (src/lib/filters.ts). Además, mientras se escribe, muestra
// sugerencias de productos en un desplegable debajo del campo —
// no hace falta apretar "Buscar" para verlas.
//
// Para modificar:
// - cuántas sugerencias:  MAX_SUGGESTIONS
// - qué campos se buscan: haystack() en src/lib/search.ts
// ============================================================

const MAX_SUGGESTIONS = 5;

export function SearchBar({ catalog }: { catalog: ProductLite[] }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(
    () => (query.trim() ? searchProducts(catalog, query, MAX_SUGGESTIONS) : []),
    [catalog, query]
  );

  const showSuggestions = open && query.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
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
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setOpen(false);
            }}
            placeholder="Campera, Dickies, talle XL…"
            autoComplete="off"
            role="combobox"
            aria-expanded={showSuggestions}
            aria-controls="home-search-suggestions"
            aria-autocomplete="list"
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

      {showSuggestions && (
        <div
          id="home-search-suggestions"
          role="listbox"
          className="shadow-card absolute inset-x-0 top-full z-10 mt-1 border border-line-strong bg-paper"
        >
          {suggestions.length === 0 ? (
            <p className="p-4 text-ash">
              No encontramos nada con “{query.trim()}”. Probá con la marca o el tipo de prenda.
            </p>
          ) : (
            <>
              <ul>
                {suggestions.map((product) => (
                  <li key={product.slug} role="option" aria-selected={false}>
                    <Link
                      href={`/producto/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 border-b border-dashed border-line-strong px-4 py-3 hover:bg-paper-dim"
                    >
                      {product.image && (
                        <Image
                          src={product.image}
                          alt=""
                          width={44}
                          height={55}
                          sizes="44px"
                          className="h-[3.4rem] w-11 bg-paper-dim object-cover"
                        />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="label block">{product.brand}</span>
                        <span className="block truncate text-[0.8125rem]">{product.name}</span>
                      </span>
                      <span className="label shrink-0">
                        {priceLabel(product.price, product.status)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/tienda?q=${encodeURIComponent(query.trim())}`}
                onClick={() => setOpen(false)}
                className="label-ink block px-4 py-3 underline decoration-accent decoration-2 underline-offset-4 hover:bg-paper-dim"
              >
                Ver todos los resultados en el catálogo
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
