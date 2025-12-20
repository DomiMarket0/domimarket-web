// CONFIGURACIÓN DE REDIRECCIÓN PRO
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
                // SI ESTÁ EN EL INDEX, MANDARLO AL PANEL AUTOMÁTICAMENTE
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    window.location.href = 'panel.html';
                }
                // Si ya está en el panel, solo renderizar su nombre
                if (typeof renderLoggedUI === 'function') {
                    renderLoggedUI(data.username);
                }
            }
        } catch (error) {
            localStorage.removeItem('domi_token');
        }
    }
}

document.addEventListener('DOMContentLoaded', syncUserAuth);