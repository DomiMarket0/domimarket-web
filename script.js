const CLIENT_ID = '1438645485773652241';
const REDIRECT_URI = 'https://domimarket0.github.io/domimarket-web/';

function toggleMenu() {
    document.getElementById("dropdown-menu").classList.toggle("show");
}

function logout() {
    localStorage.removeItem('ds_token');
    window.location.href = 'index.html';
}

window.onload = () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    let token = params.get('access_token') || localStorage.getItem('ds_token');

    if (token) {
        localStorage.setItem('ds_token', token);
        window.history.replaceState({}, document.title, window.location.pathname);

        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('user-profile').style.display = 'block';

        fetch('https://discord.com/api/users/@me', {
            headers: { authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(user => {
            document.getElementById('user-name').innerText = user.username;
            const avatar = user.avatar 
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                : 'https://discord.com/assets/embed/avatars/0.png';
            document.getElementById('user-avatar').src = avatar;
        })
        .catch(() => logout());
    }
}

// Cerrar el menú si hacen clic fuera del botón rojo
window.onclick = function(event) {
    if (!event.target.matches('.user-active-btn') && !event.target.matches('.user-active-btn *')) {
        const dropdown = document.getElementById("dropdown-menu");
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
}