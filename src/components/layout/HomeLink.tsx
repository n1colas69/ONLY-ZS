'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// ============================================================
// LOGO DEL HEADER
// ------------------------------------------------------------
// Es un <Link href="/"> normal, con un caso aparte: si ya ESTÁS
// en la home y lo tocás, Next no navega a ningún lado (ya estás
// en esa dirección), así que sin esto el click no hacía nada —
// ni te subía arriba de la página, ni traía una foto de portada
// nueva (la home sortea una al azar en cada visita, ver page.tsx).
//
// Acá se detecta ese caso puntual y se hacen las dos cosas a mano:
// scroll suave al principio + `router.refresh()`, que le pide a
// Next que vuelva a correr la página en el servidor (nuevo sorteo
// de foto) sin recargar todo el sitio.
//
// Cuando NO estás en la home, el click es un <Link> de toda la
// vida: navega y Next ya se encarga de subir el scroll solo.
// ============================================================

export function HomeLink() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Link
      href="/"
      className="d4 -mb-px inline-block transition-transform duration-200 hover:-rotate-2"
      aria-label="ONLY ZS, ir al inicio"
      onClick={(event) => {
        if (pathname !== '/') return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.refresh();
      }}
    >
      ONLY ZS
    </Link>
  );
}
