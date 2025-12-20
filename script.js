// Dentro de tu onSnapshot, usa este formato de tarjeta:
grid.innerHTML += `
    <div class="product-card">
        <img src="${p.imagen || 'https://via.placeholder.com/300x150?text=Premium+Script'}" style="width:100%; border-radius:8px;">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <span class="price">$${p.precio}</span>
        <button class="btn-buy">COMPRAR AHORA</button>
    </div>`;