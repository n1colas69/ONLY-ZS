import next from 'eslint-config-next';

// ============================================================
// ESLINT
// ------------------------------------------------------------
// Revisa el código en busca de errores comunes. Se corre con:
//     npm run lint
//
// Usa la configuración oficial de Next.js, que incluye reglas de
// accesibilidad (jsx-a11y) y de rendimiento (core-web-vitals).
//
// legacy/ queda afuera: es el sitio viejo archivado y no tiene
// sentido corregirlo.
// ============================================================

const config = [
  {
    ignores: ['legacy/**', '.next/**', 'node_modules/**', 'scripts/**', 'out/**'],
  },
  ...next,
];

export default config;
