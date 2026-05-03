import { auth, db, COLLECTIONS } from "../firebase-config.js";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    query,
    serverTimestamp,
    updateDoc,
    where
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const loginView = document.getElementById("adminLoginView");
const dashboardView = document.getElementById("adminDashboardView");
const loginForm = document.getElementById("adminLoginForm");
const logoutButton = document.getElementById("adminLogoutButton");
const commentsList = document.getElementById("pendingCommentsList");
const photosList = document.getElementById("pendingPhotosList");
const commentsCount = document.getElementById("commentsCount");
const photosCount = document.getElementById("photosCount");

let commentsUnsubscribe = null;
let photosUnsubscribe = null;

loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;
    const submitButton = loginForm.querySelector("button[type='submit']");

    try {
        setBusy(submitButton, true, "INGRESANDO...");
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        showToast("No se pudo iniciar sesión.");
    } finally {
        setBusy(submitButton, false, "INGRESAR");
    }
});

logoutButton?.addEventListener("click", () => signOut(auth));

document.querySelectorAll(".admin-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".admin-tab").forEach(item => item.classList.remove("active"));
        document.querySelectorAll(".admin-panel").forEach(panel => panel.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(`${tab.dataset.adminTab}Panel`)?.classList.add("active");
    });
});

onAuthStateChanged(auth, async (user) => {
    stopListeners();
    if (!user || !(await isAdmin(user.uid))) {
        if (user) {
            await signOut(auth);
            showToast("Tu usuario no tiene permisos de administrador.");
        }
        showLogin();
        return;
    }

    showDashboard();
    listenPendingComments();
    listenPendingPhotos();
});

async function isAdmin(uid) {
    const adminDoc = await getDoc(doc(db, COLLECTIONS.admins, uid));
    return adminDoc.exists();
}

function listenPendingComments() {
    const pendingCommentsQuery = query(
        collection(db, COLLECTIONS.comments),
        where("status", "==", "pending")
    );

    commentsUnsubscribe = onSnapshot(pendingCommentsQuery, (snapshot) => {
        const comments = sortByDate(snapshot.docs.map(item => ({ id: item.id, ...item.data() })), "createdAt");
        commentsCount.textContent = comments.length;
        renderComments(comments);
    }, (error) => {
        console.error(error);
        showToast("No se pudieron cargar los comentarios.");
    });
}

function listenPendingPhotos() {
    const pendingPhotosQuery = query(
        collection(db, COLLECTIONS.photos),
        where("status", "==", "pending")
    );

    photosUnsubscribe = onSnapshot(pendingPhotosQuery, (snapshot) => {
        const photos = sortByDate(snapshot.docs.map(item => ({ id: item.id, ...item.data() })), "createdAt");
        photosCount.textContent = photos.length;
        renderPhotos(photos);
    }, (error) => {
        console.error(error);
        showToast("No se pudieron cargar las fotos.");
    });
}

function renderComments(comments) {
    commentsList.innerHTML = "";
    if (!comments.length) {
        commentsList.innerHTML = '<p class="admin-empty">No hay comentarios pendientes.</p>';
        return;
    }

    comments.forEach(comment => {
        const item = document.createElement("article");
        item.className = "admin-item";
        item.innerHTML = `
            <div>
                <div class="admin-item-meta">
                    <strong>@${escapeHTML(comment.name || "Cliente ZS")}</strong>
                    <span class="admin-rating">${renderStars(comment.rating)}</span>
                </div>
                <p>${escapeHTML(comment.comment || "")}</p>
            </div>
            <div class="admin-actions">
                <button class="btn btn-dark" data-action="approve-comment" data-id="${comment.id}">APROBAR</button>
                <button class="btn-icon-outline admin-danger" data-action="reject-comment" data-id="${comment.id}">RECHAZAR</button>
                <button class="btn-icon-outline admin-danger" data-action="delete-comment" data-id="${comment.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        commentsList.appendChild(item);
    });
}

function renderPhotos(photos) {
    photosList.innerHTML = "";
    if (!photos.length) {
        photosList.innerHTML = '<p class="admin-empty">No hay fotos pendientes.</p>';
        return;
    }

    photos.forEach(photo => {
        const item = document.createElement("article");
        item.className = "admin-item admin-photo-item";
        item.innerHTML = `
            <img src="${escapeHTML(photo.imageUrl)}" alt="Foto enviada por ${escapeHTML(photo.name || "cliente ZS")}">
            <div>
                <div class="admin-item-meta">
                    <strong>@${escapeHTML(photo.name || "Cliente ZS")}</strong>
                </div>
                <p>${escapeHTML(photo.caption || "Sin comentario.")}</p>
            </div>
            <div class="admin-actions">
                <button class="btn btn-dark" data-action="approve-photo" data-id="${photo.id}">APROBAR</button>
                <button class="btn-icon-outline admin-danger" data-action="reject-photo" data-id="${photo.id}">RECHAZAR</button>
                <button class="btn-icon-outline admin-danger" data-action="delete-photo" data-id="${photo.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        photosList.appendChild(item);
    });
}

document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;
    try {
        setBusy(button, true, "...");
        if (action === "approve-comment") await approveItem(COLLECTIONS.comments, id);
        if (action === "reject-comment") await rejectItem(COLLECTIONS.comments, id);
        if (action === "delete-comment") await deleteItem(COLLECTIONS.comments, id);
        if (action === "approve-photo") await approveItem(COLLECTIONS.photos, id);
        if (action === "reject-photo") await rejectItem(COLLECTIONS.photos, id);
        if (action === "delete-photo") await deleteItem(COLLECTIONS.photos, id);
    } catch (error) {
        console.error(error);
        showToast("No se pudo completar la acción.");
    }
});

async function approveItem(collectionName, id) {
    await updateDoc(doc(db, collectionName, id), {
        status: "approved",
        approvedAt: serverTimestamp(),
        rejectedAt: null
    });
    showToast("Contenido aprobado.");
}

async function rejectItem(collectionName, id) {
    await updateDoc(doc(db, collectionName, id), {
        status: "rejected",
        rejectedAt: serverTimestamp()
    });
    showToast("Contenido rechazado.");
}

async function deleteItem(collectionName, id) {
    await deleteDoc(doc(db, collectionName, id));
    showToast("Contenido eliminado.");
}

function showLogin() {
    loginView.hidden = false;
    dashboardView.hidden = true;
}

function showDashboard() {
    loginView.hidden = true;
    dashboardView.hidden = false;
}

function stopListeners() {
    if (commentsUnsubscribe) commentsUnsubscribe();
    if (photosUnsubscribe) photosUnsubscribe();
    commentsUnsubscribe = null;
    photosUnsubscribe = null;
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
    const container = document.getElementById("toast-container");
    if (!container) {
        alert(message);
        return;
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function renderStars(rating) {
    const safeRating = Math.max(1, Math.min(5, Number(rating) || 5));
    return "★".repeat(safeRating) + "☆".repeat(5 - safeRating);
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
