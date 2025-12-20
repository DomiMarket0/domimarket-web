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
    if (!nav) return;
    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a href="#" id="logout" style="color:red; font-weight:bold;">SALIR</a></li>
        `;
        document.getElementById('logout').onclick = () => { localStorage.setItem('logged', 'false'); location.reload(); };
    } else {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="login.html" style="background:red; padding:10px 20px; border-radius:5px; font-weight:bold;">INICIAR SESIÓN</a></li>
        `;
    }
}

const grid = document.getElementById('grid-productos');
if (grid) {
    onSnapshot(collection(db, "productos"), (snapshot) => {
        grid.innerHTML = "";
        
        if (snapshot.empty) {
            for(let i=1; i<=3; i++) {
                grid.innerHTML += `
                <div class="product-card" data-aos="fade-up">
                    <div style="height:200px; background:#1a1a1a;"></div>
                    <div class="product-info">
                        <h3>Script Demo ${i}</h3>
                        <p>Descripción profesional de un script premium para tu servidor.</p>
                    </div>
                    <div class="product-action-bar">
                        <a href="#" class="btn-details">DETALLES</a>
                        <div class="action-right">
                            <span class="price-tag">$0.00</span>
                            <button class="btn-buy-now">COMPRAR</button>
                        </div>
                    </div>
                </div>`;
            }
            return;
        }

        snapshot.forEach((doc) => {
            const p = doc.data();
            grid.innerHTML += `
                <div class="product-card" data-aos="fade-up">
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