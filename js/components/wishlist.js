﻿﻿﻿/* =========================================================
   ONLY ZS — wishlist.js
   Funcionalidad de favoritos
========================================================= */

function toggleWishlist(id, btnElement) {
    const index = wishlist.indexOf(id);
    const icon  = btnElement.querySelector('i');
    if (index > -1) {
        wishlist.splice(index, 1);
        icon.classList.replace('fas', 'far');
        btnElement.classList.remove('active');
        showToast("Removido de favoritos");
    } else {
        wishlist.push(id);
        icon.classList.replace('far', 'fas');
        btnElement.classList.add('active');
        showToast("✓ Agregado a favoritos");
        bounceIcon('wishlistCount');
    }
    localStorage.setItem('zs_wishlist', JSON.stringify(wishlist));
    updateCounters();
    renderWishlist();
}

function renderWishlist() {
    const container  = document.getElementById('wishlistItems');
    container.innerHTML = '';
    const wishlisted = productsData.filter(p => wishlist.includes(p.id));
    if (wishlisted.length === 0) {
        container.innerHTML = '<p class="empty-message"><i class="far fa-heart" style="font-size:2rem;display:block;margin-bottom:10px;color:#ccc;"></i>No tenés favoritos aún.</p>';
        return;
    }
    wishlisted.forEach(item => {
        const inCart = cart.some(c => c.id === item.id);
        container.innerHTML += `
            <div class="wishlist-item">
                <img src="${getOptimizedImage(item.image, 'sm')}"${getImageFallbackAttr(item.image)} alt="${item.name}" loading="lazy" decoding="async" width="65" height="65">
                <div class="wishlist-item-info">
                    <p class="wishlist-item-title">${item.name}</p>
                    <p class="wishlist-item-price">${item.inStock ? formatMoney(item.price) : ''}</p>
                    <div class="wishlist-item-actions">
                        ${inCart 
                            ? `<button class="wishlist-add-btn in-cart" onclick="removeFromCart('${item.id}')" onmouseenter="this.innerText='Quitar del carrito'" onmouseleave="this.innerText='En el carrito'" style="background: var(--color-success, #28a745); color: #fff;">En el carrito</button>`
                            : (item.inStock
                                ? `<button class="wishlist-add-btn" onclick="addToCartFromWishlist('${item.id}')">+ AL CARRITO</button>`
                                : `<span style="font-size:0.75rem;color:#aaa;">Agotado</span>`)}
                        <button class="wishlist-remove-btn" onclick="removeFromWishlist('${item.id}')">Quitar</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function addToCartFromWishlist(id) {
    addToCart(id);
    document.getElementById('wishlistOverlay').classList.remove('active');
    document.getElementById('wishlistDrawer').classList.remove('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.getElementById('cartDrawer').classList.add('active');
}

function removeFromWishlist(id) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) wishlist.splice(idx, 1);
    localStorage.setItem('zs_wishlist', JSON.stringify(wishlist));
    updateCounters();
    renderWishlist();
    const activeFilter = document.querySelector('.filter-btn.active');
    const cat = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
    renderProducts(cat === 'all' ? productsData : productsData.filter(p => p.category === cat));
    showToast("Removido de favoritos");
}
