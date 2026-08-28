'use client';

import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { shareContent, type ShareTarget } from '@/lib/share';
import { toast } from '@/lib/store';

// ============================================================
// COMPARTIR
// ------------------------------------------------------------
// Botón genérico: comparte una foto y/o un link a redes sociales.
// La lógica de qué intentar primero vive en src/lib/share.ts.
//
// Para modificar: qué se comparte, en cada lugar donde se usa
// (los props title/text/url/imageUrl).
// ============================================================

interface ShareButtonProps extends ShareTarget {
  className?: string;
  /** Por defecto "Compartir". Sé más específico si hace falta ("Compartir esta foto"). */
  label?: string;
  size?: number;
}

export function ShareButton({ className, label = 'Compartir', size = 18, ...target }: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={async () => {
        const result = await shareContent(target);
        if (result === 'copied') toast('Enlace copiado al portapapeles');
        if (result === 'unsupported') toast('No se pudo compartir desde este navegador');
      }}
      aria-label={label}
      className={cn('grid place-items-center', className)}
    >
      <Icon name="share" size={size} />
    </button>
  );
}
