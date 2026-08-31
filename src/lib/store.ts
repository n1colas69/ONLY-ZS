'use client';

// ============================================================
// ESTADO DEL NAVEGADOR (carrito, favoritos, avisos)
// ------------------------------------------------------------
// No hay librería de estado. Son ~120 líneas y hacen exactamente
// lo que el sitio necesita: guardar dos listas en localStorage y
// avisarle a React cuando cambian.
//
// Para modificar:
// - dónde se guarda:      CART_KEY / WISHLIST_KEY
// - duración de un aviso: TOAST_MS
//
// OJO: cambiar CART_KEY o WISHLIST_KEY hace que la gente pierda
// lo que tenía guardado en su navegador.
// ============================================================

import { useCallback, useSyncExternalStore } from 'react';
import * as cartLogic from '@/lib/cart';
import * as wishLogic from '@/lib/wishlist';
import type { CartLine } from '@/types';

const CART_KEY = 'zs_cart';
const WISHLIST_KEY = 'zs_wishlist';
const TOAST_MS = 2600;

/**
 * Slugs que cambiaron respecto del sitio viejo. Sirve para que a
 * nadie se le vacíe el carrito con la nueva versión.
 */
const RENAMED: Record<string, string> = {
  "sueter-levi's": 'sueter-levis',
  'chomba-polo-verda-ml': 'chomba-polo-verde-ml',
};

const rename = (slug: string) => RENAMED[slug] ?? slug;

// ---------------------------------------------------------------
// Store genérico persistido en localStorage
// ---------------------------------------------------------------
type Listener = () => void;

function createStore<T>(key: string, fallback: T, parse: (raw: unknown) => T) {
  let value = fallback;
  let hydrated = false;
  const listeners = new Set<Listener>();

  const emit = () => listeners.forEach((listener) => listener());

  function read(): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? parse(JSON.parse(raw)) : fallback;
    } catch {
      // localStorage puede fallar (modo privado, permisos). No es motivo
      // para romper la página: se sigue con el carrito vacío.
      return fallback;
    }
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);

    // La primera vez que alguien escucha, se lee el navegador.
    // No se lee antes: el servidor no tiene localStorage y hacerlo
    // durante el render rompería la hidratación.
    if (!hydrated) {
      hydrated = true;
      value = read();
      emit();
    }

    // Si la persona tiene el sitio abierto en dos pestañas, se sincronizan.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      value = read();
      emit();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  }

  function set(next: T) {
    value = next;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* sin persistencia, pero la sesión sigue funcionando */
    }
    emit();
  }

  return {
    subscribe,
    get: () => value,
    getServer: () => fallback,
    set,
  };
}

/** Igual que createStore pero sin persistencia: se pierde al recargar. */
function createMemoryStore<T>(initial: T) {
  let value = initial;
  const listeners = new Set<Listener>();
  return {
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    get: () => value,
    getServer: () => initial,
    set(next: T) {
      value = next;
      listeners.forEach((listener) => listener());
    },
  };
}

// ---------------------------------------------------------------
// Carrito
// ---------------------------------------------------------------
const EMPTY_CART: CartLine[] = [];

/**
 * Acepta el formato nuevo ({slug, qty}) y el del sitio viejo, que
 * guardaba una copia entera del producto con `id`.
 */
function parseCart(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return EMPTY_CART;
  const lines: CartLine[] = [];
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) continue;
    const record = item as Record<string, unknown>;
    const slug = typeof record.slug === 'string' ? record.slug
      : typeof record.id === 'string' ? record.id
      : null;
    if (!slug) continue;
    const qty = typeof record.qty === 'number' && record.qty > 0 ? record.qty : 1;
    lines.push({ slug: rename(slug), qty: Math.min(qty, cartLogic.MAX_QTY_PER_ITEM) });
  }
  return lines;
}

const cartStore = createStore<CartLine[]>(CART_KEY, EMPTY_CART, parseCart);

export function useCart() {
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.get, cartStore.getServer);

  const add = useCallback((slug: string) => cartStore.set(cartLogic.addLine(cartStore.get(), slug)), []);
  const remove = useCallback((slug: string) => cartStore.set(cartLogic.removeLine(cartStore.get(), slug)), []);
  const setQty = useCallback(
    (slug: string, qty: number) => cartStore.set(cartLogic.setQty(cartStore.get(), slug, qty)),
    []
  );
  const clear = useCallback(() => cartStore.set(cartLogic.clearCart()), []);

  return { cart, add, remove, setQty, clear };
}

// ---------------------------------------------------------------
// Favoritos
// ---------------------------------------------------------------
const EMPTY_WISHLIST: string[] = [];

function parseWishlist(raw: unknown): string[] {
  if (!Array.isArray(raw)) return EMPTY_WISHLIST;
  return raw.filter((item): item is string => typeof item === 'string').map(rename);
}

const wishlistStore = createStore<string[]>(WISHLIST_KEY, EMPTY_WISHLIST, parseWishlist);

export function useWishlist() {
  const wishlist = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.get,
    wishlistStore.getServer
  );

  const toggle = useCallback(
    (slug: string) => wishlistStore.set(wishLogic.toggleWish(wishlistStore.get(), slug)),
    []
  );
  const remove = useCallback(
    (slug: string) => wishlistStore.set(wishLogic.removeWish(wishlistStore.get(), slug)),
    []
  );

  return { wishlist, toggle, remove };
}

// ---------------------------------------------------------------
// Avisos (toasts)
// ---------------------------------------------------------------
export interface Toast {
  id: number;
  message: string;
}

// Los avisos NO se guardan en localStorage: viven solo mientras la
// pestaña está abierta. Por eso usan un store en memoria.
const toastStore = createMemoryStore<Toast[]>([]);
let toastId = 0;

/** Muestra un aviso breve. Se puede llamar desde cualquier componente cliente. */
export function toast(message: string) {
  const id = ++toastId;
  toastStore.set([...toastStore.get(), { id, message }]);
  window.setTimeout(() => {
    toastStore.set(toastStore.get().filter((item) => item.id !== id));
  }, TOAST_MS);
}

export function useToasts(): Toast[] {
  return useSyncExternalStore(toastStore.subscribe, toastStore.get, toastStore.getServer);
}

// ---------------------------------------------------------------
// Paneles (carrito, favoritos, menú)
// ---------------------------------------------------------------
// Solo puede haber uno abierto a la vez. Es una sola variable:
// abrir el carrito cierra el menú sin que nadie lo coordine.

export type Panel = 'cart' | 'wishlist' | 'menu' | null;

const panelStore = createMemoryStore<Panel>(null);

export function openPanel(panel: Exclude<Panel, null>) {
  panelStore.set(panel);
}

export function closePanel() {
  panelStore.set(null);
}

export function usePanel(): Panel {
  return useSyncExternalStore(panelStore.subscribe, panelStore.get, panelStore.getServer);
}
