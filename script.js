// CONFIGURACIÓN: Pon aquí tu Client ID de Discord
const CLIENT_ID = 'TU_CLIENT_ID_AQUÍ'; 
const REDIRECT_URI = 'https://domimarket0.github.io/domimarket-web/';

function checkLogin(producto) {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');

    if (!token) {
        alert("¡Atención! Para comprar " + producto + " debes vincular tu cuenta de Discord primero.");
        window.location.href = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&scope=identify&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    } else {
        // Aquí pones tu link de pago (PayPal o lo que uses)
        alert("¡Usuario verificado! Redirigiendo al pago de " + producto);
        window.location.href = "TU_LINK_DE_PAYPAL_O_PAGO";
    }
}

// Al cargar la página, ver si ya volvió de Discord
window.onload = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    if (params.get('access_token')) {
        document.getElementById('login-btn').innerText = "✅ Cuenta Vinculada";
        document.getElementById('login-btn').style.background = "#2ecc71";
    }
}