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

// Escuchar los productos en tiempo real
const grid = document.querySelector('.products-grid');

onSnapshot(collection(db, "productos"), (snapshot) => {
    grid.innerHTML = ""; // Limpiar antes de cargar
    snapshot.forEach((doc) => {
        const p = doc.data();
        grid.innerHTML += `
            <div class="product-card" data-aos="fade-up">
                <div class="product-img-box">
                    <img src="${p.imagen || 'logo.png'}" alt="Script">
                </div>
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
                <span class="price">${p.precio}</span>
                <button class="btn-buy">Comprar Ahora</button>
            </div>
        `;
    });
});