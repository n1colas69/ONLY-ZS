'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { priceLabel } from '@/lib/format';
import { searchProducts } from '@/lib/search';
import { closePanel } from '@/lib/store';
import type { ProductLite } from '@/types';

// ============================================================
// BUSCADOR
// ------------------------------------------------------------
// Busca mientras escribís, sin servidor: son 58 productos, filtrar
// un array es instantáneo.
//
// Busca por nombre, marca, categoría, talle y etiquetas. El sitio
// viejo solo buscaba nombre y categoría, así que escribir
// "carhartt" o "XL" no encontraba nada.
//
// Para modificar:
// - qué campos se buscan:  haystack() en src/lib/search.ts
// - cuántos resultados:    MAX_RESULTS
// - las sugerencias:       SUGGESTIONS
// ============================================================

const MAX_RESULTS = 8;

/** Atajos que se muestran con el buscador vacío. */
const SUGGESTIONS = ['Carhartt', 'Dickies', 'Polo Ralph Lauren', 'Workwear', 'XL'];

export function SearchDialog({ open, catalog }: { open: boolean; catalog: ProductLite[] }) {
  const [query, setQuery] = useState('');
  const results = useMemo(
    () => (query.trim() ? searchProducts(catalog, query, MAX_RESULTS) : []),
    [catalog, query]
  );

  return (
    <Drawer open={open} onClose={closePanel} title="Buscar" side="top">
      <div className="p-4">
        <label htmlFor="search-input" className="label">
          Qué estás buscando
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Campera, Dickies, talle XL…"
          autoComplete="off"
          className="font-display mt-2 w-full border-b-2 border-line-strong bg-transparent pb-2 text-3xl leading-none outline-none placeholder:text-ash focus:border-ink md:text-4xl"
        />

        {!query.trim() && (
          <div className="mt-6 flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="label-ink min-h-9 border border-line-strong px-3 hover:bg-ink hover:text-paper"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <p className="mt-8 text-ash">
            No encontramos nada con “{query.trim()}”. Probá con la marca o el tipo de prenda.
          </p>
        )}

        {results.length > 0 && (
          <>
            <p className="label mt-6" role="status">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
            </p>
            <ul className="mt-2">
              {results.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={closePanel}
                    className="flex items-center gap-3 border-b border-dashed border-line-strong py-3 hover:bg-paper-dim"
                  >
                    {product.image && (
                      <Image
                        src={product.image}
                        alt=""
                        width={48}
                        height={60}
                        sizes="48px"
                        className="h-15 w-12 bg-paper-dim object-cover"
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
              onClick={closePanel}
              className="label-ink mt-4 inline-block underline decoration-accent decoration-2 underline-offset-4"
            >
              Ver todos los resultados en el catálogo
            </Link>
          </>
        )}
      </div>
    </Drawer>
  );
}
