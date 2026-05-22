/* =========================================================
   ONLY ZS — utils.js
   Funciones utilitarias
========================================================= */

const formatMoney = (amount) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);

const getProductStockQty = (product) => product.stockQty || 1;

const getCartSubtotal = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);

const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    return currentDiscount > 0 ? subtotal - (subtotal * currentDiscount) : subtotal;
};

function bounceIcon(id) {
    const badge = document.getElementById(id);
    if (!badge) return;
    badge.classList.add('bounce');
    setTimeout(() => badge.classList.remove('bounce'), 300);
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

window.showToast = showToast;

function updateCounters() {
    const cartCount = document.getElementById('cartCount');
    const wishlistCount = document.getElementById('wishlistCount');
    if (cartCount) cartCount.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    if (wishlistCount) wishlistCount.innerText = wishlist.length;
}

function getOptimizedImage(src, size = 'sm') {
    if (!src || src.startsWith('http') || src.includes('/optimized/')) return src;
    const withoutExtension = src.replace(/\.(png|jpe?g)$/i, '');
    return `assets/images/optimized/${size}/${withoutExtension}.jpg`;
}

function getImageFallbackAttr(src) {
    return src && !src.includes('/optimized/')
        ? ` data-fallback-src="${src}"`
        : '';
}

document.addEventListener('error', (event) => {
    const image = event.target;
    if (image?.tagName !== 'IMG') return;
    const fallbackSrc = image.dataset?.fallbackSrc;
    if (!fallbackSrc || image.src.endsWith(fallbackSrc)) return;
    image.src = fallbackSrc;
}, true);

function preloadImage(src, size = 'lg') {
    if (!src) return;
    const image = new Image();
    image.decoding = 'async';
    image.src = getOptimizedImage(src, size);
}
