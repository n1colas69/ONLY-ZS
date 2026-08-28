'use client';

import { Icon } from '@/components/ui/Icon';
import { toggleTheme, useTheme } from '@/lib/theme';

// ============================================================
// MODO OSCURO
// ------------------------------------------------------------
// Un solo botón que invierte tinta y papel (ver src/lib/theme.ts
// y el bloque :root[data-theme='dark'] en globals.css). Vive en
// el header: es global y siempre visible, en celular y escritorio.
// ============================================================

export function ThemeToggle() {
  const theme = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      aria-pressed={isDark}
      className="grid size-11 place-items-center hover:text-ash"
    >
      <Icon name={isDark ? 'sun' : 'moon'} />
    </button>
  );
}
