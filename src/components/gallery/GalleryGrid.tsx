'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { Lightbox } from '@/components/ui/Lightbox';
import type { GalleryPhoto } from '@/types';

/**
 * Foto con su tamaño ya resuelto.
 *
 * El tamaño lo calcula el SERVIDOR y lo manda ya listo. Si acá se
 * importara el mapa de medidas (src/data/image-sizes.ts), las 349
 * entradas —incluidas las de todos los productos— viajarían al
 * navegador de cada visitante solo para mostrar 33 fotos.
 */
export interface MeasuredPhoto extends GalleryPhoto {
  width: number;
  height: number;
}

// ============================================================
// GALERÍA ZS
// ------------------------------------------------------------
// Grilla de fotos. Tocar una abre el visor a pantalla completa
// (componente compartido: src/components/ui/Lightbox.tsx), con
// flechas, deslizar y pellizcar para acercar.
//
// La grilla en sí se ve completa aunque el JavaScript no cargue;
// lo único que no funcionaría es abrir el visor.
//
// Usa la MISMA grilla que el catálogo (`masonry` / `masonry-item`,
// en globals.css). Antes tenía sus propias columnas, parecidas
// pero no iguales: la galería engranaba y el catálogo no, así que
// las dos grillas del sitio se veían distintas sin que hubiera una
// razón. Ahora hay un solo masonry y se cambia en un solo lado.
//
// Para modificar:
// - las fotos:       src/data/gallery.ts
// - las columnas:    la utilidad `masonry` en globals.css
// - el visor en sí:  src/components/ui/Lightbox.tsx
// ============================================================

export function GalleryGrid({ photos }: { photos: MeasuredPhoto[] }) {
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
      <div className="masonry">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            ref={(element) => {
              triggersRef.current[index] = element;
            }}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Ampliar: ${photo.alt}`}
            className="masonry-item group block w-full shadow-card focus-visible:outline-offset-4"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 48rem) 50vw, (max-width: 80rem) 33vw, 25vw"
              loading={index < 4 ? 'eager' : 'lazy'}
              priority={index < 2}
              fetchPriority={index === 0 ? 'high' : undefined}
              className="w-full bg-paper-dim transition-opacity duration-200 group-hover:opacity-90"
            />
          </button>
        ))}
      </div>

      <Lightbox photos={photos} index={openIndex} onClose={close} onNavigate={navigate} />
    </>
  );
}
