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
            
            // Si el usuario está logueado, cambiamos el botón
            const authSection = document.getElementById('auth-button');
            if (authSection) {
                authSection.innerHTML = `
                    <span style="color: #5865F2; font-weight: bold; margin-right: 15px;">${user.username}</span>
                    <a href="#" id="logout-btn" class="btn-auth" style="background: #ff0000;">SALIR</a>
                `;
                
                document.getElementById('logout-btn').onclick = (e) => {
                    e.preventDefault();
                    localStorage.clear();
                    window.location.href = 'index.html';
                };
            }
        } catch (err) {
            localStorage.removeItem('discord_token');
        }
    }
}

document.addEventListener('DOMContentLoaded', handleAuth);