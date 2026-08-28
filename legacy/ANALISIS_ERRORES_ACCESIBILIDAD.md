# 🔴 ANÁLISIS DE ERRORES Y ACCESIBILIDAD - ONLY ZS

## 📋 RESUMEN EJECUTIVO
Se encontraron **15 errores críticos** que afectan la funcionalidad e impiden el acceso inclusivo a la página web.

---

## 🔴 ERRORES CRÍTICOS DE FUNCIONALIDAD

### 1. ⚠️ PRECIO INVÁLIDO EN DATOS (data.js)
**Ubicación:** [js/data.js](js/data.js#L24)  
**Problema:** El producto ID 2 (Pasamontañas Real Tree) tiene `price: false` en lugar de un número o null.
```javascript
{
    id: 2,
    price: false,  // ❌ ERROR: Causa fallos en formatMoney() y cálculos
    // ...
}
```
**Impacto:** 
- `formatMoney(false)` falla
- El carrito no calcula precios correctamente
- Error en consola JavaScript

**Solución:**
```javascript
price: 0,  // o null para productos agotados
```

---

### 2. ⚠️ SCRIPT DE NODE.JS EN CLIENTE (replace_prices.js)
**Ubicación:** [replace_prices.js](replace_prices.js)  
**Problema:** Este archivo es código de Node.js (`require`, `fs`) pero está en el directorio raíz como si fuera para cliente.

```javascript
const fs = require('fs');  // ❌ No funciona en navegador
```

**Impacto:**
- Error: "require is not defined"
- Script no se ejecuta
- Cambios de precios no se aplican

**Solución:** 
- Mover a `/build` o `/scripts`
- O ejecutar en build-time, no en runtime

---

### 3. ⚠️ FALTA META DESCRIPTION (index.html, gallery.html, brand.html)
**Ubicación:** Head de todos los HTML  
**Problema:** No hay `<meta name="description">` (máximo 160 caracteres)

```html
<!-- ❌ FALTA -->
<meta name="description" content="...">
```

**Impacto:**
- SEO pobre (motores de búsqueda no indexan bien)
- Redes sociales no muestran resumen

**Solución:** Agregar en cada HTML:
```html
<meta name="description" content="ONLY ZS | Tienda de vintage y second hand seleccionado a mano. Ropa única de marcas como Nautica, Carhartt, Ralph Lauren.">
<meta name="og:description" content="...">
<meta name="twitter:description" content="...">
```

---

### 4. ⚠️ FALTA CONFIGURACIÓN DE PWA (manifest.json)
**Ubicación:** [manifest.json](manifest.json)  
**Problema:** El archivo está referenciado pero no se puede leer (`<link rel="manifest">`)

**Impacto:**
- Service Worker no funciona completamente
- PWA no instalable en móviles
- Modo offline limitado

**Solución:** Crear manifest.json con:
```json
{
  "name": "ONLY ZS",
  "short_name": "ONLY ZS",
  "icons": [{ "src": "assets/images/ONLY-ZS-LOGO.png", "sizes": "any", "type": "image/png" }],
  "theme_color": "#0D0D0D",
  "background_color": "#FAFAFA"
}
```

---

### 5. ⚠️ SERVICE WORKER CON ERRORES POTENCIALES (sw.js)
**Ubicación:** [sw.js](sw.js)  
**Problema:** No se puede leer el archivo para análisis

**Solución:** Verificar que:
- Cache versioning esté correcto
- Estrategia de fallback para imágenes 404

---

## 🔴 ERRORES DE ACCESIBILIDAD

### 6. ❌ BAJO CONTRASTE EN NIGHT MODE (styles.css)
**Ubicación:** [css/styles.css](css/styles.css#L43)  
**Problema:** En modo nocturno, algunos textos tienen bajo contraste

```css
body.night-mode {
    --color-gray: #BFB6A1;  /* ⚠️ Bajo contraste con fondo #0D0D0D */
    --color-accent: #0D0D0D; /* ⚠️ Invisible con fondo igual */
}
```

**WCAG 2.1 Requiere:** Ratio de contraste mínimo 4.5:1  
**Impacto:** Usuarios con baja visión NO pueden leer el contenido

**Solución:** Aumentar contraste:
```css
body.night-mode {
    --color-gray: #D4CFC0;      /* Más claro */
    --color-accent: #E8D9C3;    /* Más contraste */
}
```

---

### 7. ❌ INPUTS SIN LABELS ASOCIADOS (index.html)
**Ubicación:** Checkout modal  
**Problema:** Labels existen pero algunos inputs no tienen `for` attribute vinculado

```html
<label>
    Nombre y apellido
    <input type="text" id="checkoutName">  <!-- ⚠️ Bien -->
</label>
<label>
    Teléfono / WhatsApp
    <input type="tel" id="checkoutPhone">  <!-- ⚠️ Bien -->
</label>
<!-- Pero falta en algunos casos -->
```

**Impacto:** Lectores de pantalla NO asocian labels con inputs

**Solución:**
```html
<label for="checkoutName">Nombre y apellido</label>
<input type="text" id="checkoutName">
```

---

### 8. ❌ IMÁGENES SIN TEXTO ALTERNATIVO DESCRIPTIVO
**Ubicación:** Múltiples ubicaciones  
**Problema:** Algunas imágenes tienen `alt=""` genérico o vacío

```html
<!-- ❌ MALO -->
<img src="hero.jpg" alt="">
<img src="product.jpg" alt="Producto">  <!-- Muy genérico -->

<!-- ✅ BIEN -->
<img src="product.jpg" alt="Jean Dickies Carpintero - Talle 36 - Precio $45000">
```

**Impacto:** Ciegos y usuarios sin imágenes NO entienden contenido

---

### 9. ❌ FALTA ATRIBUTO `lang` EN PÁGINAS (gallery.html, brand.html)
**Ubicación:** `<html>` tags  
**Problema:** Aunque tienen `lang="es"`, falta atributo `xml:lang`

```html
<!-- Debería ser -->
<html lang="es" xml:lang="es">
```

**Impacto:** Lectores de pantalla no saben qué idioma usar

---

### 10. ❌ NAVEGACIÓN POR TECLADO LIMITADA
**Ubicación:** Modales (product modal, checkout)  
**Problema:** No hay manejo de tecla `Escape` consistente + navegación tab incompleta

```javascript
// ✅ EXISTE en app.js pero...
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { /* ... */ }
});

// ❌ FALTA: Order de tab incorrecto en modales
// ❌ FALTA: Focus trap en modales
```

**Impacto:** Usuarios con teclado ATRAPADOS en diálogos

**Solución:** Implementar focus trap:
```javascript
function createFocusTrap(modalElement) {
    const focusableElements = modalElement.querySelectorAll('[tabindex], button, input, [href]');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modalElement.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    });
}
```

---

### 11. ❌ ICONOS DECORATIVOS SIN `aria-hidden` (index.html)
**Ubicación:** Iconos de Font Awesome  
**Problema:** Iconos decorativos no tienen `aria-hidden="true"`

```html
<!-- ❌ MALO -->
<i class="fas fa-chevron-down"></i>

<!-- ✅ BIEN -->
<i class="fas fa-chevron-down" aria-hidden="true"></i>
```

**Impacto:** Lectores de pantalla leen "chevron down" innecesariamente

---

### 12. ❌ FALTA "SKIP TO CONTENT" LINK
**Ubicación:** Inicio de `<body>` en index.html  
**Problema:** No hay link para saltar navegación

```html
<!-- ❌ FALTA -->
<!-- Debería estar después de <body> -->
<a href="#main-content" class="skip-link">Saltar a contenido principal</a>
```

**Impacto:** Usuarios de teclado y lector de pantalla deben tabular mucho

**Solución:**
```html
<!-- Agregar al inicio de body -->
<a href="#products" class="skip-link" style="position:absolute;top:-40px;left:0;background:#000;color:#fff;padding:8px;z-index:100;">Saltar a contenido principal</a>

<!-- En CSS -->
<style>
.skip-link:focus {
    top: 0;
}
</style>
```

---

### 13. ❌ ATRIBUTO `aria-modal` INCOMPLETO
**Ubicación:** Modales en index.html  
**Problema:** Algunos modales NO tienen `role="dialog" aria-modal="true"`

```html
<!-- ❌ Producto Modal - FALTA -->
<div class="modal-overlay" id="productModalOverlay">
    <!-- FALTA: role="dialog" aria-modal="true" -->
</div>

<!-- ✅ Checkout - BIEN -->
<div class="modal-overlay" id="checkoutModalOverlay">
    <div class="modal-box checkout-modal" role="dialog" aria-modal="true">
```

**Impacto:** Lectores de pantalla NO saben que es un diálogo modal

---

### 14. ❌ BOTONES SIN TEXTO VISIBLE (Múltiples)
**Ubicación:** UI buttons  
**Problema:** Botones con solo iconos sin `aria-label`

```html
<!-- ❌ MALO -->
<button id="searchBtn"><i class="fas fa-search"></i></button>

<!-- ✅ BIEN - Algunos ya lo tienen -->
<button id="searchBtn" aria-label="Buscar"><i class="fas fa-search"></i></button>
```

**Impacto:** Lectores de pantalla NO saben qué hace el botón

---

### 15. ⚠️ FORMULARIO SIN VALIDACIÓN ACCESIBLE (checkout)
**Ubicación:** [index.html](index.html#L450) - checkoutForm  
**Problema:** No hay `aria-invalid` ni `aria-describedby` para errores

```html
<!-- ❌ FALTA -->
<input type="text" id="checkoutName" 
       aria-invalid="true" 
       aria-describedby="checkoutName-error">
<span id="checkoutName-error" role="alert">Campo requerido</span>
```

**Impacto:** Usuarios ciegos NO saben qué campos tienen error

---

### 16. ⚠️ CAROUSEL/GALLERY SIN ROLES (gallery.html)
**Ubicación:** Galerías de imágenes  
**Problema:** Falta `role="region"` y `aria-label` en galerías

```html
<!-- ❌ FALTA -->
<div class="gallery-grid" id="galleryGrid">

<!-- ✅ DEBERÍA SER -->
<div class="gallery-grid" id="galleryGrid" role="region" aria-label="Galería de fotos">
```

**Impacto:** No es claro que es una galería para lectores de pantalla

---

## 📊 TABLA DE PRIORIDADES

| # | Problema | Severidad | Tipo | Impacto |
|---|----------|-----------|------|---------|
| 1 | `price: false` en datos | 🔴 CRÍTICA | Funcionalidad | Carrito no funciona |
| 2 | Script Node.js en cliente | 🔴 CRÍTICA | Funcionalidad | Cambios de precio fallan |
| 6 | Contraste night-mode | 🟠 ALTA | Accesibilidad | WCAG 2.1 AA incumplido |
| 10 | Focus trap modal | 🟠 ALTA | Accesibilidad | Usuarios atrapados |
| 12 | Falta "Skip link" | 🟠 ALTA | Accesibilidad | WCAG 2.1 AA incumplido |
| 3 | Sin meta description | 🟡 MEDIA | SEO | No indexa bien |
| 7 | Labels sin `for` | 🟡 MEDIA | Accesibilidad | WCAG 2.1 A incumplido |
| 11 | Iconos sin `aria-hidden` | 🟡 MEDIA | Accesibilidad | Ruido en lector |
| 13 | Modales sin role | 🟡 MEDIA | Accesibilidad | WCAG incumplido |
| 15 | Sin validación accesible | 🟡 MEDIA | Accesibilidad | WCAG incumplido |

---

## ✅ LO QUE SÍ ESTÁ BIEN

- ✓ HTML semántico adecuado (nav, main, footer)
- ✓ Múltiples `aria-label` bien implementados
- ✓ Service Worker registrado
- ✓ Responsive design correcto
- ✓ Preload de imágenes críticas
- ✓ Algunos modales con roles correctos

---

## 🔧 RECOMENDACIONES INMEDIATAS

1. **Corregir `price: false`** → Cambiar a `0` o `null`
2. **Mover `replace_prices.js`** → Crear carpeta `/scripts` o `/build`
3. **Aumentar contraste night-mode** → Ratio 4.5:1 mínimo
4. **Implementar focus trap** → En todos los modales
5. **Agregar skip link** → Al inicio del `<body>`
6. **Agregar meta descriptions** → En todos los HTML
7. **Revisar con Lighthouse** → Ejecutar Chrome DevTools Lighthouse

---

## 🧪 HERRAMIENTAS PARA PROBAR

```bash
# Validar HTML
https://validator.w3.org/

# Revisar accesibilidad
https://www.webaim.org/articles/screenreader_testing/

# Lighthouse
chrome://inspect -> Lighthouse

# Validador de contraste
https://webaim.org/resources/contrastchecker/

# Lector de pantalla (gratis)
# NVDA: https://www.nvaccess.org/
# JAWS: https://www.freedomscientific.com/products/software/jaws/
```

---

## 📝 CHECKLIST WCAG 2.1 AA

- [ ] Contraste 4.5:1 para texto normal
- [ ] Contraste 3:1 para componentes grandes
- [ ] Teclado accesible (Tab, Enter, Escape)
- [ ] Focus visible en todos los elementos
- [ ] Etiquetas descriptivas en inputs
- [ ] Roles y propiedades ARIA correctas
- [ ] Imágenes con alt descriptivos
- [ ] Errores de formulario identificables
- [ ] Skip to content link
- [ ] Funcionalidad sin ratón

