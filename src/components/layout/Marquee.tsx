import { marqueeBrands } from '@/data/site';

// ============================================================
// MARQUEE DE MARCAS
// ------------------------------------------------------------
// La tira de marcas que cruza la página. Viene del sitio viejo y
// se conserva: es barato, tiene carácter y dice en dos segundos
// qué tipo de ropa vende ONLY ZS.
//
// Para modificar:
// - las marcas:    marqueeBrands en src/data/site.ts
// - la velocidad:  la animación .marquee-track en globals.css
//
// La lista se repite dos veces para que el loop no tenga corte.
// El bloque entero está oculto para lectores de pantalla: es
// decorativo, y leer 22 marcas seguidas no le sirve a nadie.
// ============================================================

export function Marquee() {
  const line = [...marqueeBrands, ...marqueeBrands];

  return (
    <div
      className="overflow-hidden border-y border-dashed border-on-scrim/30 bg-scrim py-2.5 text-on-scrim select-none"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {line.map((brand, index) => (
          <span key={`${brand}-${index}`} className="label flex shrink-0 items-center text-on-scrim/70">
            {brand}
            <span className="px-5 text-on-scrim/30">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
