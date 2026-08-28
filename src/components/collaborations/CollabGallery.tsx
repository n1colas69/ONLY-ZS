'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { Lightbox } from '@/components/ui/Lightbox';

// ============================================================
// FOTOS DE LA COLABORACIÓN
// ------------------------------------------------------------
// Igual que la Galería ZS: tocar una foto abre el visor a
// pantalla completa (src/components/ui/Lightbox.tsx), con
// flechas, deslizar y pellizcar para acercar.
//
// Para modificar:
// - las fotos de cada colaboración: src/data/collaborations.ts
// - las columnas de la grilla:      la clase `grid-cols-*` de acá
// - el visor en sí:                 src/components/ui/Lightbox.tsx
// ============================================================

export interface CollabPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function CollabGallery({ photos }: { photos: CollabPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) triggersRef.current[current]?.focus();
      return null;
    });
  }, []);

  const navigate = useCallback(
    (direction: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + direction + photos.length) % photos.length;
      });
    },
    [photos.length]
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            ref={(element) => {
              triggersRef.current[index] = element;
            }}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Ampliar: ${photo.alt}`}
            className="block w-full shadow-card focus-visible:outline-offset-4"
          >
            <div
              className="relative overflow-hidden bg-paper-dim"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 48rem) 50vw, 25vw"
                loading={index < 2 ? 'eager' : 'lazy'}
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>

      <Lightbox photos={photos} index={openIndex} onClose={close} onNavigate={navigate} />
    </>
  );
}
