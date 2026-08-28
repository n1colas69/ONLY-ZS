'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { useHasHover } from '@/lib/useHasHover';

// ============================================================
// FOTO CON ZOOM
// ------------------------------------------------------------
// Usada en la galería de la ficha de producto. Dos formas de
// acercar, según el dispositivo:
//
// - Con mouse: un CLICK activa la lupa (no alcanza con pasar el
//   cursor, para no acercar sin querer mientras se recorre la
//   grilla). Una vez activa, mover el mouse la pasea por la foto.
//   Otro click la apaga.
// - En celular: un TOQUE SIMPLE activa el zoom en el punto tocado
//   (igual que el click de escritorio). Ya con el zoom activo,
//   arrastrar el dedo pasea la imagen y la sigue acercando según
//   cuánto se arrastra. Otro toque simple la apaga.
//
// El punto importante, que antes no estaba bien resuelto: mientras
// la foto NO tiene zoom, un arrastre es 100% del navegador. No se
// toca `touch-action` ni se llama `preventDefault`, así que el
// gesto le llega entero al carrusel de fotos (la tira que se
// desliza con scroll-snap en ProductGallery). Antes, en cambio, el
// primerísimo toque sobre la foto —aunque fuera el principio de un
// swipe para pasar a la siguiente— activaba el zoom Y ponía
// `touch-action: none` de inmediato, así que competía con el
// carrusel y a veces "se comía" el gesto de pasar de foto.
//
// Por eso el zoom en celular solo se activa recién en el TOQUE
// SIMPLE (en el `touchend`, si el dedo no se movió más que un
// pelo): mientras se está decidiendo si el gesto es un toque o un
// arrastre, no se interfiere con nada. Recién cuando el zoom YA
// está activo se bloquea el swipe (con touch-action: none), porque
// ahí sí el arrastre es para pasear la foto, no para cambiarla.
//
// El tamaño no se anima con React state en cada movimiento (sería
// un re-render por pixel); se escribe directo sobre el estilo de
// la imagen con una ref, que es instantáneo. El estado de React
// (`active`) solo existe para el cursor, no para el cálculo.
//
// Para modificar:
// - cuánto agranda en desktop:         DESKTOP_SCALE
// - rango de acercamiento en celular:  TOUCH_SCALE_MIN / MAX
// - qué tan lejos hay que arrastrar
//   (una vez activo el zoom) para
//   llegar al máximo:                  TOUCH_DRAG_RANGE
// ============================================================

const DESKTOP_SCALE = 2.2;
const TOUCH_SCALE_MIN = 1.8;
const TOUCH_SCALE_MAX = 3;
const TOUCH_DRAG_RANGE = 160; // px de arrastre para llegar a TOUCH_SCALE_MAX
const TAP_MOVE_THRESHOLD = 10; // px: por debajo de esto, es un toque, no un arrastre

interface ZoomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  /** true SOLO en la primerísima foto de la ficha: es la candidata a LCP. */
  fetchPriority?: 'high';
  className?: string;
}

export function ZoomImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  fetchPriority,
  className,
}: ZoomImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const engagedRef = useRef(false);
  const scaleRef = useRef(1);
  const touchRef = useRef<{ startX: number; startY: number; moved: boolean; baseScale: number } | null>(
    null
  );
  const [active, setActive] = useState(false);
  const hasHover = useHasHover();

  const setOrigin = (clientX: number, clientY: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    if (imgRef.current) imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  /** `instant` = sin transición: así el arrastre no le va "a la zaga" al dedo. */
  const setScale = (scale: number, instant = false) => {
    scaleRef.current = scale;
    const img = imgRef.current;
    if (!img) return;
    img.style.transitionDuration = instant ? '0ms' : '';
    img.style.transform = scale === 1 ? '' : `scale(${scale})`;
  };

  const deactivate = () => {
    engagedRef.current = false;
    touchRef.current = null;
    setScale(1);
    setActive(false);
    if (imgRef.current) imgRef.current.style.touchAction = '';
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${alt} — ${active ? 'alejar' : 'acercar'} la foto`}
      className={cn(
        'relative overflow-hidden bg-paper-dim',
        hasHover ? (active ? 'cursor-zoom-out' : 'cursor-zoom-in') : 'cursor-pointer',
        className
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
      // --- Desktop: click para activar, mover para pasear ---
      onClick={(event) => {
        if (!hasHover) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (!engagedRef.current) {
          engagedRef.current = true;
          setActive(true);
          setOrigin(event.clientX, event.clientY, rect);
          setScale(DESKTOP_SCALE);
        } else {
          deactivate();
        }
      }}
      // --- Teclado: Enter/Espacio activa o apaga el zoom, centrado
      //     en la foto (no hay posición de cursor ni de dedo que
      //     seguir). Es la misma acción que el click de escritorio,
      //     así que quien usa el teclado tiene el mismo control
      //     básico aunque no pueda "pasear" la lupa. */}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        const rect = event.currentTarget.getBoundingClientRect();
        if (!engagedRef.current) {
          engagedRef.current = true;
          setActive(true);
          setOrigin(rect.left + rect.width / 2, rect.top + rect.height / 2, rect);
          setScale(DESKTOP_SCALE);
        } else {
          deactivate();
        }
      }}
      onMouseMove={(event) => {
        if (!hasHover || !engagedRef.current) return;
        setOrigin(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
      }}
      onMouseLeave={() => {
        if (!hasHover) return;
        deactivate();
      }}
      // --- Celular: toque simple activa/apaga; con zoom activo, arrastrar pasea ---
      onTouchStart={(event) => {
        if (hasHover || event.touches.length > 1) return;
        const touch = event.touches[0];
        if (!touch) return;
        touchRef.current = {
          startX: touch.clientX,
          startY: touch.clientY,
          moved: false,
          baseScale: scaleRef.current,
        };

        // Si ya está acercada, este toque es para pasearla (o para
        // apagarla con un toque simple): recién ACÁ tiene sentido
        // bloquear el swipe, porque el arrastre que sigue es para la
        // lupa, no para cambiar de foto.
        //
        // Si NO está acercada, no se toca nada todavía: hasta que el
        // touchend confirme que fue un toque simple (sin arrastre),
        // el gesto es 100% del navegador, para no competir con el
        // carrusel.
        if (engagedRef.current && imgRef.current) {
          imgRef.current.style.touchAction = 'none';
        }
      }}
      onTouchMove={(event) => {
        if (hasHover || event.touches.length > 1) return;
        const state = touchRef.current;
        const touch = event.touches[0];
        if (!state || !touch) return;

        const dx = touch.clientX - state.startX;
        const dy = touch.clientY - state.startY;
        const dist = Math.hypot(dx, dy);
        if (dist > TAP_MOVE_THRESHOLD) state.moved = true;

        // Sin zoom activo, un arrastre es un intento de pasar de foto:
        // se deja entero para el carrusel, no se pasea ni se acerca.
        if (!engagedRef.current || !state.moved) return;

        const rect = event.currentTarget.getBoundingClientRect();
        setOrigin(touch.clientX, touch.clientY, rect);
        // Crece desde donde estaba al empezar este gesto: si ya
        // estaba acercada, seguir arrastrando la sigue llevando hacia
        // el máximo en vez de saltar para atrás.
        const progress = Math.min(dist / TOUCH_DRAG_RANGE, 1);
        setScale(state.baseScale + (TOUCH_SCALE_MAX - state.baseScale) * progress, true);
      }}
      onTouchEnd={(event) => {
        if (hasHover) return;
        const state = touchRef.current;
        touchRef.current = null;
        if (!state) return;

        if (engagedRef.current) {
          // Toque simple estando acercada: la apaga (y con eso vuelve
          // a soltarle el swipe al carrusel). Si hubo arrastre, se
          // deja como quedó paseada.
          if (!state.moved) deactivate();
          return;
        }

        // No estaba acercada al empezar este toque.
        if (state.moved) return; // fue un intento de pasar de foto: ya lo resolvió el navegador.

        // Toque simple sobre la foto en reposo: activa el zoom ahí mismo.
        engagedRef.current = true;
        const rect = event.currentTarget.getBoundingClientRect();
        setOrigin(state.startX, state.startY, rect);
        setScale(TOUCH_SCALE_MIN);
        setActive(true);
      }}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={fetchPriority}
        loading={priority ? undefined : 'lazy'}
        className="object-cover transition-transform duration-200 ease-out will-change-transform"
      />
    </div>
  );
}
