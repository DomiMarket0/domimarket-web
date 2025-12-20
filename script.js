// SIMULACIÓN DE LOGIN (Esto se activa al conectar Discord)
let isLoggedIn = localStorage.getItem('logged') === 'true';

const nav = document.getElementById('auth-nav');

function renderNav() {
    if (isLoggedIn) {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="#productos" class="nav-item">Productos</a></li>
            <li><a href="dashboard.html" class="nav-item active">Panel</a></li>
            <li><a href="#" class="nav-item logout" onclick="logout()">Salir</a></li>
        `;
    } else {
        nav.innerHTML = `
            <li><a href="index.html" class="nav-item">Inicio</a></li>
            <li><a href="login.html" class="nav-item">INICIAR SESIÓN</a></li>
        `;
    }
}

window.logout = () => {
    localStorage.setItem('logged', 'false');
    location.reload();
};

renderNav();