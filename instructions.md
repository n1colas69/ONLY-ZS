# ONLY ZS - Instrucciones de Actualización

## 📋 Tabla de Contenidos
1. [Configuración General](#configuración-general)
2. [Actualizar Catálogo de Productos](#actualizar-catálogo-de-productos)
3. [Gestionar Imágenes](#gestionar-imágenes)
4. [Administrar Colaboraciones](#administrar-colaboraciones)
5. [Información de Contacto](#información-de-contacto)

---

## ⚙️ Configuración General

### WhatsApp
- **Ubicación:** `config.js`
- **Variable:** `WHATSAPP_NUMBER`
- **Formato:** Usar número sin país (ej: `3804176824`)
- **Uso automático:** Se usa en enlaces wa.me en todo el sitio

### Estructura de Archivos
```
ONLY-ZS-v3/
├── index.html          (Página principal)
├── gallery.html        (Galería de comunidad)
├── brand.html          (Detalle de colaboración)
├── css/
│   └── styles.css      (Estilos globales)
├── js/
│   ├── config.js       (Configuración global)
│   ├── data.js         (Datos de productos y colaboraciones)
│   ├── utils.js        (Utilidades)
│   ├── app.js          (Lógica principal)
│   ├── ui.js           (Interacciones UI)
│   ├── scroll.js       (Efectos de scroll)
│   └── components/     (Módulos específicos)
│       ├── products.js (Gestión de productos)
│       ├── cart.js     (Carrito)
│       ├── wishlist.js (Lista de deseos)
│       ├── modals.js   (Modales)
│       └── gallery.js  (Gestión de galería)
├── docs/
│   ├── instructions.md (Este manual)
│   ├── STRUCTURE.md    (Documentación de arquitectura)
│   └── README.txt      (Notas y pendientes)
├── assets/
│   └── images/
│       ├── optimized/
│       │   ├── lg/     (Imágenes desktop - Máximo 1200px)
│       │   └── sm/     (Imágenes mobile - Máximo 600px)
│       └── Productos/
│           ├── Remeras y Chombas/
│           ├── Camisas/
│           ├── Pantalones/
│           ├── Abrigos/
│           ├── Accesorios/
│           ├── Galeria ZS/
│           └── Productos Nuevos/
```

---

## 📦 Actualizar Catálogo de Productos

### 1. Agregar un Nuevo Producto

**Paso 1: Preparar las imágenes**
- Crear una carpeta para la categoría en `assets/images/Productos/`
- Guardar al menos 3-4 imágenes del producto
- Dimensiones recomendadas:
  - **Imagen principal:** 800x1000px (proporción 4:5)
  - **Galerías:** Variar entre 800x1000px y 1000x800px
  - **Formato:** JPG optimizado (máximo 150KB por imagen)

**Paso 2: Crear imágenes optimizadas**
- Copiar las imágenes a dos carpetas optimizadas:
  - `assets/images/optimized/lg/assets/images/Productos/` (1200px de ancho máximo)
  - `assets/images/optimized/sm/assets/images/Productos/` (600px de ancho máximo)

**Paso 3: Agregar datos en data.js**

Encontrar el array `productsData` y agregar un nuevo objeto:

```javascript
{
    id: 7,                          // ID único (incrementar del último)
    name: "Nombre del Producto",   // Nombre que aparece en tienda
    category: "Remeras",           // Categoría: Remeras, Camisas, Pantalones, etc.
    price: 35000,                  // Precio en pesos
    originalPrice: null,           // Si hay descuento, poner precio original. Si no, null
    badge: null,                   // Ej: "NUEVO", "OFERTA", o null
    image: "assets/images/Productos/Categoria/NOMBRE-IMAGEN-1.jpg",
    images: [
        "assets/images/Productos/Categoria/NOMBRE-IMAGEN-1.jpg",
        "assets/images/Productos/Categoria/NOMBRE-IMAGEN-2.jpg",
        "assets/images/Productos/Categoria/NOMBRE-IMAGEN-3.jpg"
    ],
    description: "Descripción detallada del producto incluyendo:\nMateriales, talle, medidas, estado.\nUsa \\n para saltos de línea.",
    isNew: false,                  // true si es nuevo producto
    inStock: true                  // true si está disponible, false si está agotado
}
```

### 2. Editar un Producto Existente

- Encontrar el producto en `data.js` por su `id`
- Modificar los campos necesarios:
  - **Para cambiar precio:** Actualizar `price`
  - **Para aplicar descuento:** Agregar `originalPrice` con el precio anterior
  - **Para agotar:** Cambiar `inStock: false`
  - **Para cambiar fotos:** Actualizar array `images`

### 3. Eliminar un Producto

- Eliminar el objeto completo del array `productsData` en `data.js`
- O cambiar `inStock: false` si quieres ocultarlo

### 4. Productos "Próximamente"

Para mostrar un producto en la tienda pero sin permitir que se pueda clickear ni comprar:
- Agrega al objeto del producto la propiedad: `isComingSoon: true`
- Cambia la etiqueta a: `badge: "PRÓXIMAMENTE"`
- Cambia el stock a: `inStock: false`
*(La imagen original se mostrará con un efecto de desenfoque/distorsión para generar expectativa. Al quitar esta propiedad, se verá normalmente).*

---

## 🖼️ Gestionar Imágenes

### Especificaciones de Imágenes

#### Imágenes de Productos
| Uso | Ubicación | Ancho | Alto | Proporción |
|-----|-----------|-------|------|-----------|
| Galería Desktop | optimized/lg/ | 1200px | 1500px | 4:5 |
| Galería Mobile | optimized/sm/ | 600px | 750px | 4:5 |
| Datos | Original | 800-1000px | 1000-1250px | 4:5 |

#### Imágenes de Categorías
| Categoría | Ubicación | Ancho | Alto | Tamaño máximo |
|-----------|-----------|-------|------|---------------|
| Remeras | optimized/sm/assets/images/Productos/Remeras y Chombas/ | 600px | 400px | 80KB |
| Camisas | optimized/sm/assets/images/Productos/Camisas/ | 600px | 400px | 80KB |
| Pantalones | optimized/sm/assets/images/Productos/Pantalones/ | 600px | 400px | 80KB |
| Abrigos | optimized/sm/assets/images/Productos/Abrigos/ | 600px | 400px | 80KB |
| Camisetas | optimized/sm/assets/images/Productos/Camisetas/ | 600px | 400px | 80KB |
| Accesorios | optimized/sm/assets/images/Productos/Accesorios/ | 600px | 400px | 80KB |

#### Imágenes de Colaboraciones (brand.html)
| Elemento | Ubicación | Ancho | Alto | Tamaño máximo |
|----------|-----------|-------|------|---------------|
| Hero | optimized/sm/assets/images/Brand/[Nombre]/ | 1200px | 600px | 150KB |
| Galería | optimized/sm/assets/images/Brand/[Nombre]/gallery/ | 600px | 600px | 100KB |

### Optimización de Imágenes

1. **Comprimir imágenes:**
   - Usar herramientas: TinyJPG, ImageOptim, o similar
   - Objetivo: Máximo 150KB por imagen de producto, 100KB para galería

2. **Formato recomendado:**
   - JPEG para fotos de productos (mejor compresión)
   - PNG solo para logos o gráficos con transparencia

3. **Nombrado de archivos:**
   - Usar nombres descriptivos: `REMERA-NAUTICA-ROJA-1.jpg`
   - Sin espacios, usar guiones
   - Numeración: `-1.jpg`, `-2.jpg`, `-3.jpg`

---

## 🌟 Galería de Comunidad

### 1. Agregar una Imagen a la Galería

- Guardar la imagen en:
  - `assets/images/Productos/Galeria ZS/`
  - `assets/images/optimized/lg/assets/images/Productos/Galeria ZS/`
  - `assets/images/optimized/sm/assets/images/Productos/Galeria ZS/`
- Usar nombres claros y sin espacios, por ejemplo:
  - `GALERIA-ZS-001.jpg`
  - `GALERIA-ZS-002.jpg`
- Comprimir la imagen antes de subirla:
  - `lg`: max 1200px de ancho, hasta 150KB
  - `sm`: max 600px de ancho, hasta 100KB
- Si la galería se gestiona desde datos, actualizar el array correspondiente en `data.js` con la nueva ruta.

### 2. Quitar una Imagen de la Galería

- Eliminar el archivo de las tres ubicaciones necesarias:
  - `assets/images/Productos/Galeria ZS/`
  - `assets/images/optimized/lg/assets/images/Productos/Galeria ZS/`
  - `assets/images/optimized/sm/assets/images/Productos/Galeria ZS/`
- Si existe una referencia en `data.js`, quitar la ruta del array de imágenes.
- Verificar en `gallery.html` y `gallery.js` que no queden referencias directas al nombre eliminado.

### 3. Actualizar una Imagen de la Galería

- Reemplazar el archivo antiguo con el nuevo en las tres ubicaciones:
  - `assets/images/Productos/Galeria ZS/`
  - `assets/images/optimized/lg/assets/images/Productos/Galeria ZS/`
  - `assets/images/optimized/sm/assets/images/Productos/Galeria ZS/`
- Mantener el mismo nombre de archivo para evitar referencias rotas, o actualizar la ruta en el código si cambia el nombre.
- Si es necesario, actualizar las rutas en `data.js` y en `gallery.html`.
- Probar la galería en desktop y mobile para confirmar que la imagen se carga correctamente.

---

## 🤝 Administrar Colaboraciones

### 1. Agregar una Nueva Colaboración

**Paso 1: Habilitar la próxima colaboración**

En `app.js`, buscar la línea:
```javascript
const upcomingCollaborationAvailable = false;
```

Cambiar a:
```javascript
const upcomingCollaborationAvailable = true;
```

**Paso 2: Agregar datos de la colaboración en data.js**

Encontrar el array `brandsData` y modificar o agregar:

```javascript
{
    key: "nombre-colaboracion",          // ID único (minúsculas, con guiones)
    title: "Nombre de la Colaboración",  // Nombre oficial
    image: "assets/images/Brand/[Nombre]/HERO-[NOMBRE].jpg",
    description: "Descripción de la colaboración: quiénes son, por qué colaboran con ONLY ZS, etc.",
    contact: "+54 9 380 4176824",        // Contacto del colaborador
    instagram: "instagram_handle",        // Usuario sin @
    website: "https://ejemplo.com",      // URL si tienen sitio web
    gallery: [
        "assets/images/Brand/[Nombre]/gallery/FOTO-1.jpg",
        "assets/images/Brand/[Nombre]/gallery/FOTO-2.jpg",
        "assets/images/Brand/[Nombre]/gallery/FOTO-3.jpg"
    ],
    products: [
        {
            id: 101,
            name: "Producto Colaboración",
            price: 45000,
            image: "assets/images/Productos/[Ruta]/PRODUCTO.jpg"
        }
    ]
}
```

**Paso 3: Crear carpeta de imágenes**

1. Crear carpeta: `assets/images/Brand/[Nombre de Colaboración]/`
2. Crear subcarpeta: `assets/images/Brand/[Nombre de Colaboración]/gallery/`
3. Guardar:
   - `HERO-[NOMBRE].jpg` (imagen principal, 1200x600px)
   - Fotos de galería (600x600px)

**Paso 4: Crear imágenes optimizadas**

- Copiar hero image a: `assets/images/optimized/sm/assets/images/Brand/[Nombre]/`
- Copiar galería a: `assets/images/optimized/sm/assets/images/Brand/[Nombre]/gallery/`

### 2. Desactivar una Colaboración

En `app.js`, cambiar:
```javascript
const upcomingCollaborationAvailable = false;
```

Esto ocultará el botón "PRÓXIMA COLABORACIÓN" automáticamente.

### 3. Editar Información de Colaboración

- Encontrar en `data.js` la colaboración por `key`
- Actualizar campos necesarios (description, instagram, website, etc.)

---

## 📞 Información de Contacto

### Ubicaciones del Número WhatsApp

| Ubicación | Archivo | Línea | Cambio |
|-----------|---------|-------|--------|
| Configuración | config.js | 6 | `WHATSAPP_NUMBER` |
| Footer Social | index.html | ~284 | href="https://wa.me/[NÚMERO]" |
| Botón Flotante | index.html | ~320 | href="https://wa.me/[NÚMERO]" |
| Info Modal | ui.js | ~35 | Número en texto |
| Galería Social | gallery.html | ~37 | href="https://wa.me/[NÚMERO]" |
| Galería Flotante | gallery.html | ~147 | href="https://wa.me/[NÚMERO]" |

**Formato:** Usar sin el prefijo `+54` (ej: `3804176824` en lugar de `+543804176824`)

---

## 🎨 Cambios CSS/Diseño

### Tamaños de Botones (ajustes UX)
- **Botón Principal:** `padding: 11px 24px; font-size: 1rem;`
- **Botón Pequeño:** `padding: 9px 18px; font-size: 0.9rem;`
- **Botón Categoría:** `padding: 8px 16px; font-size: 0.85rem;`

### Colores
- **Dorado Sofisticado:** `#BFA16A`
- **Oscuro:** `#0D0D0D`
- **Blanco:** `#FFFFFF`
- **Gris Neutral:** `#6B6B6B`

Para cambiar paleta de colores, actualizar variables CSS en `css/styles.css`:
```css
:root {
    --color-accent: #BFA16A;        /* Dorado */
    --color-dark: #0D0D0D;          /* Oscuro */
    --color-gray: #6B6B6B;          /* Gris */
    ...
}
```

---

## 🐛 Troubleshooting

### Imágenes no cargan
- Verificar que las rutas en `data.js` sean correctas
- Confirmar que las imágenes existen en `assets/images/`
- Revisar que los nombres no tengan espacios o caracteres especiales

### Productos no aparecen
- Revisar que `data.js` tenga formato JSON válido
- Verificar que `id` sea único
- Confirmar que `category` coincida con las categorías existentes

### Colaboración aún aparece bloqueada
- Verificar que `upcomingCollaborationAvailable = true` en `app.js`
- Hacer Ctrl+Shift+Delete (limpiar cache del navegador)
- Recargar la página (Ctrl+F5)

### Número WhatsApp no funciona
- Verificar que no tenga prefijo +54 (debe ser sin +)
- Confirmar que sea un número válido de Argentina (10 dígitos)

---

## ✅ Checklist de Actualización

Antes de publicar cambios:

- [ ] Imágenes optimizadas (máximo 150KB)
- [ ] Datos en formato JSON válido (sin errores de sintaxis)
- [ ] Rutas de imágenes correctas
- [ ] IDs de productos únicos
- [ ] Categorías correctas
- [ ] WhatsApp número sin prefijo +54
- [ ] Colaboraciones en carpetas correctas
- [ ] Descripciones sin caracteres especiales problemáticos
- [ ] Cache del navegador limpio
- [ ] Probado en desktop y mobile

---

## 📞 Soporte

Para consultas específicas sobre la estructura o cambios adicionales, contactar a: **3804176824**

**Última actualización:** 2026
**Versión:** 3.0
