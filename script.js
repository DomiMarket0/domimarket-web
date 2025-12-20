// Configuración con tu ID de aplicación
const CLIENT_ID = '1438645485773652241';
const REDIRECT_URI = encodeURIComponent(window.location.origin + '/index.html');
// Esta es la URL que Discord reconoce para autorizar
const DISCORD_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;

function handleDiscordLogin() {
    // Revisamos si en la URL viene el token de Discord (#access_token=...)
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = fragment.get('access_token');

    if (accessToken) {
        localStorage.setItem('logged', 'true');
        localStorage.setItem('discord_token', accessToken);
        // Limpiamos la URL para que no se vea el token
        window.history.replaceState({}, document.title, "/");
        renderNav();
    }
}

function renderNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;
    const isLogged = localStorage.getItem('logged') === 'true';

    if (isLogged) {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="#" id="logout" class="btn-nav-login" style="background:#5865F2;">CERRAR SESIÓN</a></li>
        `;
        document.getElementById('logout').onclick = (e) => {
            e.preventDefault();
            localStorage.clear();
            location.reload();
        };
    } else {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="${DISCORD_URL}" class="btn-nav-login" style="background:#5865F2;">
                <i class="fab fa-discord"></i> ENTRAR CON DISCORD
            </a></li>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    handleDiscordLogin();
    renderNav();
});