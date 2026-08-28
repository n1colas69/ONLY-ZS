// ============================================================
// COMPARTIR
// ------------------------------------------------------------
// No existe una "API de Instagram" para compartir desde la web:
// ni Instagram ni Facebook tienen un link tipo wa.me que abra el
// posteo con una foto puesta. Lo único que de verdad hace eso es
// el selector nativo del celular (Web Share API): ahí SÍ aparecen
// Instagram, WhatsApp, Facebook, Mensajes, etc., y si se comparte
// la FOTO (no solo el link), la app de destino la recibe con la
// imagen puesta, lista para postear en feed o historia.
//
// Por eso el orden de intentos es:
//   1. Compartir el archivo de la foto (navigator.share + files).
//      Es lo único que garantiza "se ve la imagen" en Instagram.
//   2. Si el navegador no puede compartir archivos, compartir el
//      link (navigator.share con url). Como el producto y la
//      colaboración ya tienen su og:image (src/lib/seo.ts), igual
//      se ve una vista previa con foto en WhatsApp/Facebook.
//   3. En escritorio, donde no hay selector nativo: copiar el link
//      al portapapeles para pegarlo donde haga falta.
//
// Para modificar:
// - qué se intenta primero:  el orden dentro de shareContent
// ============================================================

export interface ShareTarget {
  /** Por defecto, document.title. */
  title?: string;
  text?: string;
  /** Por defecto, la URL actual. */
  url?: string;
  /** URL absoluta de la foto a compartir como archivo, si el navegador lo permite. */
  imageUrl?: string;
}

export type ShareResult = 'shared' | 'copied' | 'unsupported';

function isAbort(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

/** Intenta compartir la FOTO como archivo. true = se manejó (compartida o cancelada). */
async function shareAsFile(title: string | undefined, text: string | undefined, imageUrl: string) {
  const nav = navigator as Navigator & {
    canShare?: (data: { files: File[] }) => boolean;
  };
  if (typeof nav.share !== 'function' || typeof nav.canShare !== 'function') return false;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return false;
    const blob = await response.blob();
    const filename = imageUrl.split('/').pop() || 'only-zs.jpg';
    const file = new File([blob], filename, { type: blob.type || 'image/jpeg' });

    if (!nav.canShare({ files: [file] })) return false;
    await nav.share({ title, text, files: [file] });
    return true;
  } catch (error) {
    // Cancelar el selector nativo no es un error: ya se "manejó".
    return isAbort(error);
  }
}

export async function shareContent(target: ShareTarget): Promise<ShareResult> {
  if (typeof navigator === 'undefined') return 'unsupported';

  const title = target.title ?? document.title;
  const text = target.text;
  const url = target.url ?? window.location.href;

  if (target.imageUrl && (await shareAsFile(title, text, target.imageUrl))) {
    return 'shared';
  }

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch (error) {
      if (isAbort(error)) return 'shared';
      // sigue al siguiente intento
    }
  }

  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(url);
      return 'copied';
    } catch {
      return 'unsupported';
    }
  }

  return 'unsupported';
}
