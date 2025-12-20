// --- SISTEMA DE CARGA Y SEGURIDAD ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
    }
});

// --- AUTENTICACIÓN EMPRESARIAL ---
async function checkAuth() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    let token = params.get('access_token') || localStorage.getItem('domi_token');

    if (token) {
        localStorage.setItem('domi_token', token);
        try {
            const resp = await fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = await resp.json();
            if (user.username) {
                // Si el usuario acaba de entrar, enviarlo al Panel
                if (window.location.pathname.includes('index.html') && params.get('access_token')) {
                    window.location.href = 'panel.html';
                }
                updateUI(user.username);
            }
        } catch (e) { localStorage.removeItem('domi_token'); }
    }
}

function updateUI(name) {
    const container = document.getElementById('auth-container');
    if (container) {
        container.innerHTML = `
            <div style="display: flex; align-items: center; gap: 20px;">
                <span class="accent-neon"><i class="fab fa-discord"></i> ${name.toUpperCase()}</span>
                <a href="panel.html" class="btn-main" style="background:var(--accent); color:#000;">PANEL</a>
                <button onclick="logout()" style="background:none; border:none; color:red; cursor:pointer; font-weight:800;">SALIR</button>
            </div>
        `;
    }
}

function logout() { localStorage.removeItem('domi_token'); window.location.href = 'index.html'; }
document.addEventListener('DOMContentLoaded', checkAuth);