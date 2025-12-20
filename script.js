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

// Actualizar Menú (Login/Salir)
function renderNav() {
    const nav = document.getElementById('auth-nav');
    const isLogged = localStorage.getItem('logged') === 'true';

    let menuItems = `
        <li><a href="index.html">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
    `;

    if (isLogged) {
        menuItems += `<li><a id="btn-logout" class="logout-link">SALIR</a></li>`;
    } else {
        menuItems += `<li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>`;
    }

    nav.innerHTML = menuItems;

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.onclick = () => {
            localStorage.setItem('logged', 'false');
            location.reload();
        };
    }
}

// Cargar Productos desde Firebase
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        if (snapshot.empty) {
            grid.innerHTML = "<p style='grid-column: 1/-1;'>No hay scripts disponibles actualmente.</p>";
            return;
        }
        snapshot.forEach((doc) => {
            const data = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <div class="product-img-container">
                        <img src="${data.imagen || 'https://via.placeholder.com/300x180?text=Premium+Script'}" alt="${data.nombre}">
                    </div>
                    <h3>${data.nombre}</h3>
                    <p>${data.descripcion || 'Script optimizado para servidores de alto rendimiento.'}</p>
                    <div class="product-footer">
                        <span class="price">$${data.precio}</span>
                        <button class="btn-buy" onclick="window.open('https://discord.gg/tu-link')">COMPRAR</button>
                    </div>
                </div>`;
        });
    });
}

document.addEventListener('DOMContentLoaded', renderNav);