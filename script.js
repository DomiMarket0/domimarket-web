// CONFIGURACIÓN EMPRESARIAL DOMIMARKET
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        // Efecto de desvanecimiento profesional
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// SEGURIDAD: Si el loader falla, forzar el cierre en 3 segundos
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none';
    }
}, 3000);

// LÓGICA DE USUARIO Y REDIRECCIÓN
async function syncUserAuth() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    let token = params.get('access_token') || localStorage.getItem('domi_token');

    if (token) {
        localStorage.setItem('domi_token', token);
        try {
            const response = await fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            
            if (data.username) {
                // Si estamos en el index y ya hay sesión, mostrar botones de Panel
                renderLoggedUI(data.username);
            }
        } catch (error) {
            console.error("Error de autenticación");
            localStorage.removeItem('domi_token');
        }
    }
}

function renderLoggedUI(username) {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;

    authContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="color: #5865F2; font-weight: 800; font-size: 0.8rem;">
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