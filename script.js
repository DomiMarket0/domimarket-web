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

// Manejo del Menú Dinámico
function updateNavbar() {
    const nav = document.getElementById('auth-nav');
    const isLogged = localStorage.getItem('logged') === 'true';

    let menuContent = `
        <li><a href="index.html">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
    `;

    if (isLogged) {
        menuContent += `<li><a id="logout-btn" class="logout-link">SALIR</a></li>`;
    } else {
        menuContent += `<li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>`;
    }

    nav.innerHTML = menuContent;

    if (isLogged) {
        document.getElementById('logout-btn').onclick = () => {
            localStorage.setItem('logged', 'false');
            location.reload();
        };
    }
}

// Carga de Scripts Premium
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <div class="product-img-placeholder">
                        ${data.imagen ? `<img src="${data.imagen}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">` : '</>'}
                    </div>
                    <h3>${data.nombre}</h3>
                    <p>${data.descripcion || 'Sin descripción disponible.'}</p>
                    <div class="product-footer">
                        <span class="price">$${data.precio}</span>
                        <button class="btn-buy">COMPRAR</button>
                    </div>
                </div>`;
        });
    });
}

document.addEventListener('DOMContentLoaded', updateNavbar);