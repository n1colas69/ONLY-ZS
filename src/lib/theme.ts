'use client';

// ============================================================
// MODO OSCURO
// ------------------------------------------------------------
// El tema vive en UN solo lugar de verdad: el atributo
// data-theme del <html>. No hay una copia separada en React que
// se pueda desincronizar — useTheme() lee el DOM directamente.
//
// El primer valor lo pone un <script> chiquito en layout.tsx,
// ANTES de que React exista, para que la página nunca "parpadee"
// del tema equivocado al cargar (ver THEME_INIT_SCRIPT).
//
// Para modificar:
// - los colores de cada tema:  src/app/globals.css, @theme y
//   el bloque :root[data-theme='dark']
// - qué pasa al elegir un tema: setTheme(), acá abajo
// ============================================================

import { useSyncExternalStore } from 'react';

const THEME_KEY = 'zs_theme';

export type Theme = 'light' | 'dark';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** El mismo cálculo que hace el script inline, para cuando hace falta desde React. */
export function resolveInitialTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* localStorage puede fallar (modo privado); se sigue con la preferencia del sistema */
  }
  return systemTheme();
}

/**
 * Script que se inserta en <body>, antes que cualquier otra cosa.
 * Corre de forma síncrona mientras el navegador arma la página, así
 * que el tema ya está puesto antes del primer pintado: no hay
 * flash del tema equivocado.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})();`;

const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** En el servidor no hay tema real: no afecta el HTML, el script inline lo corrige al instante. */
function getServerSnapshot(): Theme {
  return 'light';
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* sin persistencia, pero el cambio de tema sigue funcionando en esta visita */
  }
  listeners.forEach((listener) => listener());
}

export function toggleTheme() {
  setTheme(getSnapshot() === 'dark' ? 'light' : 'dark');
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
