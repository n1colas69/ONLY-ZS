import Image from 'next/image';
import { getImageSize, getImageUrl } from '@/data/image-sizes';
import { cn } from '@/lib/cn';

// ============================================================
// FOTO
// ------------------------------------------------------------
// Envuelve next/image y le pasa el tamaño real de cada archivo,
// medido por `npm run images`. Eso hace dos cosas:
// 1. la página reserva el espacio exacto y no "salta" al cargar
// 2. la foto conserva su proporción original, no se recorta
//
// Next genera solo las versiones AVIF y WebP en el tamaño que
// cada pantalla necesita. Vos siempre subís un JPG y listo.
//
// Para modificar:
// - proporción por defecto si falta medir: DEFAULT_ASPECT en
//   src/data/image-sizes.ts
// ============================================================

interface ProductImageProps {
  src: string;
  alt: string;
  /**
   * Cuánto espacio ocupa la foto en pantalla. Es lo que usa el
   * navegador para elegir qué tamaño descargar: si está mal, se
   * baja una foto más grande de lo necesario.
   */
  sizes: string;
  /** true solo para las fotos que se ven sin scrollear. */
  priority?: boolean;
  /**
   * true SOLO para la foto candidata a "LCP" (la más grande que se
   * pinta primero). Le pide al navegador que la baje antes que
   * cualquier otra cosa. Ponerlo en más de una foto por página
   * hace que compitan entre sí y no ayuda a nadie — por eso es un
   * prop aparte de `priority`, no "toda foto prioritaria es la más
   * importante".
   */
  fetchPriority?: 'high';
  className?: string;
  /** Recorta a esta proporción en vez de respetar la original. */
  aspect?: string;
}

export function ProductImage({
  src,
  alt,
  sizes,
  priority = false,
  fetchPriority,
  className,
  aspect,
}: ProductImageProps) {
  // La medida se busca con la ruta ORIGINAL (image-sizes.ts la indexa
  // así); la versión (?v=...) se agrega recién para la etiqueta
  // <Image>, que es lo único que tiene que "ver" el navegador.
  const [width, height] = getImageSize(src);

  return (
    // shadow-card va en un envoltorio APARTE del que recorta la
    // foto: si overflow-hidden y la sombra viven en el mismo
    // elemento, ese mismo overflow-hidden le recorta su propia
    // sombra (se pierde el "levante" al pasar el cursor). Separado
    // así, el de afuera sube y hace sombra; el de adentro solo
    // recorta la foto al recuadro.
    <div className={cn('shadow-card', className)}>
      <div
        className="relative overflow-hidden bg-paper-dim"
        style={{ aspectRatio: aspect ?? `${width} / ${height}` }}
      >
        <Image
          src={getImageUrl(src)}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          fetchPriority={fetchPriority}
          loading={priority ? undefined : 'lazy'}
          className="object-cover"
        />
      </div>
    </div>
  );
}
