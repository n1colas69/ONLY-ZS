import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CollabGallery } from '@/components/collaborations/CollabGallery';
import { Icon } from '@/components/ui/Icon';
import { collaborations, getCollaboration } from '@/data/collaborations';
import { getImageSize } from '@/data/image-sizes';
import { collaborationMetadata } from '@/lib/seo';

// ============================================================
// COLABORACIÓN — /colaboraciones/{slug}
// ------------------------------------------------------------
// El sitio viejo tenía UNA página (brand.html) que se rellenaba
// con JavaScript según ?brand=... y tenía un error: la clave
// "Deep-Indumentaria" no coincidía con el link "deep-indumentaria"
// por las mayúsculas, así que esa colaboración mostraba la marca
// equivocada. Acá cada colaboración es una página de verdad y ese
// tipo de error lo detecta el build.
//
// Para modificar: src/data/collaborations.ts
// ============================================================

export function generateStaticParams() {
  return collaborations.map((collaboration) => ({ slug: collaboration.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collaboration = getCollaboration(slug);
  if (!collaboration) return { title: 'Colaboración no encontrada' };
  return collaborationMetadata(collaboration);
}

export default async function CollaborationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collaboration = getCollaboration(slug);
  if (!collaboration) notFound();

  const links = [
    { label: 'Instagram', href: collaboration.instagram, icon: 'instagram' as const },
    { label: 'YouTube', href: collaboration.youtube, icon: 'arrow-up-right' as const },
  ].filter((link) => link.href);

  // El tamaño de cada foto se resuelve acá, en el servidor, y se le
  // pasa ya listo a CollabGallery (componente de cliente): así el
  // visor no necesita importar el mapa completo de medidas.
  const galleryPhotos = collaboration.gallery.map((src, index) => {
    const [width, height] = getImageSize(src);
    return { src, alt: `${collaboration.title} — foto ${index + 1}`, width, height };
  });

  return (
    <>
      <header className="relative">
        <div className="relative aspect-4/5 w-full md:aspect-21/9">
          <Image
            src={collaboration.heroImage}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Faja de tinta, como en la portada, la galería y las
            categorías. Acá había un degradado de negro sobre toda
            la foto, que es justo lo que este bloque evita. */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="inline-block bg-ink px-3 pt-2 pb-2 md:px-4">
            <p className="label text-paper/70">
              <Link href="/colaboraciones" className="hover:text-paper">
                Colaboraciones
              </Link>
            </p>
            <h1 className="d1 text-paper">{collaboration.title}</h1>
            <p className="mt-2 max-w-prose text-paper/85">{collaboration.tagline}</p>
          </div>
        </div>
      </header>

      <div className="edge grid gap-8 py-8 md:grid-cols-[1.4fr_1fr] md:gap-16 md:py-14">
        <div>
          <h2 className="label mb-3">Sobre el proyecto</h2>
          <p className="max-w-prose text-[1.0625rem] leading-relaxed">
            {collaboration.description}
          </p>
        </div>

        <div>
          {links.length > 0 && (
            <>
              <h2 className="label mb-3">Dónde encontrarlos</h2>
              <ul className="mb-8 border-t border-dashed border-line-strong">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center justify-between border-b border-dashed border-line-strong hover:text-ash"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon name={link.icon} size={16} />
                        {link.label}
                      </span>
                      <Icon name="arrow-up-right" size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {collaboration.video && (
            <>
              <h2 className="label mb-3">Último video</h2>
              <a
                href={collaboration.video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-line-strong p-4 hover:bg-paper-dim"
              >
                <p className="d4">{collaboration.video.title}</p>
                <p className="label mt-2 inline-flex items-center gap-1.5">
                  Ver en YouTube
                  <Icon name="arrow-up-right" size={13} />
                </p>
              </a>
            </>
          )}
        </div>
      </div>

      {galleryPhotos.length > 0 && (
        <section className="px-3 pb-8 md:px-4 md:pb-14" aria-labelledby="fotos">
          <h2 id="fotos" className="label mb-3">
            Fotos
          </h2>
          <CollabGallery photos={galleryPhotos} />
        </section>
      )}
    </>
  );
}
