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

function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;
    
    // Verifica si el usuario inició sesión
    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        // MENÚ PARA USUARIO CON SESIÓN (Mantiene navegación + PANEL + SALIR)
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="dashboard.html" class="panel-btn neon-border">PANEL</a></li>
            <li><a href="#" id="logout-btn" class="logout-link">SALIR</a></li>
        `;

        document.getElementById('logout-btn').onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('logged'); // Elimina la sesión
            location.reload(); // Recarga para mostrar el botón de Iniciar Sesión
        };
    } else {
        // MENÚ PARA VISITANTE
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="login.html" class="btn-nav-login neon-button">INICIAR SESIÓN</a></li>
        `;
    }
}

// Carga de productos con diseño profesional
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.imagen || 'logo.png'}" class="product-img">
                    <div class="product-info">
                        <h3>${p.nombre}</h3>
                        <p>${p.descripcion}</p>
                    </div>
                    <div class="product-action-bar">
                        <a href="#" class="btn-details">DETALLES</a>
                        <div class="action-right">
                            <span class="price-tag">$${p.precio}</span>
                            <button class="btn-buy-now">COMPRAR</button>
                        </div>
                    </div>
                </div>`;
        });
    });
}

document.addEventListener('DOMContentLoaded', renderNav);