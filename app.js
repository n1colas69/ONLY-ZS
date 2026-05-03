/* =========================================================
   ONLY ZS — app.js
   Inicialización principal de la aplicación
========================================================= */

// Estado global
let cart = JSON.parse(localStorage.getItem('zs_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('zs_wishlist')) || [];
let currentDiscount = 0;
let currentProductModal = null;
let currentProductPhoto = 0;
let currentGalleryPhoto = 0;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Render inicial
    renderProducts(productsData);
    updateCounters();
    renderCart();
    renderWishlist();
    
    // Setup de componentes
    setupObservers();
    initFooterLinks();
    setupProductModal();
    setupCheckout();
    setupCommunityGallery();
    
    // Setup de UI
    initUI();
    initNewsletter();
    initCoupon();
    initCheckoutBtn();
});
