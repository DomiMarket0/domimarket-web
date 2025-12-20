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

// 1. GESTIÓN DEL MENÚ (Cambia Iniciar Sesión por Panel)
function renderMenu() {
    const nav = document.getElementById('auth-nav');
    if(!nav) return;

    // Detectamos si el usuario está logueado
    const isLoggedIn = localStorage.getItem('logged') === 'true';

    if (isLoggedIn) {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="dashboard.html" class="nav-item active-panel"><i class="fas fa-user-circle"></i> Panel</a></li>
            <li><a href="#" id="logout-btn" class="nav-item logout">Salir</a></li>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('logged');
            location.reload();
        });
    } else {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="login.html" style="background:red; color:white; padding:8px 20px; border-radius:5px; text-decoration:none; font-weight:bold;">INICIAR SESIÓN</a></li>
        `;
    }
}

// 2. CARGA DE PRODUCTOS (Protección contra base de datos vacía)
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        if (snapshot.empty) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding-top: 100px;">
                    <i class="fas fa-store-slash" style="font-size: 3rem; color: #333;"></i>
                    <h2 style="color: #444;">No hay productos en la tienda aún</h2>
                </div>`;
            return;
        }

        grid.innerHTML = "";
        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.imagen || 'https://via.placeholder.com/300x180'}" class="product-img">
                    <div class="product-info">
                        <h3>${p.nombre}</h3>
                        <p>${p.descripcion}</p>
                    </div>
                    <div class="action-bar">
                        <span class="price">$${p.precio}</span>
                        <button class="btn-buy">COMPRAR</button>
                    </div>
                </div>`;
        });
    }, (error) => {
        console.error("Error Firebase:", error);
        grid.innerHTML = "<p>Error al conectar con la base de datos.</p>";
    });
}

document.addEventListener('DOMContentLoaded', renderMenu);