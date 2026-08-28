import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { categories } from '@/data/categories';
import { infoPages, site } from '@/data/site';
import { whatsappUrl, buildGeneralMessage } from '@/lib/whatsapp';

// ============================================================
// FOOTER
// ------------------------------------------------------------
// Cierra la página con el nombre a tamaño de contratapa y la
// información real: qué es ONLY ZS, dónde está y cómo se le
// escribe.
//
// El sitio viejo mostraba logos de Visa y Mastercard: se sacaron.
// No se paga en la web, así que prometían algo que no existe.
//
// Antes esto era una grilla de cuatro columnas de links
// (1.4fr 1fr 1fr 1fr) con tres encabezados — "Tienda", "Más",
// "Ayuda". Es el pie de página de cualquier plantilla del rubro y
// era lo más genérico que quedaba en el sitio. Los links son los
// mismos (no se sacó ninguno: la gente los usa y Google también),
// pero ahora van tecleados en línea, separados por puntos, como el
// colofón de un impreso; y el peso visual se lo lleva el nombre
// gigante, que es lo único que uno querría ver al final de la
// página de una marca.
//
// Para modificar:
// - textos de Info/Envíos/FAQ:  infoPages en src/data/site.ts
// - redes y contacto:           site en src/data/site.ts
// - qué links aparecen:         este archivo
// ============================================================

/** Una línea del colofón: título tecleado + links separados por puntos. */
function IndexRow({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-dashed border-line py-3 md:flex-row md:gap-6">
      <h2 className="label shrink-0 md:w-28">{title}</h2>
      <nav aria-label={label} className="label-ink flex flex-wrap gap-x-4 gap-y-1.5">
        {children}
      </nav>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="rhythm border-t border-dashed border-line-strong">
      <div className="edge grid gap-8 py-10 md:grid-cols-[1fr_1.4fr] md:gap-16 md:py-14">
        <div>
          <p className="max-w-64 text-ash">
            Vintage y second hand seleccionado a mano.
            <br />
            {site.location}
          </p>
          <div className="mt-5 flex gap-1">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de ONLY ZS"
              className="grid size-11 place-items-center border border-line-strong hover:bg-ink hover:text-paper"
            >
              <Icon name="instagram" />
            </a>
            <a
              href={whatsappUrl(buildGeneralMessage())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp"
              className="grid size-11 place-items-center border border-line-strong hover:bg-ink hover:text-paper"
            >
              <Icon name="whatsapp" />
            </a>
          </div>
        </div>

        <div className="border-t border-dashed border-line md:border-t-0">
          <IndexRow title="Tienda" label="Tienda">
            <Link href="/tienda" className="hover:text-ash">
              Todo el catálogo
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                className="hover:text-ash"
              >
                {category.name}
              </Link>
            ))}
          </IndexRow>

          <IndexRow title="Más" label="Contenido">
            <Link href="/galeria" className="hover:text-ash">
              Galería ZS
            </Link>
            <Link href="/colaboraciones" className="hover:text-ash">
              Colaboraciones
            </Link>
            <Link href="/favoritos" className="hover:text-ash">
              Favoritos
            </Link>
            <Link href="/carrito" className="hover:text-ash">
              Bolsa
            </Link>
          </IndexRow>

          <IndexRow title="Ayuda" label="Ayuda">
            {infoPages.map((page) => (
              <Link key={page.slug} href={`/info/${page.slug}`} className="hover:text-ash">
                {page.title}
              </Link>
            ))}
            <a
              href={whatsappUrl(buildGeneralMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ash"
            >
              {site.whatsappDisplay}
            </a>
          </IndexRow>
        </div>
      </div>

      {/* El nombre a tamaño de contratapa, cortado por el borde de
          la hoja. `select-none` y aria-hidden porque es un dibujo,
          no un texto: el nombre de la marca ya está en el header y
          en los datos estructurados, y un lector de pantalla no
          tiene por qué leerlo dos veces al llegar al final. */}
      <div className="edge overflow-hidden" aria-hidden="true">
        <p className="font-display -mb-[0.16em] -ml-[0.02em] text-[25vw] leading-[0.72] select-none">
          ONLY ZS
        </p>
      </div>

      <div className="label edge flex flex-col gap-1 border-t border-dashed border-line-strong py-5 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} ONLY ZS</span>
        <span>Piezas únicas. Cuando se venden, se venden.</span>
      </div>
    </footer>
  );
}
