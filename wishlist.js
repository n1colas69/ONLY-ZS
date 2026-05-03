/* =========================================================
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
        container.innerHTML += `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <p class="wishlist-item-title">${item.name}</p>
                    <p class="wishlist-item-price">${formatMoney(item.price)}</p>
                    <div class="wishlist-item-actions">
                        ${item.inStock
                            ? `<button class="wishlist-add-btn" onclick="addToCartFromWishlist(${item.id})">+ AL CARRITO</button>`
                            : `<span style="font-size:0.75rem;color:#aaa;">Agotado</span>`}
                        <button class="wishlist-remove-btn" onclick="removeFromWishlist(${item.id})">Quitar</button>
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
