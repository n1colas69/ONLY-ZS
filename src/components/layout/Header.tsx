import Link from 'next/link';
import { HeaderActions } from '@/components/layout/HeaderActions';
import { HomeLink } from '@/components/layout/HomeLink';

// ============================================================
// HEADER
// ------------------------------------------------------------
// Deliberadamente chico. No es una barra de navegación
// corporativa: es una firma arriba de la página.
//
// Detalle de intención: el nombre "ONLY ZS" se apoya en la base
// del header y sobresale un pelo del margen, mientras los links
// se alinean por abajo. Esa desalineación mínima es la que hace
// que el header se lea como editorial y no como plantilla.
//
// Para modificar:
// - los links:        NAV_LINKS acá abajo
// - el nombre/logo:   src/components/layout/HomeLink.tsx (si
//                     querés una imagen, usá public/images/brand/logo.png)
// - los iconos:       src/components/layout/HeaderActions.tsx
// ============================================================

const NAV_LINKS = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/galeria', label: 'Galería' },
  { href: '/colaboraciones', label: 'Colabs' },
];

export function Header() {
  return (
    // Opaco, sin blur. Antes era bg-paper/90 + backdrop-blur-sm:
    // era el único gesto de "vidrio esmerilado" que quedaba en el
    // sitio y desentonaba con todo lo demás (que es papel y tinta,
    // sin profundidad falsa). Un header opaco además no deja que
    // las fotos se transparenten por detrás mientras se scrollea.
    <header className="sticky top-0 z-40 border-b border-dashed border-line-strong bg-paper">
      <div className="flex h-14 items-end gap-4 pr-1 pl-3 md:h-16 md:pr-2 md:pl-4">
        <HomeLink />

        {/* Los links van pegados al nombre, no repartidos a lo ancho.
            Antes el header era `justify-between` con la navegación
            del lado de los iconos: quedaba un vacío de media pantalla
            en el medio, que es exactamente el aire que tiene la barra
            de una plantilla. Un cabezal de revista agrupa el nombre y
            las secciones a la izquierda, y deja el aire de un solo
            lado. */}
        <nav aria-label="Principal" className="hidden items-end gap-6 pb-3.5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="label-ink hover:text-ash">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto">
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}
