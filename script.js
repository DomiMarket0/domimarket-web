function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;
    
    // Detecta si hay sesión activa
    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        // --- VISTA LOGUEADO (Con Panel y Salir) ---
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a href="#" id="logout-btn" style="color: #ff4444; font-weight: 900; margin-left: 10px;">
                <i class="fas fa-sign-out-alt"></i> SALIR
            </a></li>
        `;

        // Configuración del botón salir
        document.getElementById('logout-btn').onclick = (e) => {
            e.preventDefault();
            localStorage.setItem('logged', 'false'); // Cierra sesión
            location.reload(); // Recarga para mostrar el menú de visitante
        };
    } else {
        // --- VISTA VISITANTE (Con Iniciar Sesión) ---
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}

// Asegúrate de que se ejecute al cargar la página
document.addEventListener('DOMContentLoaded', renderNav);