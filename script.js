// Busca la parte donde se generan las tarjetas (el innerHTML) y reemplázalo por esto:
grid.innerHTML += `
    <div class="product-card" data-aos="fade-up">
        <div class="product-img-container">
            <img src="${p.imagen || 'logo.png'}" class="product-img">
            <div class="img-overlay"></div>
        </div>
        <div class="product-info">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
        </div>
        <div class="product-action-bar">
            <div class="action-left">
                <a href="#" class="btn-details"><i class="fas fa-info-circle"></i> DETALLES</a>
            </div>
            <div class="action-right">
                <span class="price-tag">$${p.precio}</span>
                <button class="btn-buy-now">COMPRAR</button>
            </div>
        </div>
    </div>`;