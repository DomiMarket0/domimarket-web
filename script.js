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

// --- Productos de ejemplo e interacción ---
const sampleProducts = [
    { id: 1, title: 'Paquete VIP MTA:SA', desc: 'Acceso premium y recursos exclusivos.', price: '$4.99', img: 'https://picsum.photos/seed/p1/600/400' },
    { id: 2, title: 'Script personalizado', desc: 'Script listo para integrar en tu servidor.', price: '$9.99', img: 'https://picsum.photos/seed/p2/600/400' },
    { id: 3, title: 'Soporte 24/7', desc: 'Asistencia técnica prioritaria por ticket.', price: '$2.99', img: 'https://picsum.photos/seed/p3/600/400' },
    { id: 4, title: 'Claves y licencias', desc: 'Licencias instantáneas y entrega automática.', price: '$6.99', img: 'https://picsum.photos/seed/p4/600/400' }
];

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    sampleProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.title}" class="product-thumb">
            <div class="product-title">${p.title}</div>
            <div class="product-desc">${p.desc}</div>
            <div class="product-row">
                <div class="price">${p.price}</div>
                <button class="btn-buy" data-id="${p.id}">Comprar</button>
            </div>
        `;
        grid.appendChild(card);
    });

    // Attach buy handlers
    grid.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const prod = sampleProducts.find(x => String(x.id) === String(id));
            if (prod) showProductModal(prod);
        });
    });
}

function showProductModal(prod) {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeModal()"></div>
        <div class="modal-card">
            <button class="modal-close" onclick="closeModal()">×</button>
            <img src="${prod.img}" alt="${prod.title}">
            <h3 style="color:#fff; margin-bottom:6px">${prod.title}</h3>
            <p style="color:#bfbfbf; margin-bottom:12px">${prod.desc}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:12px">
                <div class="price">${prod.price}</div>
                <button class="btn-buy" onclick="purchase(${prod.id})">Comprar ahora</button>
            </div>
        </div>
    `;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.innerHTML = '';
    modal.setAttribute('aria-hidden', 'true');
}

function purchase(id) {
    const prod = sampleProducts.find(x => x.id === id);
    if (!prod) return alert('Producto no encontrado');
    // Aquí pondrías la integración con pago/checkout
    alert(`Has iniciado la compra: ${prod.title} — ${prod.price}`);
    closeModal();
}

// Inicializar renderizado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});