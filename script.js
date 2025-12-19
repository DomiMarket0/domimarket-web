const CLIENT_ID = '1438645485773652241'; 
const REDIRECT_URI = 'https://domimarket0.github.io/domimarket-web/';

// Función para abrir/cerrar el menú al hacer clic en el nombre
function toggleMenu() {
    document.getElementById("dropdown-menu").classList.toggle("show");
}

// Cerrar sesión: borra el token y recarga
function logout() {
    localStorage.removeItem('discord_token');
    window.location.href = 'index.html'; 
}

window.onload = () => {
    // 1. Verificamos si venimos regresando de Discord (traemos el token en la URL)
    const params = new URLSearchParams(window.location.hash.substring(1));
    let token = params.get('access_token');

    // 2. Si no está en la URL, buscamos si ya lo teníamos guardado en el navegador
    if (!token) {
        token = localStorage.getItem('discord_token');
    } else {
        localStorage.setItem('discord_token', token); // Lo guardamos si es nuevo
    }

    if (token) {
        // Mostrar perfil y ocultar botón de login
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('user-profile').style.display = 'block';

        // Opcional: Mostrar las secciones privadas
        document.getElementById('area-cliente').style.display = 'block';
        document.getElementById('tickets').style.display = 'block';
        document.getElementById('resenas').style.display = 'block';

        // Pedir a Discord los datos del usuario (Nombre y Foto)
        fetch('https://discord.com/api/users/@me', {
            headers: { authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if(data.username) {
                document.getElementById('user-name').innerText = data.username;
                // Si el usuario tiene avatar, lo ponemos, si no uno por defecto
                const avatarUrl = data.avatar 
                    ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
                    : 'https://discord.com/assets/embed/avatars/0.png';
                document.getElementById('user-avatar').src = avatarUrl;
            }
        })
        .catch(err => {
            console.error("Error obteniendo datos de Discord:", err);
            // Si el token expiró, cerramos sesión
            logout();
        });
    }
}

// Cerrar el menú si el usuario hace clic en cualquier otro lado de la pantalla
window.onclick = function(event) {
    if (!event.target.matches('.user-info-btn') && !event.target.matches('.user-info-btn *')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}