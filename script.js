const CLIENT_ID = '1438645485773652241';

async function syncUserAuth() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    let token = params.get('access_token') || localStorage.getItem('domi_token');

    if (token) {
        localStorage.setItem('domi_token', token);
        window.history.replaceState({}, document.title, window.location.pathname);

        try {
            const response = await fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            
            if (data.username) {
                // REDIRECCIÓN: Si el usuario acaba de loguear y está en el index, enviarlo al panel
                if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
                    if (params.get('access_token')) {
                        window.location.href = 'panel.html';
                        return;
                    }
                }
                renderLoggedUI(data.username);
            }
        } catch (error) {
            localStorage.removeItem('domi_token');
        }
    }
}

function renderLoggedUI(username) {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;

    authContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px; animation: fadeIn 0.8s ease;">
            <span style="color: #5865F2; font-weight: 800; font-size: 0.9rem;">
                <i class="fab fa-discord"></i> ${username.toUpperCase()}
            </span>
            <a href="panel.html" class="btn-panel-neon">PANEL</a>
            
            <button onclick="handleLogout()" class="btn-logout">SALIR</button>
        </div>
    `;
}

function handleLogout() {
    localStorage.removeItem('domi_token');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', syncUserAuth);