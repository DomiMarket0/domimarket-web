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

// 1. Control del Menú y Botón Salir
function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;
    
    const isLogged = localStorage.getItem('logged') === 'true';

    let html = `
        <li><a href="index.html">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
    `;

    if (isLogged) {
        html += `
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a id="btn-logout" class="logout-link">SALIR</a></li>
        `;
    } else {
        html += `
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }

    nav.innerHTML = html;

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            localStorage.setItem('logged', 'false');
            location.reload();
        };
    }
}

// 2. Carga de Productos con Diseño Mejorado
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        if (snapshot.empty) {
            grid.innerHTML = "<p>Cargando scripts premium...</p>";
            return;
        }
        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.imagen || 'https://via.placeholder.com/300x180?text=Premium+Script'}" class="product-img">
                    <div class="product-info">
                        <h3>${p.nombre}</h3>
                        <p>${p.descripcion || 'Script optimizado para servidores de alto rendimiento.'}</p>
                        <div class="product-action">
                            <span class="price">$${p.precio}</span>
                            <button class="btn-buy">COMPRAR</button>
                        </div>
                    </div>
                </div>`;
        });
    });
}

document.addEventListener('DOMContentLoaded', renderNav);