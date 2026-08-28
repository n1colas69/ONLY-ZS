'use client';

import { useToasts } from '@/lib/store';

// ============================================================
// AVISOS
// ------------------------------------------------------------
// Mensajes breves cuando algo pasa ("guardado en favoritos").
// Aparecen abajo, duran 2,6 segundos y se van solos.
//
// role="status" + aria-live="polite" hace que un lector de
// pantalla los lea sin interrumpir lo que la persona esté
// haciendo. Sin eso, alguien que no ve la pantalla no se entera
// de que agregó algo a la bolsa.
//
// Para modificar:
// - duración:  TOAST_MS en src/lib/store.ts
// - posición:  las clases de abajo
// ============================================================

export function Toasts() {
  const toasts = useToasts();

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-60 flex flex-col items-center gap-1 p-4"
    >
      {toasts.map((toast) => (
        <p
          key={toast.id}
          className="max-w-md bg-ink px-4 py-2.5 font-mono text-[0.8125rem] text-paper animate-[reveal-up_0.25s_var(--ease-out-soft)_both]"
        >
          {toast.message}
        </p>
      ))}
    </div>
  );
}
