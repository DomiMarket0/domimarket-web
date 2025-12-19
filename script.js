// Configuración de Discord
const CLIENT_ID = '1438645485773652241'; 
const REDIRECT_URI = 'https://domimarket0.github.io/domimarket-web/';

// Función para mandar al usuario a autorizarse con Discord
function loginDiscord() {
    const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&scope=identify&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = url;
}

// Función que revisa si el usuario ya está logueado al intentar comprar
function processPurchase(link, productName) {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');

    if (!token) {
        alert(`¡Atención! Para comprar "${productName}" debes vincular tu Discord primero.`);
        loginDiscord();
    } else {
        // Si ya está logueado, lo mandas al link de pago
        alert("¡Cuenta verificada con éxito! Redirigiendo...");
        window.location.href = link;
    }
}

// Esto se ejecuta solo al cargar la página para ver si el usuario acaba de volver de Discord
window.onload = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');

    if (token) {
        const btn = document.getElementById('login-btn');
        if (btn) {
            btn.innerText = "✅ Cuenta Vinculada";
            btn.style.background = "#2ecc71"; // Se pone verde
            btn.onclick = null; // Desactiva el click para que no reinicie el login
        }
        console.log("Usuario autenticado con éxito.");
    }
}