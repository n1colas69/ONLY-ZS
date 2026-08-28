// ============================================================
// ICONOS
// ------------------------------------------------------------
// El sitio viejo cargaba Font Awesome entero desde un CDN (~30 KB
// de CSS + archivos de fuente) para usar 41 iconos. Acá están
// dibujados a mano los 16 que el sitio necesita, en SVG, dentro
// del HTML: cero requests, cero espera.
//
// Para agregar un icono:
// 1. Buscá un SVG de 24x24 con stroke (no relleno)
// 2. Pegá el contenido del <svg> como una entrada de PATHS
// 3. Usalo:  <Icon name="tu-icono" />
//
// Todos los iconos son decorativos por defecto (aria-hidden).
// Si un icono es la ÚNICA información de un botón, el botón tiene
// que tener su propio aria-label.
// ============================================================

import type { SVGProps } from 'react';

export type IconName =
  | 'search'
  | 'bag'
  | 'heart'
  | 'heart-filled'
  | 'close'
  | 'menu'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-up-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'plus'
  | 'minus'
  | 'check'
  | 'instagram'
  | 'whatsapp'
  | 'share'
  | 'sliders'
  | 'sun'
  | 'moon';

const PATHS: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  bag: (
    <>
      <path d="M4 7h16l-1 13H5L4 7Z" />
      <path d="M8.5 7V5.5a3.5 3.5 0 0 1 7 0V7" />
    </>
  ),
  heart: <path d="M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20Z" />,
  'heart-filled': (
    <path
      d="M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20Z"
      fill="currentColor"
    />
  ),
  close: (
    <>
      <path d="m5 5 14 14" />
      <path d="m19 5-14 14" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="M12 20V5" />
      <path d="m6 11 6-6 6 6" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  'chevron-left': <path d="m15 5-7 7 7 7" />,
  'chevron-right': <path d="m9 5 7 7-7 7" />,
  'chevron-down': <path d="m5 9 7 7 7-7" />,
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  check: <path d="m4 12 5 5L20 6" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.8 7.2h.01" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.2-4A8 8 0 1 1 8 18.8L4 20Z" />
      <path d="M9.2 9.4c.3 2.2 2.3 4.2 4.5 4.6l1-1.2 1.7.8-.3 1.5c-2.9.5-6.6-3.2-6.1-6.1l1.5-.3.8 1.7-1.1.3" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="m8.2 10.8 7.6-3.6" />
      <path d="m8.2 13.2 7.6 3.6" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 8h10" />
      <path d="M18 8h2" />
      <path d="M4 16h4" />
      <path d="M12 16h8" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="10" cy="16" r="2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5" />
      <path d="M12 19v2.5" />
      <path d="M4.6 4.6l1.8 1.8" />
      <path d="M17.6 17.6l1.8 1.8" />
      <path d="M2.5 12h2.5" />
      <path d="M19 12h2.5" />
      <path d="M4.6 19.4l1.8-1.8" />
      <path d="M17.6 6.4l1.8-1.8" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />,
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  /** Tamaño en píxeles. Por defecto 20. */
  size?: number;
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
