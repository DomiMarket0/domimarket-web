:root {
    --primary: #ff0000;
    --primary-hover: #cc0000;
    --dark-bg: #0b0b0b;
    --card-bg: #141414;
    --text-gray: #b3b3b3;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background-color: var(--dark-bg);
    color: white;
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
}

/* Navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 8%;
    background: rgba(0, 0, 0, 0.9);
    border-bottom: 1px solid #222;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.logo-container { display: flex; align-items: center; font-weight: 800; font-size: 1.2rem; }
.logo { height: 40px; margin-right: 10px; }
.red-text { color: var(--primary); }

.nav-links { display: flex; list-style: none; }
.nav-links li a { color: white; text-decoration: none; margin: 0 15px; font-size: 0.9rem; transition: 0.3s; }
.nav-links li a:hover { color: var(--primary); }

.discord-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
}

/* Hero Section */
.hero {
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: radial-gradient(circle at center, rgba(255, 0, 0, 0.15) 0%, transparent 70%);
}

.hero h1 { font-size: 3.5rem; margin-bottom: 10px; }
.highlight { color: var(--primary); text-shadow: 0 0 20px rgba(255, 0, 0, 0.4); }

.btn-main { background: var(--primary); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-right: 10px; font-weight: bold; }
.btn-sec { border: 1px solid #444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }

/* Stats */
.stats { display: flex; justify-content: space-around; padding: 40px 10%; background: #080808; border-top: 1px solid #111; }
.stat-item h3 { color: var(--primary); font-size: 2rem; }

/* Productos */
.container { padding: 60px 8%; }
.section-title { font-size: 2rem; margin-bottom: 40px; text-align: center; }

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.product-card {
    background: var(--card-bg);
    border-radius: 12px;
    border: 1px solid #222;
    overflow: hidden;
    transition: 0.4s;
}

.product-card:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 0, 0, 0.1);
}

.product-img-container { background: #1a1a1a; padding: 40px; text-align: center; }
.product-img-container img { width: 100px; }

.product-info { padding: 20px; }
.product-info h3 { margin-bottom: 10px; }
.product-info p { color: var(--text-gray); font-size: 0.9rem; margin-bottom: 20px; }

.product-footer { display: flex; justify-content: space-between; align-items: center; }
.price { color: var(--primary); font-weight: 800; font-size: 1.2rem; }

.buy-btn {
    background: transparent;
    border: 1px solid var(--primary);
    color: white;
    padding: 8px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.buy-btn:hover { background: var(--primary); }