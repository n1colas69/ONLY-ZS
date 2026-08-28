import { describe, expect, it } from 'vitest';
import { site } from '@/data/site';
import { buildOrderMessage, buildProductMessage, whatsappUrl } from '@/lib/whatsapp';
import type { CheckoutDetails, ResolvedCartLine } from '@/types';

// ============================================================
// TESTS DEL MENSAJE DE WHATSAPP
// ------------------------------------------------------------
// Es la parte más importante del sitio: no hay pago online, el
// pedido ES este mensaje. Si algo acá se rompe, llegan pedidos
// incompletos y no hay forma de darse cuenta.
//
// Si cambiás el formato del mensaje a propósito, actualizá estos
// tests para que reflejen el nuevo formato.
// ============================================================

const line = (
  slug: string,
  name: string,
  price: number,
  size: string | null = 'L'
): ResolvedCartLine => ({
  product: {
    slug,
    name,
    brand: 'Carhartt',
    category: 'abrigos',
    price,
    status: 'available',
    isNew: false,
    size,
    image: null,
    tags: [],
  },
  qty: 1,
  lineTotal: price,
});

const details: CheckoutDetails = {
  name: 'Juan Pérez',
  phone: '3804111222',
  province: 'La Rioja',
  city: 'Chilecito',
  zip: '5360',
  address: 'San Martín 123',
  delivery: 'Envío a domicilio',
  payment: 'Transferencia',
  notes: '',
};

describe('mensaje del pedido', () => {
  const lines = [line('campera-carhartt', 'Campera Carhartt', 50000)];
  const message = buildOrderMessage(lines, details, 50000);

  it('incluye el nombre de cada pieza', () => {
    expect(message).toContain('Campera Carhartt');
  });

  it('incluye el talle', () => {
    expect(message).toContain('Talle L');
  });

  it('incluye el link a la pieza, para que ONLY ZS sepa cuál es', () => {
    expect(message).toContain(`${site.url}/producto/campera-carhartt`);
  });

  it('incluye el total', () => {
    expect(message).toMatch(/Total:.*50\.000/);
  });

  it('incluye TODOS los datos de entrega', () => {
    for (const value of ['Juan Pérez', '3804111222', 'La Rioja', 'Chilecito', '5360', 'San Martín 123', 'Envío a domicilio', 'Transferencia']) {
      expect(message).toContain(value);
    }
  });

  it('cuando no hay notas, lo dice en vez de dejarlo en blanco', () => {
    expect(message).toContain('Notas: Sin notas');
  });

  it('lista varias piezas', () => {
    const many = buildOrderMessage(
      [
        line('campera-carhartt', 'Campera Carhartt', 50000),
        line('sueter-levis', "Suéter Levi's", 30000, 'XL'),
      ],
      details,
      80000
    );
    expect(many).toContain('Campera Carhartt');
    expect(many).toContain("Suéter Levi's");
    expect(many).toMatch(/Total:.*80\.000/);
  });

  it('una pieza sin talle no imprime "Talle undefined"', () => {
    const message = buildOrderMessage([line('reloj-casio', 'Reloj Casio', 20000, null)], details, 20000);
    expect(message).not.toContain('undefined');
    expect(message).not.toContain('Talle ,');
  });
});

describe('consulta sobre una pieza', () => {
  it('nombra la pieza, el precio, el talle y el link', () => {
    const message = buildProductMessage({
      slug: 'campera-carhartt',
      name: 'Campera Carhartt',
      price: 50000,
      size: 'L',
    });
    expect(message).toContain('Campera Carhartt');
    expect(message).toContain('50.000');
    expect(message).toContain('Talle: L');
    expect(message).toContain('/producto/campera-carhartt');
  });

  it('una pieza sin precio no muestra un precio vacío', () => {
    const message = buildProductMessage({
      slug: 'sueter-missoni',
      name: 'Suéter Missoni',
      price: null,
      size: 'XL',
    });
    expect(message).not.toContain('$');
    expect(message).toContain('Suéter Missoni');
  });
});

describe('link de WhatsApp', () => {
  it('apunta al número de ONLY ZS con código de país', () => {
    expect(whatsappUrl('hola')).toBe(`https://wa.me/${site.whatsapp}?text=hola`);
    // Argentina (54) + celular (9) + La Rioja (380)
    expect(site.whatsapp).toMatch(/^549380/);
  });

  it('codifica el mensaje para que no se corte', () => {
    const url = whatsappUrl('Hola ONLY ZS!\nQuiero esto: 50% off & más');
    expect(url).not.toContain('\n');
    expect(url).not.toContain(' ');
    expect(decodeURIComponent(url.split('text=')[1] ?? '')).toContain('50% off & más');
  });
});
