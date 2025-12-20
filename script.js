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
            console.error("Error cargando usuario");
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
        const avatar = user ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : '';

        nav.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li style="color:white; font-weight:bold; display:flex; align-items:center; gap:10px; background:#222; padding:5px 15px; border-radius:50px;">
                ${user ? `<img src="${avatar}" style="width:20px; border-radius:50%">` : ''}
                <span>${name}</span>
                <button id="logout-btn" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:5px; font-weight:bold; margin-left:10px;">SALIR</button>
            </li>
        `;
        document.getElementById('logout-btn').onclick = () => {
            localStorage.clear();
            window.location.href = 'index.html';
        };
    }
}

document.addEventListener('DOMContentLoaded', handleDiscordLogin);