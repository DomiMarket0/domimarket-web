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
const grid = document.getElementById('grid-productos');

// CARGA REAL DE FIREBASE
onSnapshot(collection(db, "productos"), (snapshot) => {
    grid.innerHTML = "";
    if (snapshot.empty) {
        grid.innerHTML = "<h3>No hay productos en la base de datos. Agrégalos desde el Panel.</h3>";
        return;
    }
    snapshot.forEach((doc) => {
        const p = doc.data();
        grid.innerHTML += `
            <div class="card">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion || ''}</p>
                <span class="price">$${p.precio}</span>
                <button style="float:right">COMPRAR</button>
            </div>`;
    });
});