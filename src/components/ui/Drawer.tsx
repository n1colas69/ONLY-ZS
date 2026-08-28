'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

// ============================================================
// PANEL LATERAL / MODAL
// ------------------------------------------------------------
// Un solo componente para el carrito, los favoritos, el buscador
// y el menú del celular. Resuelve, una vez y para todos:
//
// - se cierra con Escape
// - se cierra al tocar el fondo
// - el foco del teclado queda ATRAPADO adentro mientras está
//   abierto (si no, se puede navegar la página de atrás a ciegas)
// - al cerrar, el foco vuelve al botón que lo abrió
// - la página de atrás no scrollea
// - se anuncia como diálogo a los lectores de pantalla
//
// El sitio viejo abría y cerraba estos paneles con clases de CSS,
// sin nada de esto.
//
// Para modificar:
// - de qué lado entra:  la prop `side`
// - el ancho:           la prop `className`
// ============================================================

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Título del panel. Es obligatorio: es lo que anuncia el lector de pantalla. */
  title: string;
  /** 'right' = panel lateral (carrito, favoritos). 'top' = buscador. */
  side?: 'right' | 'top';
  children: ReactNode;
  className?: string;
  /** Contenido fijo abajo del panel (totales, botón de compra). */
  footer?: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Drawer({
  open,
  onClose,
  title,
  side = 'right',
  children,
  className,
  footer,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    // Guarda a quién devolverle el foco cuando esto se cierre.
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.dataset.locked = 'true';

    const panel = panelRef.current;
    // Enfoca lo primero que haya adentro; si no hay nada, el panel.
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (element) => element.offsetParent !== null
      );
      if (items.length === 0) return;

      const firstItem = items[0]!;
      const lastItem = items[items.length - 1]!;

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      delete document.body.dataset.locked;
      returnFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Fondo. Es un botón de verdad para que también funcione
          con teclado y con lectores de pantalla. */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        // Velo sólido, sin blur: desenfocar el fondo es el gesto de
        // "vidrio" que el sitio no usa en ningún otro lado.
        className="absolute inset-0 h-full w-full cursor-default bg-scrim/50"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          'absolute flex flex-col bg-paper shadow-none outline-none',
          side === 'right'
            ? 'inset-y-0 right-0 w-full max-w-100 animate-[reveal-up_0.25s_var(--ease-out-soft)_both]'
            : 'inset-x-0 top-0 max-h-[85vh] animate-[reveal-up_0.25s_var(--ease-out-soft)_both]',
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-dashed border-line-strong py-3 pr-1 pl-4">
          <h2 id={titleId} className="label-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Cerrar ${title.toLowerCase()}`}
            className="grid size-11 place-items-center hover:text-ash"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto overscroll-contain">{children}</div>

        {footer && <div className="border-t border-dashed border-line-strong">{footer}</div>}
      </div>
    </div>
  );
}
