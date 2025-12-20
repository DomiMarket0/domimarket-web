import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0B6BZdwXCXnidBn2seeZL7JdPjY6mTMc",
    authDomain: "domimarket-64ed1.firebaseapp.com",
    projectId: "domimarket-64ed1",
    storageBucket: "domimarket-64ed1.firebasestorage.app",
    messagingSenderId: "349796893686",
    appId: "1:349796893686:web:5d6f68b245f5ed31283dd7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const grid = document.getElementById('grid-productos');

onSnapshot(collection(db, "productos"), (snapshot) => {
    grid.innerHTML = "";
    snapshot.forEach((doc) => {
        const p = doc.data();
        grid.innerHTML += `
            <div class="product-card">
                <h3>${p.nombre || 'Sin nombre'}</h3>
                <p>${p.descripcion || 'Sin descripción'}</p>
                <span class="price">$${p.precio || '0.00'}</span>
                <button class="btn-buy">COMPRAR</button>
            </div>`;
    });
});