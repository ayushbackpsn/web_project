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

// Demo products data for standalone frontend
const demoProducts = [
    {
        _id: '1',
        name: "Nike Air Max 270",
        brand: "Nike",
        price: 150,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Running"
    },
    {
        _id: '2',
        name: "Adidas Ultra Boost",
        brand: "Adidas",
        price: 180,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Running"
    },
    {
        _id: '3',
        name: "Puma RS-X",
        brand: "Puma",
        price: 120,
        image: "https://images.unsplash.com/photo-1460353581641-374adda58c1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Casual"
    },
    {
        _id: '4',
        name: "New Balance 574",
        brand: "New Balance",
        price: 90,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Casual"
    },
    {
        _id: '5',
        name: "Converse Chuck Taylor",
        brand: "Converse",
        price: 60,
        image: "https://images.unsplash.com/photo-1608231387042-66d6305a2660?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Casual"
    },
    {
        _id: '6',
        name: "Vans Old Skool",
        brand: "Vans",
        price: 70,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Skate"
    },
    {
        _id: '7',
        name: "Reebok Classic",
        brand: "Reebok",
        price: 85,
        image: "https://images.unsplash.com/photo-1576031169113-7334e3cf1c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Casual"
    },
    {
        _id: '8',
        name: "Jordan Air 1",
        brand: "Jordan",
        price: 200,
        image: "https://images.unsplash.com/photo-1605348532760-1b85be30e404?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        category: "Basketball"
    }
];

async function loadAllProducts() {
    const productsContainer = document.getElementById('products-container');
    
    if (!productsContainer) {
        console.error('Products container not found');
        return;
    }
    
    // Clear container immediately
    productsContainer.innerHTML = '';
    
    try {
        // Show loading state briefly
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.textContent = 'Loading products...';
        productsContainer.appendChild(loadingDiv);
        
        // Use demo products instead of API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const shoes = demoProducts;
        
        console.log('Loading products:', shoes.length, 'items');
        
        // Remove loading state
        loadingDiv.remove();
        
        if (!shoes || shoes.length === 0) {
            productsContainer.innerHTML = '<div class="error">No products found</div>';
            return;
        }
        
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        shoes.forEach((shoe, index) => {
            console.log(`Creating card ${index + 1}:`, shoe.name);
            const productCard = createProductCard(shoe);
            fragment.appendChild(productCard);
        });
        
        // Append all products at once
        productsContainer.appendChild(fragment);
        
        // Add loaded class to cards with delay for staggered animation
        setTimeout(() => {
            document.querySelectorAll('.product-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('loaded');
                }, index * 100);
            });
        }, 100);
        
    } catch (error) {
        console.error('Error loading products:', error);
        if (productsContainer) {
            productsContainer.innerHTML = '<div class="error">Error loading products. Please try again later.</div>';
        }
    }
}

async function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    
    if (!featuredContainer) {
        console.error('Featured container not found');
        return;
    }
    
    // Clear container immediately
    featuredContainer.innerHTML = '';
    
    try {
        // Show loading state briefly
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.textContent = 'Loading featured products...';
        featuredContainer.appendChild(loadingDiv);
        
        // Use demo products instead of API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const shoes = demoProducts;
        
        console.log('Loading featured products:', shoes.length, 'items');
        
        // Remove loading state
        loadingDiv.remove();
        
        // Show only first 3 products as featured
        const featuredShoes = shoes.slice(0, 3);
        
        if (!featuredShoes || featuredShoes.length === 0) {
            featuredContainer.innerHTML = '<div class="error">No featured products found</div>';
            return;
        }
        
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        featuredShoes.forEach((shoe, index) => {
            console.log(`Creating featured card ${index + 1}:`, shoe.name);
            const productCard = createProductCard(shoe);
            fragment.appendChild(productCard);
        });
        
        // Append all products at once
        featuredContainer.appendChild(fragment);
        
        // Add loaded class to cards with delay for staggered animation
        setTimeout(() => {
            document.querySelectorAll('.product-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('loaded');
                }, index * 100);
            });
        }, 100);
        
    } catch (error) {
        console.error('Error loading featured products:', error);
        if (featuredContainer) {
            featuredContainer.innerHTML = '<div class="error">Error loading featured products. Please try again later.</div>';
        }
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
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCart('${shoe.name}')">Add to Cart</button>
                <button class="view-details-btn" onclick="viewProductDetails('${shoe._id}')">View Details</button>
            </div>
        </div>
    `;
    
    return card;
}

function addToCart(shoeName) {
    alert(`${shoeName} added to cart!`);
}

function viewProductDetails(shoeId) {
    // Store the selected shoe ID in sessionStorage
    sessionStorage.setItem('selectedShoeId', shoeId);
    
    // Redirect to product detail page
    window.location.href = 'product-detail.html';
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
