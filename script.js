document.addEventListener('DOMContentLoaded', () => {
    const authZone = document.getElementById('auth-zone');
    // Para probar que funciona, simulamos login:
    const userActive = localStorage.getItem('domi_session') === 'true';

    if (userActive) {
        authZone.innerHTML = `
            <div class="user-controls">
                <a href="panel.html" class="btn-panel-link">PANEL</a>
                <button id="logout-trigger" class="btn-logout">SALIR <i class="fas fa-sign-out-alt"></i></button>
            </div>
        `;

        document.getElementById('logout-trigger').addEventListener('click', () => {
            localStorage.setItem('domi_session', 'false');
            window.location.href = 'index.html';
        });
    }
});