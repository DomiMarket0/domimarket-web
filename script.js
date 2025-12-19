const CLIENT_ID = '1438645485773652241'; 
const REDIRECT_URI = 'https://domimarket0.github.io/domimarket-web/';

function loginDiscord() {
    // Redirige a la autorización oficial de Discord
    window.location.href = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&scope=identify&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
}

function processPurchase(link, productName) {
    const token = new URLSearchParams(window.location.hash.substring(1)).get('access_token');

    if (!token) {
        alert(`Debes iniciar sesión con Discord para comprar: ${productName}`);
        window.location.href = 'login.html';
    } else {
        window.location.href = link;
    }
}

window.onload = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');

    if (token) {
        const btn = document.getElementById('login-btn');
        if (btn) {
            btn.innerText = "✅ Conectado";
            btn.style.background = "#2ecc71";
            btn.href = "#";
        }
    }
}