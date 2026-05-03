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
    document.getElementById('cartCount').innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('wishlistCount').innerText = wishlist.length;
}
