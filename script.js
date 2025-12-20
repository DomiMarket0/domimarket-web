function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;
    
    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        // VISTA LOGUEADO: Mantiene todo + PANEL + SALIR
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a href="#" id="logout-btn" style="color: #ff4444; font-weight: 900; margin-left: 10px;">
                <i class="fas fa-sign-out-alt"></i> SALIR
            </a></li>
        `;

        document.getElementById('logout-btn').onclick = (e) => {
            e.preventDefault();
            localStorage.setItem('logged', 'false');
            location.reload(); 
        };
    } else {
        // VISTA VISITANTE: Mantiene todo + INICIAR SESIÓN
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', renderNav);