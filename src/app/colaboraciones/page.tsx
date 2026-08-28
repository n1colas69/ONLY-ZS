import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { collaborations } from '@/data/collaborations';
import { homeCopy } from '@/data/site';

// ============================================================
// COLABORACIONES — /colaboraciones
// ------------------------------------------------------------
// Para agregar una colaboración: src/data/collaborations.ts
// (ahí está explicado paso a paso).
// ============================================================

export const metadata: Metadata = {
  title: 'Colaboraciones',
  description:
    'Proyectos que comparten la mirada de ONLY ZS: cultura under, skate, fotografía, archivo y calle.',
  alternates: { canonical: '/colaboraciones' },
};

export default function CollaborationsPage() {
  return (
    <div className="edge py-8 md:py-12">
      <header className="mb-8 border-b border-dashed border-line-strong pb-3 md:mb-12">
        <p className="label mb-2">Marcas con calle</p>
        <h1 className="d1">Colaboraciones</h1>
        <p className="mt-4 max-w-prose text-ash">{homeCopy.collabsIntro}</p>
      </header>

      {/* Igual que las categorías de la portada: la foto queda
          limpia y el nombre va debajo, separado por una regla. Antes
          cada una tenía velo encima (bg-scrim/40, más oscuro todavía
          al pasar el mouse) y el zoom del 2%. */}
      <ul className="space-y-8 md:space-y-14">
        {collaborations.map((collaboration, index) => (
          <li key={collaboration.slug}>
            <Link href={`/colaboraciones/${collaboration.slug}`} className="group block">
              <div className="shadow-card">
                <div className="relative aspect-3/2 overflow-hidden bg-paper-dim md:aspect-3/1">
                  <Image
                    src={collaboration.heroImage}
                    alt=""
                    fill
                    // Solo la primera se ve sin scrollear: era `priority`
                    // fijo en TODAS, así que a medida que se sumen
                    // colaboraciones, todas iban a pelear por ancho de
                    // banda apenas se abriera la página.
                    priority={index === 0}
                    fetchPriority={index === 0 ? 'high' : undefined}
                    loading={index === 0 ? undefined : 'lazy'}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-dashed border-line-strong pt-2">
                <div>
                  <h2 className="d2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                    {collaboration.title}
                  </h2>
                  <p className="mt-1.5 text-ash">{collaboration.tagline}</p>
                </div>
                <span className="label shrink-0 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
