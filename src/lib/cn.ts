/**
 * Une clases de CSS ignorando lo que sea falso.
 * Reemplaza a la librería `clsx` con tres líneas.
 *
 *   cn('a', condicion && 'b', undefined) -> "a b"
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
