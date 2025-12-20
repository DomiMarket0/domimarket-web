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

// CAMBIAR MENÚ SEGÚN SESIÓN
function updateNav() {
    const nav = document.getElementById('auth-nav');
    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="dashboard.html" style="border:1px solid red; padding:5px 10px;">PANEL</a></li>
            <li><a id="btn-salir" class="logout-btn">SALIR</a></li>
        `;
        document.getElementById('btn-salir').onclick = () => {
            localStorage.setItem('logged', 'false');
            location.reload();
        };
    } else {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}

// CARGAR PRODUCTOS
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <div class="product-info">
                        <h3>${p.nombre}</h3>
                        <p>${p.descripcion}</p>
                        <span class="price-tag">$${p.precio}</span>
                    </div>
                </div>`;
        });
    });
}

document.addEventListener('DOMContentLoaded', updateNav);