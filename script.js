document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    // Verifica si el usuario inició sesión
    const isLoggedIn = localStorage.getItem('sesionActiva') === 'true';

    if (isLoggedIn) {
        authSection.innerHTML = `
            <a href="panel.html" class="btn-nav">PANEL</a>
            <button id="btn-salir" class="btn-salir">SALIR</button>
        `;

        document.getElementById('btn-salir').onclick = () => {
            localStorage.setItem('sesionActiva', 'false');
            window.location.reload();
        };
    }
});