import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Icon } from '@/components/ui/Icon';
import { infoPages, site } from '@/data/site';
import { buildGeneralMessage, whatsappUrl } from '@/lib/whatsapp';

// ============================================================
// PÁGINAS DE INFORMACIÓN — /info/{slug}
// ------------------------------------------------------------
// Info, Envíos, Cambios y Preguntas frecuentes.
//
// En el sitio viejo esto se abría en una ventanita: no tenía URL
// propia, no se podía compartir ni enlazar desde WhatsApp, y
// Google no lo veía. Ahora cada una es una página real.
//
// Para modificar los textos: infoPages en src/data/site.ts
// ============================================================

export function generateStaticParams() {
  return infoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = infoPages.find((item) => item.slug === slug);
  if (!page) return { title: 'Página no encontrada' };

  return {
    title: page.title,
    description: page.body[0],
    alternates: { canonical: `/info/${page.slug}` },
  };
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = infoPages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <div className="gutter py-8 md:py-14">
      <nav aria-label="Otras páginas de ayuda" className="label mb-6 flex flex-wrap gap-x-4 gap-y-1">
        {infoPages.map((item) => (
          <Link
            key={item.slug}
            href={`/info/${item.slug}`}
            aria-current={item.slug === page.slug ? 'page' : undefined}
            className={item.slug === page.slug ? 'text-ink' : 'hover:text-ink'}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <h1 className="d1 border-b border-dashed border-line-strong pb-3">{page.title}</h1>

      <div className="mt-6 max-w-prose space-y-4 text-[1.0625rem] leading-relaxed">
        {page.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <a
        href={whatsappUrl(buildGeneralMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="label-ink mt-10 inline-flex min-h-11 items-center gap-2 border border-ink px-5 hover:bg-ink hover:text-paper"
      >
        <Icon name="whatsapp" size={16} />
        Escribinos · {site.whatsappDisplay}
      </a>
    </div>
  );
}
