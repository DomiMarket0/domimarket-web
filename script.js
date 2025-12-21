document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-section');
    // Simulamos que el usuario 'jhonarkks' está logueado
    const user = localStorage.getItem('userLogueado') || "jhonarkks"; 

    if (user) {
        // Si está logueado, mostramos el acceso al PANEL y el botón SALIR
        authContainer.innerHTML = `
            <a href="panel.html" class="btn-nav">PANEL</a>
            <a href="#" id="logout-btn" class="btn-nav salir">SALIR</a>
        `;

        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userLogueado');
            window.location.href = 'index.html';
        });
    }
});