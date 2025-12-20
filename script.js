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



// Manejo del menú

function renderNav() {

    const nav = document.getElementById('auth-nav');

    const isLogged = localStorage.getItem('logged') === 'true';



    if (isLogged) {

        nav.innerHTML = `

            <li><a href="index.html" class="nav-item">Inicio</a></li>

            <li><a href="dashboard.html" class="nav-item panel-btn">PANEL</a></li>

            <li><a href="#" id="logout" class="nav-item" style="color:red">SALIR</a></li>

        `;

        document.getElementById('logout').onclick = () => { localStorage.setItem('logged', 'false'); location.reload(); };

    } else {

        nav.innerHTML = `

            <li><a href="index.html" class="nav-item">Inicio</a></li>

            <li><a href="login.html" class="nav-item" style="background:red; padding:10px 20px; border-radius:5px;">INICIAR SESIÓN</a></li>

        `;

    }

}



// Carga de productos

const grid = document.getElementById('grid-productos');

if (grid) {

    onSnapshot(collection(db, "productos"), (snapshot) => {

        grid.innerHTML = "";

       

        // Si está vacío, mostramos productos "Demo" para que no se vea mal

        if (snapshot.empty) {

            for(let i=1; i<=3; i++) {

                grid.innerHTML += `

                <div class="product-card">

                    <div style="height:200px; background:#222; display:flex; align-items:center; justify-content:center;">

                        <i class="fas fa-image" style="font-size:3rem; color:#444;"></i>

                    </div>

                    <div style="padding:20px;">

                        <h3>Producto de Muestra ${i}</h3>

                        <p>Este es un espacio reservado para tus productos de Firebase.</p>

                    </div>

                    <div class="action-panel">

                        <span style="font-weight:bold; color:#2ecc71;">$0.00</span>

                        <button class="btn-buy">COMPRAR</button>

                    </div>

                </div>`;

            }

            return;

        }



        // Si hay productos reales, los cargamos

        snapshot.forEach((doc) => {

            const p = doc.data();

            grid.innerHTML += `

                <div class="product-card">

                    <img src="${p.imagen || ''}" style="width:100%; height:200px; object-fit:cover;">

                    <div style="padding:20px;">

                        <h3>${p.nombre}</h3>

                        <p>${p.descripcion}</p>

                    </div>

                    <div class="action-panel">

                        <span style="font-weight:bold; color:#2ecc71;">$${p.precio}</span>

                        <button class="btn-buy">COMPRAR</button>

                    </div>

                </div>`;

        });

    });

}



document.addEventListener('DOMContentLoaded', renderNav)