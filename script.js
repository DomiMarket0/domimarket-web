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

function renderNav() {
    const nav = document.getElementById('auth-nav');
    const isLogged = localStorage.getItem('logged') === 'true';
    let menu = `<li><a href="index.html">Inicio</a></li><li><a href="#productos">Productos</a></li>`;
    
    if (isLogged) {
        menu += `<li><a id="btn-logout" class="logout-link">SALIR</a></li>`;
    } else {
        menu += `<li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>`;
    }
    nav.innerHTML = menu;

    if (isLogged) {
        document.getElementById('btn-logout').onclick = () => {
            localStorage.setItem('logged', 'false');
            location.reload();
        };
    }
}

const grid = document.getElementById('grid-productos');
onSnapshot(collection(db, "productos"), (snapshot) => {
    grid.innerHTML = "";
    if (snapshot.empty) {
        grid.innerHTML = "<p>No hay scripts disponibles actualmente.</p>";
        return;
    }
    snapshot.forEach((doc) => {
        const p = doc.data();
        grid.innerHTML += `
            <div class="product-card">
                <div style="height:150px; background:#1a1a1a; border-radius:8px; margin-bottom:15px; display:flex; align-items:center; justify-content:center;">
                    <img src="${p.imagen || ''}" style="max-width:100%; max-height:100%; border-radius:8px;">
                </div>
                <h3>${p.nombre}</h3>
                <p style="color:#aaa; font-size:0.9rem;">${p.descripcion || 'Script premium.'}</p>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span class="price">$${p.precio}</span>
                    <button class="btn-buy" onclick="window.open('https://discord.gg/TU_LINK')">COMPRAR</button>
                </div>
            </div>`;
    });
});

document.addEventListener('DOMContentLoaded', renderNav);DOMContentLoaded', renderNav);