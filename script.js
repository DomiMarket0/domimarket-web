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

// 1. MANEJO DE NAVEGACIÓN DINÁMICA
function actualizarMenu() {
    const nav = document.getElementById('auth-nav');
    const isLoggedIn = localStorage.getItem('logged') === 'true';

    if (isLoggedIn) {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="#productos" class="nav-item">Productos</a></li>
            <li><a href="dashboard.html" class="nav-item active-panel"><i class="fas fa-user-circle"></i> Panel</a></li>
            <li><a href="#" id="logout-btn" class="nav-item logout">Salir</a></li>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('logged');
            location.reload();
        });
    } else {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="#productos" class="nav-item">Productos</a></li>
            <li><a href="login.html" style="background:red; color:white; padding:8px 15px; border-radius:5px; text-decoration:none; font-weight:bold;">INICIAR SESIÓN</a></li>
        `;
    }
}

// 2. CARGA DE PRODUCTOS
const grid = document.getElementById('grid-productos');
if(grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.imagen || 'logo.png'}" style="width:100%; height:180px; object-fit:cover;">
                    <div class="product-info">
                        <h3>${p.nombre}</h3>
                        <p>${p.descripcion}</p>
                    </div>
                    <div class="action-panel">
                        <span class="price-tag">$${p.precio}</span>
                        <button class="btn-buy-now">COMPRAR</button>
                    </div>
                </div>
            `;
        });
    });
}

document.addEventListener('DOMContentLoaded', actualizarMenu);