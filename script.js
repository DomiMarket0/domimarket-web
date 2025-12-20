const CLIENT_ID = '1438645485773652241';

async function handleDiscordLogin() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const token = fragment.get('access_token') || localStorage.getItem('discord_token');

    if (token) {
        localStorage.setItem('discord_token', token);
        window.history.replaceState({}, document.title, window.location.pathname);
        
        try {
            const resp = await fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = await resp.json();
            updateMenu(user.username);
        } catch (e) {
            updateMenu('Usuario');
        }
    }
}

function updateMenu(username) {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;

    // Cambiamos el botón respetando tu diseño original de lista
    nav.innerHTML = `
        <li><a href="index.html">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
        <li style="color:white; font-weight:bold; margin: 0 10px;">${username}</li>
        <li><a href="#" id="logout-btn" class="btn-nav-login" style="background:red !important;">SALIR</a></li>
    `;

    document.getElementById('logout-btn').onclick = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    };
}

document.addEventListener('DOMContentLoaded', handleDiscordLogin);