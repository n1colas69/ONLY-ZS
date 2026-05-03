/* =========================================================
   ONLY ZS — cart.js
   Funcionalidad del carrito
========================================================= */

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
            showToast("No hay mas unidades disponibles de esta pieza");
            return;
        }
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        saveCart();
        renderCart();
    }
}

function renderCart() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    const subtotal = getCartSubtotal();

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-message"><i class="fas fa-shopping-cart" style="font-size:2rem;display:block;margin-bottom:10px;color:#ccc;"></i>Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const product = productsData.find(p => p.id === item.id) || item;
            const hasMaxQty = item.qty >= getProductStockQty(product);
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <p class="cart-item-title">${item.name}</p>
                        <p class="cart-item-price">${formatMoney(item.price)}</p>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)" ${hasMaxQty ? 'disabled title="Sin mas stock"' : ''}>+</button>
                        </div>
                        <button class="remove-item" onclick="updateQty(${item.id}, -${item.qty})">Eliminar</button>
                    </div>
                </div>
            `;
        });
    }

    const totalNode    = document.getElementById('cartTotal');
    const subtotalNode = document.getElementById('cartSubtotal');
    const originalRow  = document.getElementById('originalTotalRow');

    if (currentDiscount > 0) {
        const finalTotal = subtotal - (subtotal * currentDiscount);
        subtotalNode.innerText = formatMoney(subtotal);
        totalNode.innerText    = formatMoney(finalTotal);
        originalRow.style.display = 'flex';
        totalNode.style.background = 'var(--color-dark)';
        totalNode.style.color      = 'var(--color-accent)';
    } else {
        totalNode.innerText = formatMoney(subtotal);
        originalRow.style.display = 'none';
        totalNode.style.background = 'transparent';
        totalNode.style.color      = 'var(--color-dark)';
    }
}

function saveCart() {
    localStorage.setItem('zs_cart', JSON.stringify(cart));
    updateCounters();
}
