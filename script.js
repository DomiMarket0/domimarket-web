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

// Leer productos en tiempo real
onSnapshot(collection(db, "productos"), (snapshot) => {
    grid.innerHTML = ""; 
    if (snapshot.empty) {
        grid.innerHTML = "<p>No hay productos disponibles por ahora.</p>";
        return;
    }
    snapshot.forEach((doc) => {
        const p = doc.data();
        grid.innerHTML += `
            <div class="product-card" data-aos="fade-up">
                <div class="product-img-box">
                    <img src="${p.imagen || 'logo.png'}" alt="Script" onerror="this.src='logo.png'">
                </div>
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
                <span class="price">${p.precio}</span>
                <button class="btn-buy">Comprar Ahora</button>
            </div>
        `;
    });
});