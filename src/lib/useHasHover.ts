'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * true si el dispositivo puede "pasar el cursor" (tiene mouse).
 * false en pantallas táctiles.
 *
 * Se usa para elegir la interacción de zoom en las fotos: con
 * mouse, zoom al mover el cursor; sin mouse, zoom al tocar.
 *
 * En el servidor no hay `matchMedia`, así que ahí se asume que
 * hay mouse (getServerSnapshot devuelve true) — no afecta el HTML
 * que se manda: solo cambia qué handler reacciona a cada evento,
 * y eso recién puede pasar después de que la página cargó.
 */
export function useHasHover(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
