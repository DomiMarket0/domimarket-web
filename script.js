// Configuración Global
const CLIENT_ID = '1438645485773652241';
const REDIRECT_URI = encodeURIComponent('https://domimarket0.github.io/domimarket-web/index.html');
const DISCORD_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;

// 1. Manejar la respuesta de Discord (cuando el usuario vuelve con el token)
function handleDiscordLogin() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = fragment.get('access_token');

    if (accessToken) {
        localStorage.setItem('logged', 'true');
        localStorage.setItem('discord_token', accessToken);
        // Limpiamos el token de la URL para que quede limpia
        window.history.replaceState({}, document.title, window.location.pathname);
        renderNav();
    }
}

// 2. Dibujar los botones del Menú dinámicamente
function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return; // Si no hay nav en el HTML, no hace nada

    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="#" id="logout-btn" class="btn-nav-login" style="background: #ff0000; box-shadow: 0 0 15px rgba(255,0,0,0.4);">SALIR</a></li>
        `;
        
        document.getElementById('logout-btn').onclick = (e) => {
            e.preventDefault();
            localStorage.clear(); // Borra la sesión
            location.reload();    // Recarga la página
        };
    } else {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}

// 3. Iniciar todo cuando cargue el documento
document.addEventListener('DOMContentLoaded', () => {
    handleDiscordLogin();
    renderNav();
});