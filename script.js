// Función para manejar el menú dinámico
function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return; // Si no encuentra el nav, no hace nada

    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        // Si está logueado, mostramos esto:
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="dashboard.html" style="color: #ff0000; font-weight: bold;">PANEL</a></li>
            <li><a href="#" id="logout-btn" class="btn-nav-login" style="background: #333;">SALIR</a></li>
        `;
        
        // Lógica para cerrar sesión
        document.getElementById('logout-btn').onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('logged'); // Quitamos la marca de login
            window.location.href = "index.html"; // Recargamos
        };
    } else {
        // Si NO está logueado, mostramos esto:
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}

// Ejecutar la función cuando cargue la página
document.addEventListener('DOMContentLoaded', renderNav);