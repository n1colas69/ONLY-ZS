import type { Metadata, Viewport } from 'next';
import { Archivo, Bebas_Neue, Space_Mono } from 'next/font/google';
import { BackButton } from '@/components/layout/BackButton';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Overlays } from '@/components/layout/Overlays';
import { getImageUrl } from '@/data/image-sizes';
import { site } from '@/data/site';
import { getLiteCatalog } from '@/lib/catalog';
import { jsonLdScript, organizationJsonLd } from '@/lib/seo';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import './globals.css';

// ============================================================
// LAYOUT PRINCIPAL
// ------------------------------------------------------------
// Envuelve TODAS las páginas: header, footer, paneles y avisos.
//
// Para modificar:
// - las tipografías:      los dos next/font de acá abajo
// - título por defecto:   metadata.title.default
// - descripción general:  src/data/site.ts
// - color de la barra del celular: viewport.themeColor
//
// Las fuentes se descargan de Google UNA VEZ, en el build, y se
// sirven desde tu propio dominio. El sitio viejo las pedía a
// Google en cada visita: eran dos conexiones externas antes de
// poder dibujar una letra.
// ============================================================

/**
 * Bebas Neue: titulares. Es la tipografía que ya usaba ONLY ZS y
 * se conserva, porque es parte de la identidad.
 */
const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

/**
 * Archivo: todo el texto. Reemplaza a Poppins.
 * Poppins es la tipografía por defecto de las plantillas genéricas;
 * Archivo es una grotesca editorial que sostiene mejor los textos
 * chicos y los micro-labels espaciados.
 */
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

/**
 * Space Mono: números, micro-labels, precios y fichas técnicas.
 * Da el segundo gesto tipográfico del sitio (el primero es Bebas):
 * titulares gigantes + datos tecleados, como un catálogo de archivo.
 */
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Vintage & Second Hand`,
    // Cada página pone su propio título acá adelante.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'es_AR',
    url: site.url,
    title: `${site.name} — Vintage & Second Hand`,
    description: site.description,
    // Imagen por defecto para compartir: la usa cualquier página que
    // no ponga la suya propia (el producto y la colaboración sí
    // tienen la suya, en src/lib/seo.ts).
    images: [{ url: `${site.url}${getImageUrl('/images/gallery/hero.jpg')}` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${site.url}${getImageUrl('/images/gallery/hero.jpg')}`],
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/images/brand/logo.png',
    apple: '/images/brand/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D0D0D',
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // El catálogo liviano se calcula en el servidor y viaja una sola
  // vez. Los paneles (bolsa, favoritos, buscador) lo usan sin tener
  // que importar el catálogo completo al navegador.
  const catalog = getLiteCatalog();

  return (
    <html
      lang="es-AR"
      className={`${bebas.variable} ${archivo.variable} ${spaceMono.variable}`}
      // El script de acá abajo le pone data-theme a este <html> antes
      // de que React hidrate (para que el tema no parpadee). React no
      // sabe nada de ese atributo: sin esto, tira una advertencia de
      // hidratación en CADA carga de página.
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/* Pone data-theme en <html> antes del primer pintado, para
            que la página nunca arranque con el tema equivocado.
            Ver src/lib/theme.ts. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />

        <a href="#contenido" className="sr-only-focusable">
          Saltar al contenido
        </a>

        <Header />
        <main id="contenido" className="flex-1">
          <BackButton />
          {children}
        </main>
        <Footer />
        <Overlays catalog={catalog} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd())}
        />
      </body>
    </html>
  );
}
