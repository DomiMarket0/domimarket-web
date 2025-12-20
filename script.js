// CONFIGURACIÓN DE DISCORD
const CLIENT_ID = '1438645485773652241';

async function syncUserAuth() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    let token = params.get('access_token') || localStorage.getItem('domi_token');

    if (token) {
        localStorage.setItem('domi_token', token);
        // Limpiar URL
        window.history.replaceState({}, document.title, window.location.pathname);

        try {
            const response = await fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            
            if (data.username) {
                renderLoggedUI(data.username);
            }
        } catch (error) {
            console.error("Token expirado o inválido");
            localStorage.removeItem('domi_token');
        }
    }
}

function renderLoggedUI(username) {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;

    // Cambiamos el botón respetando el diseño profesional
    authContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="color: #5865F2; font-weight: 800; font-size: 0.9rem;">
                <i class="fab fa-discord"></i> ${username.toUpperCase()}
            </span>
            <button onclick="handleLogout()" class="btn-primary" style="background: #ff0000; box-shadow: 0 0 15px rgba(255,0,0,0.5);">SALIR</button>
        </div>
    `;
}

function handleLogout() {
    localStorage.removeItem('domi_token');
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', syncUserAuth);