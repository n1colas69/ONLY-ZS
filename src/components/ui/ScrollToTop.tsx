'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

// ============================================================
// VOLVER ARRIBA
// ------------------------------------------------------------
// Aparece después de scrollear una pantalla hacia abajo. El
// scroll suave lo da `scroll-behavior: smooth` en globals.css,
// que ya se desactiva solo si la persona pidió menos movimiento
// (prefers-reduced-motion) — por eso acá no hace falta duplicar
// esa lógica.
//
// Para modificar:
// - a partir de cuánto scroll aparece:  SHOW_AFTER
// - dónde se ve:                        las clases del <button>
// ============================================================

const SHOW_AFTER = 480;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo(0, 0)}
      aria-label="Volver arriba"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-3 bottom-3 z-30 grid size-11 place-items-center border border-line-strong bg-paper text-ink transition-[opacity,transform] duration-200 hover:bg-ink hover:text-paper md:right-6 md:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <Icon name="arrow-up" size={18} />
    </button>
  );
}
