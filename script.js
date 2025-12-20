function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;
    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        // Menu para usuario LOGUEADO
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="dashboard.html" class="panel-btn">PANEL</a></li>
            <li><a href="#" id="logout" style="color:red; font-weight:bold; margin-left:10px;">SALIR</a></li>
        `;
        document.getElementById('logout').onclick = () => { 
            localStorage.setItem('logged', 'false'); 
            location.reload(); 
        };
    } else {
        // Menu para usuario NO LOGUEADO (Visitante)
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}