import Image from 'next/image';
import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Icon } from '@/components/ui/Icon';
import { galleryPhotos } from '@/data/gallery';
import { getImageSize, getImageUrl } from '@/data/image-sizes';
import { site } from '@/data/site';

// ============================================================
// GALERÍA ZS — /galeria
// ------------------------------------------------------------
// Fotos de la comunidad usando las prendas.
//
// Para modificar:
// - las fotos:   src/data/gallery.ts
// - la portada:  public/images/gallery/hero.jpg
// - los textos:  este archivo
// ============================================================

export const metadata: Metadata = {
  title: 'Galería ZS',
  description:
    'Looks reales de la comunidad ONLY ZS. Fotos de gente usando las piezas. Mandá la tuya por Instagram.',
  alternates: { canonical: '/galeria' },
  openGraph: {
    title: `Galería ZS | ${site.name}`,
    images: [{ url: `${site.url}${getImageUrl('/images/gallery/hero.jpg')}` }],
  },
};

export default function GalleryPage() {
  // El tamaño de cada foto se resuelve acá, en el servidor. Así el
  // visor no necesita importar el mapa completo de medidas.
  //
  // `src` se versiona acá mismo, una sola vez: como el visor y la
  // grilla reciben este objeto ya armado, ninguno de los dos
  // necesita saber que la versión existe.
  const photos = galleryPhotos.map((photo) => {
    const [width, height] = getImageSize(photo.src);
    return { ...photo, src: getImageUrl(photo.src), width, height };
  });

  return (
    <>
      {/* Mismo cabezal que la portada: la foto sin velo encima y el
          título apoyado en un bloque de tinta macizo. Antes la foto
          llevaba un `bg-scrim/35` parejo que la apagaba entera solo
          para que se leyera el título. */}
      <header className="relative">
        <div className="relative aspect-3/2 w-full md:aspect-4/1">
          <Image
            src={getImageUrl('/images/gallery/hero.jpg')}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="inline-block bg-ink px-3 pt-2 pb-1 md:px-4">
            <p className="label text-paper/70">Comunidad · {galleryPhotos.length} fotos</p>
            <h1 className="d1 text-paper">Galería ZS</h1>
          </div>
        </div>
      </header>

      <div className="edge py-6 md:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-prose text-ash">
            Gente real con las prendas puestas. Si comprate algo y te sacaste una foto, mandala:
            va a parar acá.
          </p>
          <a
            href={site.instagramDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="label-ink inline-flex min-h-11 shrink-0 items-center gap-2 border border-ink px-4 hover:bg-ink hover:text-paper"
          >
            <Icon name="instagram" size={16} />
            Mandá la tuya
          </a>
        </div>

        <GalleryGrid photos={photos} />
      </div>
    </>
  );
}
