/**
🧴 Shupz - Centralized Product Data & Utilities
📁 Recommended Path: /shupz/js/products-shupz.js
🔗 Usage: Include this exact script on BOTH Hive Times & Shupz pages.
✅ Edit the RAW_PRODUCTS array below → Auto-syncs across all linked sites.
*/
(function () {
// 📌 ASSET CONFIGURATION
const CONFIG = {
    basePath: "/shupz",
    imageDir: "/images",
    fallbackImage: "/images/logo.jpg",
    businessName: "Shupz",
    businessLogo: "/images/logo.png"
};

// 📦 RAW PRODUCT DATA - ✏️ EDIT THIS ARRAY TO UPDATE EVERYWHERE
const RAW_PRODUCTS = [
    // === 🧴 DISHWASHING LIQUID (category: "dishwashing-liquid") ===
    { 
        id: "dishwashingliquid150ml", 
        name: "Dishwashing Liquid 750ml", 
        price: 17.00, 
        category: "dishwashing-liquid", 
        description: "Effective dishwashing liquid for everyday use. 750ml bottle.", 
        badge: "💰 Budget Friendly" 
    },
    { 
        id: "dishwashingliquid5l", 
        name: "Dishwashing Liquid 5L", 
        price: 75.00, 
        category: "dishwashing-liquid", 
        description: "Bulk 5-liter container of powerful dishwashing liquid. Great value!", 
        badge: "🔥 Best Seller" 
    },

    // === 🧼 LAUNDRY & CLEANING (category: "laundry-cleaning") ===
    { 
        id: "tilecleaner5l", 
        name: "Laundry Detergent 5L", 
        price: 95.00, 
        category: "laundry-cleaning", 
        description: "Premium 5-liter laundry detergent for fresh, clean clothes.", 
        badge: "🔥 Best Seller" 
    },
    { 
        id: "tilecleaner5l2", 
        name: "Tile Cleaner 5L", 
        price: 85.00, 
        category: "laundry-cleaning", 
        description: "Professional-grade tile cleaner. 5-liter container for sparkling floors.", 
        badge: "✨ Value Pack" 
    },
    { 
        id: "thinbleach5l", 
        name: "Thin Bleach 5L", 
        price: 60.00, 
        category: "laundry-cleaning", 
        description: "Powerful thin bleach for disinfecting and whitening. 5 liters.", 
        badge: "💰 Budget Friendly" 
    },

    // === 🧴 PERSONAL CARE (category: "personal-care") ===
    { 
        id: "liquidhandsoup", 
        name: "Liquid Hand Soap 5L", 
        price: 95.00, 
        category: "personal-care", 
        description: "Gentle yet effective liquid hand soap. 5-liter bulk size.", 
        badge: "✨ Value Pack" 
    },
    
    { 
        id: "bubblebath5l", 
        name: "Bubble Bath 5L", 
        price: 90.00, 
        category: "personal-care", 
        description: "Luxurious bubble bath for relaxing soaks. 5-liter container.", 
        badge: "🛁 Relaxation" 
    },

    // === ⚗️ INDUSTRIAL (category: "industrial") ===
    { 
        id: "causticsodaflakes800g", 
        name: "Caustic Soda Flakes 800g", 
        price: 70.00, 
        category: "industrial", 
        description: "Industrial-grade caustic soda flakes. 800g pack for heavy-duty cleaning.", 
        badge: "⚠️ Handle with Care" 
    }
];

// 🔄 Process & Attach Metadata + Image Paths
const PROCESSED = RAW_PRODUCTS.map(product => ({
    ...product,
    image: `${CONFIG.basePath}${CONFIG.imageDir}/${product.id}.jpg`,
    imageFallback: `${CONFIG.basePath}${CONFIG.fallbackImage}`,
    businessName: CONFIG.businessName,
    businessLogo: `${CONFIG.basePath}${CONFIG.businessLogo}`,
    categorySlug: product.category.trim().toLowerCase()
}));

// 🌐 Global Export
window.SHUPZ_PRODUCTS = PROCESSED;
window.SHUPZ_DATA = PROCESSED;

// 🛠️ Utility API
window.ShupzProducts = {
    getAll: () => window.SHUPZ_PRODUCTS,
    getById: (id) => window.SHUPZ_PRODUCTS.find(p => p.id === id),
    getByCategory: (category) => window.SHUPZ_PRODUCTS.filter(p => p.categorySlug === category.toLowerCase()),
    getImageUrl: (productId, useFallback = true) => {
        const product = window.SHUPZ_PRODUCTS.find(p => p.id === productId);
        return product ? product.image : (useFallback ? `${CONFIG.basePath}${CONFIG.fallbackImage}` : null);
    },
    renderCard: (p) => `
        <div class="product-card" data-id="${p.id}">
            <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='${p.imageFallback}'">
            ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
            <h3>${p.name}</h3>
            <p class="desc">${p.description}</p>
            <div class="price">R${p.price.toFixed(2)}</div>
            <button class="btn-add" data-product-id="${p.id}">Add to Cart</button>
        </div>
    `
};

// 📊 Dev Console (Remove in production)
console.group("🧴 Shupz Products Synced");
console.log(`✅ ${PROCESSED.length} products loaded`);
const grouped = {};
PROCESSED.forEach(p => (grouped[p.categorySlug] = grouped[p.categorySlug] || []).push(p.name));
Object.entries(grouped).forEach(([cat, items]) => console.log(`📁 ${cat}: ${items.length} items`));
console.groupEnd();
})();