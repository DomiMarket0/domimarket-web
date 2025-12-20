function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;
    
    // Verificamos si el usuario está logueado en el almacenamiento local
    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        // --- VISTA CUANDO YA INICIÓ SESIÓN ---
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a href="#" id="logout-btn" style="color: #ff4444; font-weight: 900; margin-left: 10px;">
                <i class="fas fa-sign-out-alt"></i> SALIR
            </a></li>
        `;

        // Lógica para el botón SALIR
        document.getElementById('logout-btn').onclick = (e) => {
            e.preventDefault();
            localStorage.setItem('logged', 'false'); // Cambiamos el estado a falso
            location.href = 'index.html'; // Redirigimos al inicio
        };
    } else {
        // --- VISTA CUANDO NO HAY SESIÓN (Aparece Iniciar Sesión) ---
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}