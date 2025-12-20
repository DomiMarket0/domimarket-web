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
    
    // Verificación real de sesión
    const isLogged = localStorage.getItem('logged') === 'true';

    // Siempre incluimos Inicio, Productos y Contacto para que no desaparezcan
    let menuHTML = `
        <li><a href="index.html">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
        <li><a href="#contacto">Contacto</a></li>
    `;

    if (isLogged) {
        menuHTML += `
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a href="#" id="logout-btn" class="logout-link">SALIR</a></li>
        `;
    } else {
        menuHTML += `
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }

    nav.innerHTML = menuHTML;

    // Asignar evento de salida si el botón existe
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.setItem('logged', 'false');
            location.reload(); // Recarga para actualizar el menú al instante
        };
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', renderNav);