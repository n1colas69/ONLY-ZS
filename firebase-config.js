import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyAou_R5qLytbsIlY_RbtPExXzD5s8qb_9E",
    authDomain: "only-zs-2bebe.firebaseapp.com",
    projectId: "only-zs-2bebe",
    storageBucket: "only-zs-2bebe.firebasestorage.app",
    messagingSenderId: "24282232018",
    appId: "1:24282232018:web:9bb5665ea691955753a90b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const COLLECTIONS = {
    comments: "comments",
    photos: "photos",
    admins: "admins"
};

export const cloudinaryConfig = {
    cloudName: "dpvvvosho",
    uploadPreset: "pictures",
    folder: "only-zs/pending-photos"
};
