/* =========================================================
   ONLY ZS — cart.js
   Funcionalidad del carrito
========================================================= */

// Funciones globales para deslizar y eliminar
let swipeStartX = 0;
let currentSwipeItem = null;

window.handleSwipeStart = function(e) {
    if (e.touches.length > 1) return;
    swipeStartX = e.touches[0].clientX;
    currentSwipeItem = e.currentTarget;
    currentSwipeItem.style.transition = 'none';
};
window.handleSwipeMove = function(e) {
    if (!currentSwipeItem) return;
    const diffX = e.touches[0].clientX - swipeStartX;
    if (diffX < 0 && diffX > -90) currentSwipeItem.style.transform = `translateX(${diffX}px)`;
};
window.handleSwipeEnd = function(e, id) {
    if (!currentSwipeItem) return;
    const diffX = e.changedTouches[0].clientX - swipeStartX;
    currentSwipeItem.style.transition = 'transform 0.3s ease';
    if (diffX < -50) {
        currentSwipeItem.style.transform = `translateX(-100%)`;
        setTimeout(() => updateQty(id, -100), 300); // Remueve unidades
    } else {
        currentSwipeItem.style.transform = `translateX(0)`;
    }
    currentSwipeItem = null;
};

function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    if (!product || !product.inStock) {
        showToast("Producto no disponible");
        return;
    }
    const existing = cart.find(item => item.id === id);
    const stockQty = getProductStockQty(product);
    if (existing) {
        if (existing.qty >= stockQty) {
            showToast("Solo hay una unidad disponible de esta pieza");
            return;
        }
        existing.qty += 1;
    }
    else cart.push({ ...product, qty: 1 });
    saveCart();
    bounceIcon('cartCount');
    showToast(`✓ ${product.name} agregado al carrito`);
    renderCart();
}

function buyNow(id) {
    const product = productsData.find(p => p.id === id);
    if (!product || !product.inStock) {
        showToast("Producto no disponible");
        return;
    }
    
    // Add to cart if not already there
    const existing = cart.find(item => item.id === id);
    if (!existing) {
        cart.push({ ...product, qty: 1 });
        saveCart();
        renderCart();
    }
    
    // Close product modal and open checkout
    closeProductModal();
    openCheckoutModal();
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        const product = productsData.find(p => p.id === id) || item;
        const nextQty = item.qty + change;
        if (change > 0 && nextQty > getProductStockQty(product)) {
            showToast("No hay más unidades disponibles de esta pieza");
            return;
        }
        if (nextQty <= 0) {
            const itemNode = document.querySelector(`.cart-item[data-id="${id}"]`);
            if (itemNode) {
                itemNode.classList.add('removing');
                setTimeout(() => {
                    cart = cart.filter(i => i.id !== id);
                    saveCart();
                    renderCart();
                }, 300);
                return; // Pausamos para permitir la animación
            } else {
                cart = cart.filter(i => i.id !== id);
            }
        } else {
            item.qty = nextQty;
        }
        saveCart();
        renderCart();
    }
}

function renderCart() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    const subtotal = getCartSubtotal();

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                <i class="fas fa-shopping-cart" style="font-size:2.5rem;display:block;margin-bottom:15px;color:var(--color-border);"></i>
                <p style="margin-bottom:20px;">Tu carrito está vacío.</p>
                <button class="btn btn-primary" onclick="closeCartUI(); window.scrollTo({top: document.querySelector('.products-compact') ? document.querySelector('.products-compact').offsetTop - 80 : 0, behavior: 'smooth'});">Seguir Comprando</button>
            </div>
        `;
    } else {
        let cartHTML = '';
        cart.forEach(item => {
            const product = productsData.find(p => p.id === item.id) || item;
            const hasMaxQty = item.qty >= getProductStockQty(product);
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${getOptimizedImage(item.image, 'sm')}"${getImageFallbackAttr(item.image)} alt="${item.name}" loading="lazy" decoding="async" width="65" height="65">
                    <div class="cart-item-details">
                        <p class="cart-item-title">${item.name}</p>
                        <p class="cart-item-price">${formatMoney(item.price)}</p>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)" ${hasMaxQty ? 'disabled title="Sin más stock"' : ''}>+</button>
                        </div>
                        <button class="remove-item" onclick="updateQty(${item.id}, -${item.qty})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = cartHTML;
    }

    const totalNode    = document.getElementById('cartTotal');
    const originalRow  = document.getElementById('originalTotalRow');

    totalNode.innerText = formatMoney(subtotal);
    originalRow.style.display = 'none';
    totalNode.style.background = 'transparent';
    totalNode.style.color      = 'var(--color-dark)';
}

function saveCart() {
    localStorage.setItem('zs_cart', JSON.stringify(cart));
    updateCounters();
}
