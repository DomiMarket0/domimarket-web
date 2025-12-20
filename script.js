const CLIENT_ID = '1438645485773652241';

async function handleDiscordLogin() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const token = fragment.get('access_token') || localStorage.getItem('discord_token');

    if (token) {
        localStorage.setItem('discord_token', token);
        localStorage.setItem('logged', 'true');
        window.history.replaceState({}, document.title, window.location.pathname);
        
        try {
            const resp = await fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = await resp.json();
            renderNav(user);
        } catch (e) {
            renderNav({ username: 'Usuario' });
        }
    }
}

function renderNav(user) {
    const nav = document.getElementById('auth-nav');
    if (!nav || !user) return;

    // Respetamos tu diseño de lista y el botón rojo original
    nav.innerHTML = `
        <li><a href="index.html">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
        <li style="color:white; margin-left:15px; font-weight:bold;">${user.username}</li>
        <li><a href="#" id="logout-btn" class="btn-nav-login" style="background:red !important;">SALIR</a></li>
    `;

    document.getElementById('logout-btn').onclick = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    };
}

document.addEventListener('DOMContentLoaded', handleDiscordLogin);