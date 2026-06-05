# 🔧 SOLUCIONES APLICABLES - ONLY ZS

## 1️⃣ CORREGIR `price: false` EN data.js

**Archivo:** [js/data.js](js/data.js#L24)

### Cambio:
```javascript
// ❌ ANTES
{
    id: 2,
    name: "Pasamontañas Real Tree",
    category: "Accesorios",
    price: false,      // ← ERROR
    originalPrice: null,
    // ...
}

// ✅ DESPUÉS
{
    id: 2,
    name: "Pasamontañas Real Tree",
    category: "Accesorios",
    price: 0,          // ← CORREGIDO (producto agotado)
    originalPrice: null,
    // ...
}
```

**Por qué:** `formatMoney(false)` causa error. Usar `0` indica producto sin precio (agotado).

---

## 2️⃣ AGREGAR SKIP TO CONTENT LINK

**Archivo:** [index.html](index.html#L1)

### Agregar después de `<body>`:

```html
<body>
    <!-- ✅ AGREGAR ESTO AL INICIO -->
    <a href="#products" class="skip-to-main" style="position:absolute;top:-50px;left:0;background:#000;color:#fff;padding:8px 12px;border-radius:0 0 4px 0;text-decoration:none;z-index:10000;font-size:0.9rem;">
        Saltar a contenido principal
    </a>
    
    <!-- Resto del contenido -->
    <div id="toast-container"></div>
```

### Agregar en CSS (styles.css):

```css
/* Skip to main link */
.skip-to-main:focus {
    top: 0;
    transition: top 0.3s;
}

.skip-to-main:focus:after {
    content: " (presione Enter)";
}
```

---

## 3️⃣ AUMENTAR CONTRASTE EN NIGHT-MODE

**Archivo:** [css/styles.css](css/styles.css#L43)

### Cambio:

```css
/* ❌ ANTES - Bajo contraste */
body.night-mode {
    --color-bg: #0D0D0D;
    --color-dark: var(--color-accent);
    --color-white: #0D0D0D;
    --color-accent: #0D0D0D;
    --color-gray: #BFB6A1;
    --color-text: var(--color-accent);
}

/* ✅ DESPUÉS - Contraste mejorado */
body.night-mode {
    --color-bg: #0D0D0D;
    --color-dark: #E8D9C3;              /* Más claro */
    --color-white: #0D0D0D;
    --color-accent: #E8D9C3;            /* Más contraste */
    --color-accent-dark: #D4CFC0;
    --color-gray: #D4CFC0;              /* Más claro */
    --color-text: #E8D9C3;              /* Más claro */
}
```

**Verificar:** Ratio de contraste → https://webaim.org/resources/contrastchecker/

---

## 4️⃣ IMPLEMENTAR FOCUS TRAP EN MODALES

**Archivo:** [js/components/modals.js](js/components/modals.js)

### Agregar función:

```javascript
// ✅ AGREGAR ESTA FUNCIÓN
function createFocusTrap(modalElement) {
    if (!modalElement) return;
    
    const focusableElements = modalElement.querySelectorAll(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modalElement.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// ✅ MODIFICAR openProductModal()
function openProductModal(productId) {
    currentProductModal = productId;
    const product = productsData.find(p => p.id === productId);
    if (product && product.isComingSoon) {
        showToast('Producto no disponible');
        return;
    }
    currentProductPhoto = 0;
    updateProductModal();
    document.body.classList.add('no-scroll');
    const overlay = document.getElementById('productModalOverlay');
    overlay.classList.add('active');
    
    // ✅ AGREGAR ESTO
    createFocusTrap(overlay);
    overlay.querySelector('button')?.focus();
}
```

### Agregar en HTML de modales:

```html
<!-- ✅ AGREGAR ATRIBUTOS -->
<!-- Producto Modal -->
<div class="modal-overlay" id="productModalOverlay" role="dialog" aria-modal="true" aria-labelledby="productModalName">
    <!-- ... -->
</div>

<!-- Checkout Modal -->
<div class="modal-overlay" id="checkoutModalOverlay">
    <div class="modal-box checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkoutModalTitle">
        <!-- ... -->
    </div>
</div>
```

---

## 5️⃣ AGREGAR META DESCRIPTIONS

**Archivo:** [index.html](index.html#L1) (y gallery.html, brand.html)

### Agregar en `<head>`:

```html
<!-- ✅ AGREGAR DESPUÉS DE <title> -->

<!-- index.html -->
<meta name="description" content="ONLY ZS | Tienda de vintage y second hand seleccionado a mano. Prendas únicas de marcas como Nautica, Carhartt, Ralph Lauren. Envío a todo el país.">
<meta name="keywords" content="vintage, second hand, ropa vintage, streetwear, Nautica, Carhartt">
<meta property="og:title" content="ONLY ZS | Vintage & Second Hand">
<meta property="og:description" content="Tienda de vintage y second hand de primer nivel. Prendas únicas seleccionadas a mano.">
<meta property="og:image" content="assets/images/ONLY-ZS-LOGO.png">
<meta property="og:url" content="https://only-zonasur.com">
<meta name="twitter:card" content="summary_large_image">

<!-- gallery.html -->
<meta name="description" content="Galería ZS | Fotos de la comunidad ONLY ZS. Looks reales de nuestros clientes usando prendas vintage y second hand.">

<!-- brand.html -->
<meta name="description" content="Colaboraciones ONLY ZS | Marcas con calle. Proyectos que comparten la mirada de cultura under, skate y fotografía.">
```

---

## 6️⃣ AGREGAR ARIA-HIDDEN A ICONOS DECORATIVOS

**Archivos:** Múltiples HTML

### Búsqueda y reemplazo sistemático:

```javascript
// ✅ Script para buscar y marcar iconos decorativos
// Ejecutar en consola del navegador:

document.querySelectorAll('.fas, .far, .fab').forEach(icon => {
    // Solo si el padre es botón sin texto visible
    if (icon.parentElement.tagName === 'BUTTON' && icon.parentElement.innerText.trim() === '') {
        icon.setAttribute('aria-hidden', 'true');
    }
});
```

### Ejemplo manual:

```html
<!-- ❌ ANTES -->
<button id="searchBtn"><i class="fas fa-search"></i></button>

<!-- ✅ DESPUÉS -->
<button id="searchBtn" aria-label="Buscar"><i class="fas fa-search" aria-hidden="true"></i></button>
```

---

## 7️⃣ MEJORAR VALIDACIÓN DE FORMULARIO ACCESIBLE

**Archivo:** [js/components/cart.js](js/components/cart.js) (agregar función de checkout)

### Agregar función:

```javascript
// ✅ AGREGAR EN checkout SECTION
function validateCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    const errorContainer = document.getElementById('checkoutError');
    
    const requiredFields = [
        'checkoutName',
        'checkoutPhone',
        'checkoutProvince',
        'checkoutCity',
        'checkoutAddress',
        'checkoutZip',
        'checkoutDelivery',
        'checkoutPayment'
    ];
    
    const errors = [];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        if (!field.value.trim()) {
            errors.push(field.previousElementSibling?.innerText || fieldId);
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', `${fieldId}-error`);
        } else {
            field.setAttribute('aria-invalid', 'false');
            field.removeAttribute('aria-describedby');
        }
    });
    
    if (errors.length > 0) {
        errorContainer.innerText = `Error: ${errors.join(', ')} son requeridos`;
        errorContainer.setAttribute('role', 'alert');
        return false;
    }
    
    errorContainer.innerText = '';
    return true;
}

// ✅ Modificar evento submit
document.getElementById('checkoutForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateCheckoutForm()) {
        document.getElementById('checkoutError').focus();
        return;
    }
    
    // Continuar con envío...
});
```

### Mejorar HTML del formulario:

```html
<!-- ✅ MEJORADO -->
<form id="checkoutForm" novalidate aria-label="Formulario de checkout">
    <div class="form-group">
        <label for="checkoutName">
            Nombre y apellido <span aria-label="requerido">*</span>
        </label>
        <input 
            type="text" 
            id="checkoutName" 
            name="name"
            required
            aria-required="true"
            aria-invalid="false"
            autocomplete="name"
        >
        <span id="checkoutName-error" role="alert" class="error-message" style="display:none;"></span>
    </div>
    
    <!-- Similares para otros campos -->
    
    <div role="alert" id="checkoutError" aria-live="polite" class="error-summary"></div>
    
    <button type="submit" class="checkout-submit">
        ENVIAR PEDIDO POR WHATSAPP <i class="fab fa-whatsapp" aria-hidden="true"></i>
    </button>
</form>
```

### Estilos para errores:

```css
.error-message {
    color: var(--color-danger);
    font-size: 0.85rem;
    margin-top: 4px;
    display: block;
}

input[aria-invalid="true"] {
    border-color: var(--color-danger);
    background-color: rgba(192, 57, 43, 0.05);
}

.error-summary {
    background: rgba(192, 57, 43, 0.1);
    color: var(--color-danger);
    padding: 12px;
    border-radius: var(--radius);
    margin-bottom: 16px;
    display: none;
}

.error-summary:not(:empty) {
    display: block;
}
```

---

## 8️⃣ AGREGAR ROLES A GALERÍAS

**Archivos:** [gallery.html](gallery.html), [index.html](index.html) (sección galería)

### Cambios en HTML:

```html
<!-- ❌ ANTES -->
<div class="gallery-grid" id="galleryGrid"></div>

<!-- ✅ DESPUÉS -->
<div class="gallery-grid" 
     id="galleryGrid" 
     role="region" 
     aria-label="Galería de fotos de la comunidad"
     aria-live="polite">
</div>

<!-- Similares para galleries de productos -->
<div class="products-grid" 
     id="productsGrid" 
     role="region" 
     aria-label="Catálogo de productos"
     aria-live="polite">
</div>
```

---

## 9️⃣ CREAR manifest.json CORRECTO

**Archivo:** [manifest.json](manifest.json)

### Contenido:

```json
{
  "name": "ONLY ZS - Tienda de Vintage",
  "short_name": "ONLY ZS",
  "description": "Tienda de vintage y second hand seleccionado a mano",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#0D0D0D",
  "background_color": "#FAFAFA",
  "icons": [
    {
      "src": "assets/images/ONLY-ZS-LOGO.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "assets/images/ONLY-ZS-LOGO.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "assets/images/ONLY-ZS-LOGO.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "categories": ["shopping"],
  "screenshots": [
    {
      "src": "assets/images/optimized/sm/assets/images/HERO-ZS.jpg",
      "sizes": "540x720",
      "type": "image/jpeg",
      "form_factor": "narrow"
    }
  ]
}
```

---

## 🔟 CREAR ARCHIVO lang="es" EN brand.html

**Archivo:** [brand.html](brand.html#L1)

### Cambio:

```html
<!-- ❌ ANTES -->
<html lang="es">

<!-- ✅ DESPUÉS -->
<html lang="es" xml:lang="es">
```

---

## CHECKLIST DE APLICACIÓN

```
[ ] 1. Corregir price: false → 0 en data.js
[ ] 2. Agregar skip-to-main link en index.html
[ ] 3. Aumentar contraste night-mode en styles.css
[ ] 4. Implementar focus trap en modales.js
[ ] 5. Agregar meta descriptions en todos los HTML
[ ] 6. Agregar aria-hidden a iconos
[ ] 7. Mejorar validación accesible del checkout
[ ] 8. Agregar roles a galerías
[ ] 9. Crear manifest.json correcto
[ ] 10. Agregar xml:lang en HTML
[ ] 11. Revisar con Lighthouse (Chrome DevTools)
[ ] 12. Probar con lector de pantalla (NVDA o JAWS)
```

---

## 🧪 TESTING TOOLS

```bash
# 1. Lighthouse (Chrome DevTools)
F12 → Lighthouse → Audit

# 2. axe DevTools
# https://www.deque.com/axe/devtools/

# 3. WAVE
# https://wave.webaim.org/

# 4. Screen Reader Testing
# NVDA: https://www.nvaccess.org/
# JAWS: https://www.freedomscientific.com/ (pago)

# 5. Keyboard Navigation
# Tab, Shift+Tab, Enter, Escape, Arrow Keys
```

