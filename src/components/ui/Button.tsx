import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

// ============================================================
// BOTÓN
// ------------------------------------------------------------
// Tres variantes y nada más. Rectangulares, sin sombra, sin
// gradiente, sin radio: es la decisión estética del sitio.
//
// Para modificar:
// - colores y tamaños:  el objeto VARIANTS / SIZES
// - agregar variante:   sumá una entrada a VARIANTS
//
// Todos los botones tienen un área táctil de al menos 44px de
// alto en celular. No lo bajes: es el mínimo para que se pueda
// tocar cómodo.
// ============================================================

type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'sm' | 'md';

const BASE =
  'inline-flex items-center justify-center gap-2 font-sans uppercase tracking-[0.14em] ' +
  'text-[0.6875rem] font-medium transition-colors duration-200 ' +
  'disabled:pointer-events-none disabled:opacity-40';

const VARIANTS: Record<Variant, string> = {
  solid: 'bg-ink text-paper hover:bg-ash',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:text-ash',
};

const SIZES: Record<Size, string> = {
  sm: 'min-h-9 px-3',
  md: 'min-h-11 px-5',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & Omit<ComponentProps<'button'>, keyof CommonProps>;

export function Button({
  variant = 'solid',
  size = 'md',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = CommonProps & Omit<ComponentProps<typeof Link>, keyof CommonProps>;

/** Mismo aspecto que Button, pero navega. Usalo cuando lleva a otra página. */
export function ButtonLink({
  variant = 'solid',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </Link>
  );
}

type ExternalProps = CommonProps & Omit<ComponentProps<'a'>, keyof CommonProps>;

/** Para links que salen del sitio (WhatsApp, Instagram, YouTube). */
export function ButtonExternal({
  variant = 'solid',
  size = 'md',
  className,
  children,
  ...props
}: ExternalProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
