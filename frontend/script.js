document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on and load appropriate content
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html') {
        loadFeaturedProducts();
    } else if (currentPage === 'products.html') {
        loadAllProducts();
    } else if (currentPage === 'contact.html') {
        setupContactForm();
    }
});

async function loadAllProducts() {
    const productsContainer = document.getElementById('products-container');
    
    try {
        productsContainer.innerHTML = '<div class="loading">Loading products...</div>';
        
        const response = await fetch('http://localhost:5000/api/shoes');
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        const shoes = await response.json();
        
        if (shoes.length === 0) {
            productsContainer.innerHTML = '<div class="error">No products found</div>';
            return;
        }
        
        productsContainer.innerHTML = '';
        
        shoes.forEach(shoe => {
            const productCard = createProductCard(shoe);
            productsContainer.appendChild(productCard);
        });
        
    } catch (error) {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = '<div class="error">Error loading products. Please try again later.</div>';
    }
}

async function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    
    if (!featuredContainer) return;
    
    try {
        featuredContainer.innerHTML = '<div class="loading">Loading featured products...</div>';
        
        const response = await fetch('http://localhost:5000/api/shoes');
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        const shoes = await response.json();
        
        // Show only first 3 products as featured
        const featuredShoes = shoes.slice(0, 3);
        
        if (featuredShoes.length === 0) {
            featuredContainer.innerHTML = '<div class="error">No featured products found</div>';
            return;
        }
        
        featuredContainer.innerHTML = '';
        
        featuredShoes.forEach(shoe => {
            const productCard = createProductCard(shoe);
            featuredContainer.appendChild(productCard);
        });
        
    } catch (error) {
        console.error('Error loading featured products:', error);
        featuredContainer.innerHTML = '<div class="error">Error loading featured products. Please try again later.</div>';
    }
}

function createProductCard(shoe) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${shoe.image}" alt="${shoe.name}" class="product-image" onerror="this.src='https://via.placeholder.com/280x250?text=No+Image'">
        <div class="product-info">
            <h3 class="product-name">${shoe.name}</h3>
            <p class="product-brand">${shoe.brand}</p>
            <p class="product-category">${shoe.category}</p>
            <p class="product-price">$${shoe.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart('${shoe.name}')">Add to Cart</button>
        </div>
    `;
    
    return card;
}

function addToCart(shoeName) {
    alert(`${shoeName} added to cart!`);
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Show success message (in real app, this would send to server)
            alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}
