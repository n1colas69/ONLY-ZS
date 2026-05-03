# ONLY ZS - Estructura de Archivos Modular

## Descripción

El código ha sido reorganizado en módulos separados para mejor mantenibilidad y organización.

## Estructura de Archivos

### Archivo Principal de Configuración
- **`config.js`** - Configuración global (WhatsApp, constantes)

### Datos
- **`data.js`** - Datos de productos y galería comunitaria

### Funcionalidades Principales
- **`app.js`** - Inicialización principal y punto de entrada
- **`utils.js`** - Funciones utilitarias (formatMoney, showToast, etc)
- **`products.js`** - Gestión de renderización de productos y filtros
- **`cart.js`** - Funcionalidad del carrito (agregar, actualizar, guardar)
- **`wishlist.js`** - Gestión de favoritos
- **`modals.js`** - Modales de producto y checkout
- **`gallery.js`** - Galería comunitaria
- **`ui.js`** - Interacciones de UI (drawers, búsqueda, menú móvil)
- **`scroll.js`** - Efectos de scroll, parallax y cursor personalizado

### Archivos Estáticos
- **`index.html`** - HTML principal (carga todos los scripts en orden)
- **`styles.css`** - Estilos globales
- **`main.js`** - OBSOLETO (puedes eliminarlo después de verificar)

## Orden de Carga

Los scripts se cargan en el `index.html` en este orden:
1. `config.js` - Configuración
2. `data.js` - Datos
3. `utils.js` - Utilidades
4. `cart.js` - Carrito
5. `wishlist.js` - Favoritos
6. `products.js` - Productos
7. `modals.js` - Modales
8. `gallery.js` - Galería
9. `scroll.js` - Scroll y efectos
10. `ui.js` - UI
11. `app.js` - Inicialización


## Cómo Agregar Nuevas Funcionalidades

Para agregar nuevas features:
1. Crea un nuevo archivo (ej: `search.js`)
2. Escribe las funciones necesarias
3. Agrégalo al `index.html` en el orden correcto
4. Llama las funciones desde `app.js` en el evento `DOMContentLoaded`

## Notas

- El archivo `main.js` original puede ser eliminado
- Todos los módulos comparten el estado global definido en `app.js`
- Las variables globales (`cart`, `wishlist`, etc) se inicializan en `app.js`
