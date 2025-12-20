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

// FUNCIÓN PARA EL MENÚ (Cambia según si estás logueado o no)
function renderMenu() {
    const nav = document.getElementById('auth-nav');
    const logueado = localStorage.getItem('logged') === 'true';

    if (logueado) {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="dashboard.html" class="nav-item panel-active">Panel</a></li>
            <li><a href="#" id="logout" class="nav-item" style="color:red">Salir</a></li>
        `;
        document.getElementById('logout').onclick = () => {
            localStorage.setItem('logged', 'false');
            location.reload();
        };
    } else {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="login.html" style="background:red; color:white; padding:8px 15px; border-radius:5px; text-decoration:none; font-weight:bold;">INICIAR SESIÓN</a></li>
        `;
    }
}

// CARGA DE PRODUCTOS (Blindada contra errores)
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        
        if (snapshot.empty) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align:center; padding:100px 0;">
                    <i class="fas fa-box-open" style="font-size:3rem; color:#222; margin-bottom:15px;"></i>
                    <h2 style="color:#444;">No hay productos en la tienda aún</h2>
                </div>`;
            return;
        }

        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.imagen || ''}" class="product-img">
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
        grid.innerHTML = "<p>Error de conexión.</p>";
    });
}

document.addEventListener('DOMContentLoaded', renderMenu);