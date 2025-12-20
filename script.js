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

// Manejo del menú dinámico
function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return; // Seguridad por si el elemento no existe

    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a href="#" id="logout" style="color: #ff4444; font-weight: bold; margin-left: 10px;">SALIR</a></li>
        `;
        document.getElementById('logout').onclick = (e) => { 
            e.preventDefault();
            localStorage.setItem('logged', 'false'); 
            location.reload(); 
        };
    } else {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}

// Carga de productos desde Firebase
const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        
        // Si la base de datos está vacía, mostramos "Muestra" para mantener el diseño
        if (snapshot.empty) {
            for(let i=1; i<=3; i++) {
                grid.innerHTML += `
                <div class="product-card" data-aos="fade-up">
                    <div style="height:200px; background:#1a1a1a; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-code" style="font-size:3rem; color:#333;"></i>
                    </div>
                    <div class="product-info">
                        <h3>Script de Muestra ${i}</h3>
                        <p>Aún no hay scripts disponibles en la base de datos.</p>
                    </div>
                    <div class="action-panel">
                        <span class="price-tag">$0.00</span>
                        <button class="btn-buy">COMPRAR</button>
                    </div>
                </div>`;
            }
            return;
        }

        // Si hay productos reales en Firebase
        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card" data-aos="fade-up">
                    <img src="${p.imagen || 'logo.png'}" style="width:100%; height:200px; object-fit:cover;">
                    <div class="product-info">
                        <h3>${p.nombre}</h3>
                        <p>${p.descripcion}</p>
                    </div>
                    <div class="action-panel">
                        <span class="price-tag">$${p.precio}</span>
                        <button class="btn-buy">COMPRAR</button>
                    </div>
                </div>`;
        });
    }, (error) => {
        console.error("Error al cargar productos:", error);
        grid.innerHTML = "<p>Error al conectar con la tienda.</p>";
    });
}

document.addEventListener('DOMContentLoaded', renderNav);