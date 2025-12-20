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

// FUNCION DEL MENU (Esta es la que cambia el botón)
function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;
    
    const isLogged = localStorage.getItem('logged') === 'true';

    let menu = `
        <li><a href="index.html">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
    `;

    if (isLogged) {
        menu += `
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a id="btn-salir" class="logout-link">SALIR</a></li>
        `;
    } else {
        menu += `
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }

    nav.innerHTML = menu;

    // EVENTO PARA CERRAR SESION
    const logoutBtn = document.getElementById('btn-salir');
    if (logoutBtn) {
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.setItem('logged', 'false');
            window.location.href = "index.html"; 
        };
    }
}

// CARGA DE PRODUCTOS
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <h3>${p.nombre}</h3>
                    <p>${p.descripcion}</p>
                    <span style="color:#2ecc71; font-weight:900;">$${p.precio}</span>
                </div>`;
        });
    });
}

document.addEventListener('DOMContentLoaded', renderNav);