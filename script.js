const CLIENT_ID = '1438645485773652241';
const REDIRECT_URI = encodeURIComponent('https://domimarket0.github.io/domimarket-web/index.html');

async function handleDiscordLogin() {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    let accessToken = fragment.get('access_token') || localStorage.getItem('discord_token');

    if (accessToken) {
        localStorage.setItem('logged', 'true');
        localStorage.setItem('discord_token', accessToken);
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Obtener datos del usuario desde Discord
        try {
            const response = await fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const userData = await response.json();
            renderNav(userData);
        } catch (error) {
            console.error("Error al obtener datos de Discord", error);
            renderNav();
        }
    } else {
        renderNav();
    }
}

function renderNav(user = null) {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;

    if (user) {
        const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li class="user-info" style="display:flex; align-items:center; gap:10px; background:#222; padding:5px 15px; border-radius:50px; border: 1px solid #5865F2;">
                <img src="${avatarURL}" style="width:25px; border-radius:50%;">
                <span style="color:white; font-weight:bold;">${user.username}</span>
                <a href="#" id="logout-btn" style="color:#ff4444; font-size:0.8rem; text-decoration:none; margin-left:10px;">SALIR</a>
            </li>
        `;
        document.getElementById('logout-btn').onclick = (e) => {
            e.preventDefault();
            localStorage.clear();
            location.reload();
        };
    } else {
        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="login.html" class="btn-nav-login">INICIAR SESIÓN</a></li>
        `;
    }
}

document.addEventListener('DOMContentLoaded', handleDiscordLogin);