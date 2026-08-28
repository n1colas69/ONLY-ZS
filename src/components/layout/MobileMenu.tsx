'use client';

import Link from 'next/link';
import { Drawer } from '@/components/ui/Drawer';
import { Icon } from '@/components/ui/Icon';
import { categories } from '@/data/categories';
import { site } from '@/data/site';
import { closePanel } from '@/lib/store';

// ============================================================
// MENÚ DEL CELULAR
// ------------------------------------------------------------
// Solo aparece en pantallas chicas. Nombres grandes, tocables,
// sin iconos ni decoración: es una lista para el dedo pulgar.
//
// La numeración de la izquierda es el mismo gesto de archivo que
// la grilla y la ficha de producto: convierte una lista de links
// en un índice. Es lo único que se le agregó — un menú de celular
// tiene que ser una lista y nada más.
//
// Para modificar: los arrays MAIN y las categorías salen de
// src/data/categories.ts
// ============================================================

const MAIN = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/galeria', label: 'Galería ZS' },
  { href: '/colaboraciones', label: 'Colaboraciones' },
  { href: '/favoritos', label: 'Favoritos' },
];

export function MobileMenu({ open }: { open: boolean }) {
  return (
    <Drawer open={open} onClose={closePanel} title="Menú" side="top" className="max-h-full">
      <nav className="px-4 py-6" aria-label="Menú principal">
        <ul>
          {MAIN.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={closePanel}
                className="flex items-baseline gap-3 border-b border-dashed border-line-strong py-3"
              >
                <span className="label w-6 shrink-0 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="d3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="label mt-8 mb-1">Categorías</h3>
        <ul className="grid grid-cols-2 gap-x-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/categoria/${category.slug}`}
                onClick={closePanel}
                className="block min-h-11 border-b border-dashed border-line py-2.5"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="label-ink mt-8 inline-flex min-h-11 items-center gap-2"
        >
          <Icon name="instagram" size={16} />
          {site.instagramHandle}
        </a>
      </nav>
    </Drawer>
  );
}
