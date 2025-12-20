import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu configuración de Firebase
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

// Escuchar cambios en la base de datos en tiempo real
onSnapshot(collection(db, "productos"), (snapshot) => {
    grid.innerHTML = ""; 
    snapshot.forEach((doc) => {
        const p = doc.data();
        grid.innerHTML += `
            <div class="product-card" data-aos="fade-up">
                <div class="product-img-box" style="position:relative;">
                    <img src="${p.imagen || 'logo.png'}" alt="${p.nombre}">
                    <div style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.8); padding:5px 10px; border-radius:5px; font-size:10px; color:#ff0000; border:1px solid #ff0000; font-weight:bold;">MTA:SA</div>
                </div>
                <div class="product-info">
                    <h3>${p.nombre}</h3>
                    <p>${p.descripcion}</p>
                </div>
                <div class="action-panel">
                    <a href="#" class="btn-details"><i class="fas fa-plus"></i> DETALLES</a>
                    <div style="display:flex; align-items:center;">
                        <span class="price-tag">$${p.precio}</span>
                        <button class="btn-buy-now">COMPRAR</button>
                    </div>
                </div>
            </div>
        `;
    });
});