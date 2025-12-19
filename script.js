// CONFIGURACIÓN DE DOMIMARKET
const CLIENT_ID = '1438645485773652241'; // Tu ID aplicado
const REDIRECT_URI = window.location.origin + window.location.pathname;

function loginWithDiscord() {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`;
    window.location.href = url;
}

// ... resto del código que te pasé antes