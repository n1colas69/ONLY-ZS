import { cloudinaryConfig, db, COLLECTIONS } from "./firebase-config.js";
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    serverTimestamp,
    where
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const fallbackReviews = [
    { id: "seed-1", name: "Arles", rating: 5, comment: "Prenda nomas." },
    { id: "seed-2", name: "Atilio", rating: 5, comment: "ZS" },
    { id: "seed-3", name: "Profeeee", rating: 5, comment: "Mansas remeeeeee." }
];

let currentSlide = 0;
let sliderInterval = null;

document.addEventListener("DOMContentLoaded", () => {
    setupCommentForm();
    setupPhotoForm();
    listenApprovedComments();
    listenApprovedPhotos();
});

function setupCommentForm() {
    const toggle = document.getElementById("openTestimonialFormBtn");
    const form = document.getElementById("testimonialForm");
    if (!toggle || !form) return;

    toggle.addEventListener("click", () => {
        const isVisible = form.style.display === "block";
        form.style.display = isVisible ? "none" : "block";
        if (!isVisible) document.getElementById("testimonialName")?.focus();
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const submitButton = form.querySelector("button[type='submit']");
        const name = document.getElementById("testimonialName").value.trim();
        const rating = Number(document.getElementById("testimonialRating").value);
        const comment = document.getElementById("testimonialComment").value.trim();

        if (!name || !comment || rating < 1 || rating > 5) {
            showToast("Completá tu nombre, puntuación y comentario.");
            return;
        }

        try {
            setBusy(submitButton, true, "ENVIANDO...");
            await addDoc(collection(db, COLLECTIONS.comments), {
                name,
                rating,
                comment,
                status: "pending",
                createdAt: serverTimestamp(),
                approvedAt: null,
                rejectedAt: null
            });
            form.reset();
            form.style.display = "none";
            showToast("Reseña enviada. Queda pendiente de aprobación.");
        } catch (error) {
            console.error(error);
            showToast("No pudimos enviar la reseña. Probá de nuevo.");
        } finally {
            setBusy(submitButton, false, "ENVIAR RESEÑA");
        }
    });
}

function setupPhotoForm() {
    const form = document.getElementById("photoSubmitForm");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const submitButton = form.querySelector("button[type='submit']");
        const fileInput = document.getElementById("photoSubmitFile");
        const file = fileInput.files?.[0];
        const name = document.getElementById("photoSubmitName").value.trim();
        const caption = document.getElementById("photoSubmitCaption").value.trim();

        if (!name || !file) {
            showToast("Completá tu nombre y elegí una foto.");
            return;
        }
        if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
            showToast("Subí una imagen de hasta 5 MB.");
            return;
        }

        try {
            setBusy(submitButton, true, "SUBIENDO...");
            const uploadResult = await uploadPhotoToCloudinary(file);

            await addDoc(collection(db, COLLECTIONS.photos), {
                name,
                caption,
                imageUrl: uploadResult.secure_url,
                publicId: uploadResult.public_id,
                cloudinaryAssetId: uploadResult.asset_id,
                width: uploadResult.width || null,
                height: uploadResult.height || null,
                status: "pending",
                createdAt: serverTimestamp(),
                approvedAt: null,
                rejectedAt: null
            });

            form.reset();
            showToast("Foto enviada. Queda pendiente de aprobación.");
        } catch (error) {
            console.error(error);
            showToast("No pudimos subir la foto. Probá de nuevo.");
        } finally {
            setBusy(submitButton, false, "ENVIAR FOTO");
        }
    });
}

async function uploadPhotoToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);
    if (cloudinaryConfig.folder) formData.append("folder", cloudinaryConfig.folder);
    formData.append("tags", "only-zs,pending-community-photo");

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.error?.message || "Cloudinary upload failed");
    }
    return result;
}

function listenApprovedComments() {
    const approvedCommentsQuery = query(
        collection(db, COLLECTIONS.comments),
        where("status", "==", "approved")
    );

    onSnapshot(approvedCommentsQuery, (snapshot) => {
        const approved = sortByDate(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })), "approvedAt");
        renderTestimonials(approved.length ? approved : fallbackReviews);
    }, (error) => {
        console.error(error);
        renderTestimonials(fallbackReviews);
    });
}

function listenApprovedPhotos() {
    const approvedPhotosQuery = query(
        collection(db, COLLECTIONS.photos),
        where("status", "==", "approved")
    );

    onSnapshot(approvedPhotosQuery, (snapshot) => {
        const photos = sortByDate(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })), "approvedAt");
        renderGallery(photos);
    }, (error) => {
        console.error(error);
        renderGallery([]);
    });
}

function renderTestimonials(reviews) {
    const slider = document.getElementById("testimonialSlider");
    const dots = document.getElementById("sliderDots");
    if (!slider || !dots) return;

    clearInterval(sliderInterval);
    currentSlide = 0;
    slider.innerHTML = reviews.map(createReviewSlide).join("");
    dots.innerHTML = reviews.map((_, index) => (
        `<button class="dot-btn${index === 0 ? " active" : ""}" data-slide="${index}" aria-label="Ir al testimonio ${index + 1}"></button>`
    )).join("");

    dots.querySelectorAll(".dot-btn").forEach(button => {
        button.addEventListener("click", () => {
            goToSlide(Number(button.dataset.slide));
            resetAutoPlay();
        });
    });

    const oldPrev = document.getElementById("sliderPrev");
    const oldNext = document.getElementById("sliderNext");
    oldPrev?.replaceWith(oldPrev.cloneNode(true));
    oldNext?.replaceWith(oldNext.cloneNode(true));

    document.getElementById("sliderPrev")?.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
        resetAutoPlay();
    });
    document.getElementById("sliderNext")?.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
        resetAutoPlay();
    });

    goToSlide(0);
    startAutoPlay();
}

function createReviewSlide(review) {
    const safeName = escapeHTML(review.name || "Cliente ZS");
    const safeComment = escapeHTML(review.comment || "");
    const rating = Math.max(1, Math.min(5, Number(review.rating) || 5));
    const initials = encodeURIComponent(getInitials(safeName));

    return `
        <div class="slide">
            <div class="stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
            <p>"${safeComment}"</p>
            <div class="slide-author">
                <img src="https://placehold.co/48x48/1a1a1a/FFF?text=${initials}" alt="${safeName}" class="avatar">
                <span>@${safeName}</span>
            </div>
        </div>
    `;
}

function goToSlide(index) {
    const slider = document.getElementById("testimonialSlider");
    const slides = document.querySelectorAll("#testimonialSlider .slide");
    const dots = document.querySelectorAll("#sliderDots .dot-btn");
    if (!slider || slides.length === 0) return;

    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    const slideWidth = slides[0].clientWidth + 24;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
    currentSlide = index;
    dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentSlide));
}

function startAutoPlay() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 4000);
}

function resetAutoPlay() {
    clearInterval(sliderInterval);
    startAutoPlay();
}

function renderGallery(photos) {
    const grid = document.getElementById("galleryGrid");
    const empty = document.getElementById("galleryEmptyMsg");
    if (!grid || !empty) return;

    grid.innerHTML = "";
    if (!photos.length) {
        empty.classList.add("visible");
        return;
    }

    empty.classList.remove("visible");
    photos.forEach(photo => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        item.innerHTML = `
            <img src="${escapeHTML(photo.imageUrl)}" alt="Foto enviada por ${escapeHTML(photo.name || "cliente ZS")}" loading="lazy">
        `;
        grid.appendChild(item);
    });
}

function setBusy(button, isBusy, label) {
    if (!button) return;
    button.disabled = isBusy;
    button.textContent = label;
}

function sortByDate(items, field) {
    return [...items].sort((a, b) => {
        const aTime = a[field]?.toMillis?.() || 0;
        const bTime = b[field]?.toMillis?.() || 0;
        return bTime - aTime;
    });
}

function showToast(message) {
    if (window.showToast) {
        window.showToast(message);
        return;
    }
    alert(message);
}

function getInitials(name) {
    return String(name)
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part.charAt(0).toUpperCase())
        .join("") || "ZS";
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
