import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

// ============================================================
// PÁGINA NO ENCONTRADA (404)
// ------------------------------------------------------------
// Pasa cuando alguien abre el link de una pieza que ya no está.
// En una tienda de vintage eso es normal: las piezas son únicas
// y a veces se retiran. El texto lo dice así, sin disfrazarlo.
// ============================================================

export default function NotFound() {
  return (
    <div className="edge flex min-h-[60vh] flex-col justify-center py-16">
      <p className="stamp label mb-3">Error 404</p>
      <h1 className="d1">
        Esto ya no
        <br />
        está acá
      </h1>
      <p className="mt-5 max-w-prose text-ash">
        Puede que la pieza se haya vendido y la hayamos retirado, o que el link esté mal escrito.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/tienda"
          className="label-ink inline-flex min-h-11 items-center gap-2 bg-ink px-5 text-paper hover:bg-ash"
        >
          Ver el catálogo
          <Icon name="arrow-right" size={15} />
        </Link>
        <Link
          href="/"
          className="label-ink inline-flex min-h-11 items-center gap-2 border border-ink px-5 hover:bg-ink hover:text-paper"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
