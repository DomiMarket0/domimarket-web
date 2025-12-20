function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;
    
    // Detecta si el valor es exactamente la cadena 'true'
    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        // VISTA CON SESIÓN ACTIVA
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a href="#" id="logout-btn" style="color: #ff4444; font-weight: 900; margin-left: 10px;">
                <i class="fas fa-sign-out-alt"></i> SALIR
            </a></li>
        `;

        // Lógica para cerrar sesión
        document.getElementById('logout-btn').onclick = (e) => {
            e.preventDefault();
            localStorage.setItem('logged', 'false'); // Cambia el estado
            location.reload(); // Recarga la página para aplicar cambios
        };
    } else {
        // VISTA SIN SESIÓN
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}

// Ejecución obligatoria al cargar el DOM
document.addEventListener('DOMContentLoaded', renderNav);