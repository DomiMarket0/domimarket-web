const CLIENT_ID = '1438645485773652241';

async function handleAuth() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('access_token') || localStorage.getItem('discord_token');

    if (token) {
        localStorage.setItem('discord_token', token);
        window.history.replaceState({}, document.title, window.location.pathname);
        
        try {
            const response = await fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = await response.json();
            
            const nav = document.getElementById('auth-nav');
            if (nav) {
                // Reemplazamos el menú para poner tu nombre y el botón de SALIR
                nav.innerHTML = `
                    <li><a href="index.html" style="color: white; text-decoration: none;">Inicio</a></li>
                    <li style="color: #5865F2; font-weight: bold;">${user.username}</li>
                    <li><a href="#" id="logout-btn" class="btn-red">SALIR</a></li>
                `;
                
                document.getElementById('logout-btn').onclick = () => {
                    localStorage.clear();
                    window.location.reload();
                };
            }
        } catch (err) { console.error("Error al conectar con Discord"); }
    }
}

document.addEventListener('DOMContentLoaded', handleAuth);