/* =========================================================
   ONLY ZS — gallery.js
   Galería comunitaria
========================================================= */

function setupCommunityGallery() {
    renderCommunityGallery();

    const overlay = document.getElementById('galleryLightbox');
    const closeBtn = document.getElementById('galleryLightboxClose');
    const prevBtn = document.getElementById('galleryLightboxPrev');
    const nextBtn = document.getElementById('galleryLightboxNext');
    let touchStartX = 0;

    if (!overlay) return;

    closeBtn?.addEventListener('click', closeGalleryLightbox);
    prevBtn?.addEventListener('click', () => updateGalleryLightbox(-1));
    nextBtn?.addEventListener('click', () => updateGalleryLightbox(1));

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeGalleryLightbox();
    });

    overlay.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    overlay.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) < 45) return;
        updateGalleryLightbox(diff > 0 ? -1 : 1);
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeGalleryLightbox();
        if (e.key === 'ArrowLeft') updateGalleryLightbox(-1);
        if (e.key === 'ArrowRight') updateGalleryLightbox(1);
    });
}

function renderCommunityGallery() {
    const grid = document.getElementById('galleryGrid');
    const emptyMsg = document.getElementById('galleryEmptyMsg');
    if (!grid || !emptyMsg) return;

    grid.innerHTML = '';
    if (communityGalleryData.length === 0) {
        emptyMsg.classList.add('visible');
        return;
    }

    emptyMsg.classList.remove('visible');
    communityGalleryData.forEach((item, index) => {
        const button = document.createElement('button');
        button.className = 'gallery-item';
        button.type = 'button';
        button.style.setProperty('--delay', `${index * 55}ms`);
        button.innerHTML = `
            <img src="${item.src}" alt="${item.alt}" loading="lazy">
            <span class="gallery-item-hover"><i class="fab fa-instagram"></i></span>
        `;
        button.addEventListener('click', () => openGalleryLightbox(index));
        grid.appendChild(button);
    });
}

function openGalleryLightbox(index) {
    currentGalleryPhoto = index;
    updateGalleryLightbox(0);
    const overlay = document.getElementById('galleryLightbox');
    overlay?.classList.add('active');
    overlay?.setAttribute('aria-hidden', 'false');
}

function closeGalleryLightbox() {
    const overlay = document.getElementById('galleryLightbox');
    overlay?.classList.remove('active');
    overlay?.setAttribute('aria-hidden', 'true');
}

function updateGalleryLightbox(direction) {
    if (communityGalleryData.length === 0) return;
    currentGalleryPhoto += direction;
    if (currentGalleryPhoto < 0) currentGalleryPhoto = communityGalleryData.length - 1;
    if (currentGalleryPhoto >= communityGalleryData.length) currentGalleryPhoto = 0;

    const item = communityGalleryData[currentGalleryPhoto];
    const image = document.getElementById('galleryLightboxImage');
    const counter = document.getElementById('galleryLightboxCounter');
    if (!image || !counter) return;

    image.classList.remove('image-enter');
    void image.offsetWidth;
    image.src = item.src;
    image.alt = item.alt;
    image.classList.add('image-enter');
    counter.textContent = `${currentGalleryPhoto + 1} / ${communityGalleryData.length}`;
}
