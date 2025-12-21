document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const salirPanel = document.getElementById('btn-salir-panel');
    
    // Simulación de sesión activa para pruebas
    const isLoggedIn = localStorage.getItem('sesionActiva') === 'true';

    if (isLoggedIn && authSection) {
        authSection.innerHTML = `
            <a href="panel.html" class="btn-nav">PANEL</a>
            <button id="logout-btn" class="btn-salir">SALIR</button>
        `;
        
        document.getElementById('logout-btn').onclick = () => {
            localStorage.setItem('sesionActiva', 'false');
            window.location.reload();
        };
    }

    if (salirPanel) {
        salirPanel.onclick = () => {
            localStorage.setItem('sesionActiva', 'false');
            window.location.href = 'index.html';
        };
    }
});