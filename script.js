document.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.getElementById('btn-auth');
    const user = localStorage.getItem('userLogueado');

    if (user) {
        // Si hay usuario, ponemos el botón de SALIR
        authBtn.innerHTML = 'SALIR <i class="fas fa-sign-out-alt"></i>';
        authBtn.href = '#';
        authBtn.classList.add('btn-salir');
        
        authBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userLogueado');
            window.location.reload(); // Recarga para volver a "Iniciar Sesión"
        });
    }
});