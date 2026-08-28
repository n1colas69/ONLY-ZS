import { ZoomImage } from '@/components/products/ZoomImage';

// ============================================================
// GALERÍA DE LA FICHA DE PRODUCTO
// ------------------------------------------------------------
// - En celular: una tira horizontal que se desliza con el dedo,
//   con scroll-snap para que cada foto quede centrada. Debajo,
//   el contador "01 / 06". Tocar una foto la acerca (zoom).
// - En escritorio: todas las fotos apiladas en una columna, como
//   un archivo fotográfico. Pasar el cursor por una foto la
//   acerca, siguiendo el puntero.
//
// El zoom en sí (mover el cursor / tocar) lo resuelve ZoomImage
// (src/components/products/ZoomImage.tsx). Este componente solo
// arma el layout de las dos vistas.
//
// Este archivo sigue siendo un Server Component: no usa hooks ni
// estado propio. ZoomImage es lo único que necesita cliente.
//
// Para modificar:
// - el zoom (cuánto acerca, cómo se activa): ZoomImage.tsx
// - una sola foto grande + miniaturas: sería otro layout acá
// ============================================================

interface ProductGalleryProps {
  /** Cada foto ya con su tamaño real, resuelto en el servidor. */
  images: { src: string; width: number; height: number }[];
  /** Se usa para el texto alternativo de cada foto. */
  name: string;
}

// Las dos vistas (tira de celular / columna de escritorio) están
// SIEMPRE las dos en el HTML: la que no toca se oculta con
// `lg:hidden` / `hidden lg:block`, no se saca del documento. Eso es
// necesario — son layouts distintos, no la misma foto en dos
// tamaños — pero como `sizes` no sabe de CSS, sin la condición de
// medios de acá abajo la vista oculta igual le pide al navegador
// "esto se ve a todo el ancho de la pantalla" y se termina bajando
// una foto entera de más, en paralelo con la que sí hace falta.
// Midiendo con throttling real: en escritorio eso agregaba ~560ms
// al LCP (una de cada cuatro partes del tiempo de carga) porque las
// dos descargas competían por el mismo ancho de banda; en celular
// no se notaba. Por eso la vista oculta pide "1px" — el navegador
// elige la miniatura más chica en vez de una copia de tamaño real.
const SIZES_MOBILE = '(min-width: 64rem) 1px, 88vw';
const SIZES_DESKTOP = '(max-width: 64rem) 1px, 55vw';

export function ProductGallery({ images, name }: ProductGalleryProps) {
  if (images.length === 0) {
    return <div className="aspect-4/5 w-full bg-paper-dim" />;
  }

  return (
    <div>
      {/* --- Celular: tira deslizable, tocar para acercar --- */}
      <div className="lg:hidden">
        <ul className="scrollbar-thin flex snap-x snap-mandatory gap-1 overflow-x-auto">
          {images.map((image, index) => (
            <li key={image.src} className="w-[88%] shrink-0 snap-center">
              <ZoomImage
                src={image.src}
                alt={index === 0 ? name : `${name} — foto ${index + 1} de ${images.length}`}
                width={image.width}
                height={image.height}
                sizes={SIZES_MOBILE}
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : undefined}
              />
            </li>
          ))}
        </ul>
        <p className="label mt-2 px-3">
          {images.length > 1 ? 'Deslizá · ' : ''}Tocá una foto para acercar
          {images.length > 1 ? ` · ${images.length} fotos` : ''}
        </p>
      </div>

      {/* --- Escritorio: columna apilada, cursor para acercar --- */}
      <ul className="hidden lg:block">
        {images.map((image, index) => (
          <li key={image.src} className="relative mb-1 last:mb-0">
            <ZoomImage
              src={image.src}
              alt={index === 0 ? name : `${name} — foto ${index + 1} de ${images.length}`}
              width={image.width}
              height={image.height}
              sizes={SIZES_DESKTOP}
              priority={index === 0}
              fetchPriority={index === 0 ? 'high' : undefined}
            />
            <span className="stamp label pointer-events-none absolute left-2 top-2 text-on-scrim mix-blend-difference tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
