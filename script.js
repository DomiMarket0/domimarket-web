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
            renderUserMenu(user.username);
        } catch (e) {
            renderUserMenu('Usuario');
        }
    }
}

function renderUserMenu(username) {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;

    // Mantenemos tu diseño pero cambiamos el botón por SALIR
    nav.innerHTML = `
        <li><a href="index.html" style="color: white; text-decoration: none;">Inicio</a></li>
        <li><a href="#productos" style="color: white; text-decoration: none;">Productos</a></li>
        <li style="color: #5865F2; font-weight: bold;">${username}</li>
        <li><a href="#" id="logout-btn" class="btn-nav-login" style="background: red; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">SALIR</a></li>
    `;

    document.getElementById('logout-btn').onclick = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    };
}

document.addEventListener('DOMContentLoaded', handleDiscordLogin);