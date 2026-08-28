'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

// ============================================================
// VOLVER
// ------------------------------------------------------------
// Un "atrás" de verdad: usa el historial del navegador (`router.
// back()`), así que vuelve al lugar EXACTO de donde se vino —con
// el scroll en el mismo punto en el que estaba—, no a un destino
// fijo. Restaurar el scroll no lo hace este componente: lo hace el
// navegador solo en cuanto navegás con atrás/adelante, siempre que
// no se lo pidas explícitamente otra cosa (y acá no se le pide).
//
// Es distinto de las migas de pan que ya tiene la ficha de
// producto o la categoría ("Tienda / Pantalones"): esas apuntan
// SIEMPRE al mismo lugar fijo. Este botón vuelve a lo que sea que
// la persona haya mirado antes —la búsqueda, el inicio, favoritos,
// otra categoría—, sea cual sea el camino por el que llegó.
//
// Vive una sola vez, en el layout general (src/app/layout.tsx),
// arriba de cada página: no hay que agregarlo página por página.
// No aparece en la home, porque desde la home no hay "atrás" que
// tenga sentido.
//
// Si no hay una página anterior en esta pestaña (alguien entró por
// un link directo, o abrió el sitio en una pestaña nueva), no
// intenta salir del sitio: lleva al inicio.
// ============================================================

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <div className="edge border-b border-dashed border-line-strong">
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push('/');
          }
        }}
        className="label-ink inline-flex min-h-11 items-center gap-1.5 hover:text-ash"
      >
        <Icon name="arrow-left" size={14} />
        Volver
      </button>
    </div>
  );
}
