const CLIENT_ID = '1438645485773652241';

async function checkLogin() {
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
            
            // Cambiamos el botón por SALIR respetando tu diseño rojo
            const nav = document.getElementById('auth-nav');
            if (nav) {
                nav.innerHTML = `
                    <li><a href="index.html" style="color: white; text-decoration: none;">Inicio</a></li>
                    <li style="color: #5865F2; font-weight: bold;">${user.username}</li>
                    <li><a href="#" id="logout-btn" style="background: red; color: white; padding: 10px; border-radius: 5px; text-decoration: none; font-weight: bold;">SALIR</a></li>
                `;
                document.getElementById('logout-btn').onclick = () => {
                    localStorage.clear();
                    window.location.reload();
                };
            }
        } catch (e) { console.log("Error de token"); }
    }
}

document.addEventListener('DOMContentLoaded', checkLogin);