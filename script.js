// Función para mostrar/ocultar el menú del usuario (si está logueado)
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('active');
}

// Cerrar el menú si se hace clic fuera
window.onclick = function(event) {
    if (!event.target.closest('.user-menu')) {
        const dropdowns = document.getElementsByClassName("menu-box");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('active');
        }
    }
}

// Ejemplo de función para cerrar sesión
function logout() {
    alert("Cerrando sesión...");
    // Aquí iría la lógica para borrar cookies/sesión
    location.reload();
}

// Desplazamiento suave adicional (opcional, ya lo hace el CSS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});