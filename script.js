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

// FUNCIÓN PARA EL MENÚ DINÁMICO
function cargarMenu() {
    const nav = document.getElementById('auth-nav');
    const logueado = localStorage.getItem('logged') === 'true';

    if (logueado) {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="dashboard.html" class="nav-item panel-active">Panel</a></li>
            <li><a href="#" id="salir" class="nav-item" style="color:red">Salir</a></li>
        `;
        document.getElementById('salir').onclick = () => {
            localStorage.setItem('logged', 'false');
            location.reload();
        };
    } else {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="login.html" style="background:red; color:white; padding:8px 15px; border-radius:5px; text-decoration:none;">INICIAR SESIÓN</a></li>
        `;
    }
}

// CARGA DE PRODUCTOS
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        if (snapshot.empty) {
            grid.innerHTML = "<p style='text-align:center; width:100%; color:#444;'>No hay productos aún.</p>";
            return;
        }
        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.imagen || ''}" style="width:100%; height:180px; background:#000;">
                    <div style="padding:20px;">
                        <h3>${p.nombre}</h3>
                        <p>${p.descripcion}</p>
                    </div>
                    <div class="action-bar">
                        <span>$${p.precio}</span>
                        <button class="btn-buy">COMPRAR</button>
                    </div>
                </div>
            `;
        });
    });
}

document.addEventListener('DOMContentLoaded', cargarMenu);