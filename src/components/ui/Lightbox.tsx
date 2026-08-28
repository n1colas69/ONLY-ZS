'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import { ShareButton } from '@/components/ui/ShareButton';
import { site } from '@/data/site';

// ============================================================
// VISOR DE FOTOS (carrusel a pantalla completa)
// ------------------------------------------------------------
// Componente compartido: cualquier grilla de fotos clickeables
// (la Galería ZS, las fotos de una colaboración) abre esto para
// verlas una por una. Quien lo usa controla qué índice está
// abierto — este componente solo dibuja el visor.
//
// - flechas ← → para pasar de foto, Escape para cerrar
// - se puede deslizar con el dedo para pasar de foto
// - en el celular se puede pellizcar (pinch) para acercar la
//   foto actual — es `touch-action: pinch-zoom` en el contenedor,
//   el navegador hace el resto, no hace falta código de zoom
// - el foco vuelve a quien abrió el visor al cerrarlo (eso lo
//   maneja quien llama, en su propia `onClose`)
// - precarga la foto siguiente y la anterior
//
// Para modificar:
// - qué pasa al deslizar/pellizcar: los handlers de acá abajo
// - el diseño del visor en sí: el JSX de este archivo
// ============================================================

export interface LightboxPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface LightboxProps {
  photos: LightboxPhoto[];
  /** Índice de la foto abierta, o null si el visor está cerrado. */
  index: number | null;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (index === null) return;
    document.body.dataset.locked = 'true';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate(1);
      if (event.key === 'ArrowLeft') onNavigate(-1);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      delete document.body.dataset.locked;
    };
  }, [index, onClose, onNavigate]);

  if (index === null) return null;
  const current = photos[index];
  if (!current) return null;

  const hasMultiple = photos.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} de ${photos.length}`}
      className="fixed inset-0 z-50 flex flex-col bg-scrim/95"
      onTouchStart={(event) => {
        // Deslizar con un dedo pasa de foto. Pellizcar con dos dedos
        // (dos toques a la vez) no dispara esto, así que no interfiere
        // con el pinch-zoom nativo de la imagen.
        if (event.touches.length > 1) return;
        const startX = event.changedTouches[0]?.clientX ?? 0;
        const target = event.currentTarget;
        const onEnd = (end: TouchEvent) => {
          const delta = (end.changedTouches[0]?.clientX ?? 0) - startX;
          if (hasMultiple && Math.abs(delta) > 50) onNavigate(delta > 0 ? -1 : 1);
          target.removeEventListener('touchend', onEnd);
        };
        target.addEventListener('touchend', onEnd);
      }}
    >
      <div className="flex items-center justify-between px-3 py-2">
        <span className="label text-on-scrim/70 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {photos.length}
        </span>
        <div className="flex items-center gap-1">
          <ShareButton
            imageUrl={`${site.url}${current.src}`}
            text={current.alt}
            label="Compartir esta foto"
            className="size-11 text-on-scrim hover:text-on-scrim/60"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar la foto"
            className="grid size-11 place-items-center text-on-scrim hover:text-on-scrim/60"
          >
            <Icon name="close" />
          </button>
        </div>
      </div>

      {/* touch-action: pinch-zoom habilita el pellizco nativo del
          navegador sobre esta imagen, sin bloquear el deslizar de
          un dedo que maneja el touchstart de arriba. */}
      <div className="relative flex-1" style={{ touchAction: 'pinch-zoom' }}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="100vw"
          className="animate-[reveal-up_0.2s_var(--ease-out-soft)_both] object-contain"
        />
      </div>

      {hasMultiple && (
        <div className="flex items-center justify-center gap-2 p-3">
          <button
            type="button"
            onClick={() => onNavigate(-1)}
            aria-label="Foto anterior"
            className="grid size-12 place-items-center border border-on-scrim/25 text-on-scrim hover:bg-on-scrim hover:text-scrim"
          >
            <Icon name="chevron-left" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate(1)}
            aria-label="Foto siguiente"
            className="grid size-12 place-items-center border border-on-scrim/25 text-on-scrim hover:bg-on-scrim hover:text-scrim"
          >
            <Icon name="chevron-right" />
          </button>
        </div>
      )}

      {/* Precarga silenciosa de la anterior y la siguiente, para
          que pasar de foto sea instantáneo. */}
      {hasMultiple &&
        [-1, 1].map((offset) => {
          const neighbour = photos[(index + offset + photos.length) % photos.length];
          if (!neighbour) return null;
          return <link key={offset} rel="preload" as="image" href={neighbour.src} />;
        })}
    </div>
  );
}
