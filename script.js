const CLIENT_ID = '1438645485773652241';
const REDIRECT_URI = encodeURIComponent('https://domimarket0.github.io/domimarket-web/index.html');

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
    } else {
        renderNav(null);
    }
}

function renderNav(user) {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;

    if (user || localStorage.getItem('logged') === 'true') {
        const name = user ? user.username : 'Conectado';
        // Usamos etiquetas limpias para evitar que se mueva el diseño del menú
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li style="display:inline-flex; align-items:center; gap:10px; margin-left:15px;">
                <span style="color:#5865F2; font-weight:bold;">${name}</span>
                <button id="logout-btn" style="background:#ff0000; color:white; border:none; padding:8px 15px; cursor:pointer; border-radius:5px; font-weight:bold; font-family:'Poppins',sans-serif;">SALIR</button>
            </li>
        `;
        document.getElementById('logout-btn').onclick = () => {
            localStorage.clear();
            window.location.href = 'index.html';
        };
    }
}

document.addEventListener('DOMContentLoaded', handleDiscordLogin);