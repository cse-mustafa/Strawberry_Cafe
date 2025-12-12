document.addEventListener('DOMContentLoaded', () => {
    // --- Cart State and Elements ---
    let cart = [];
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');
    const overlay = document.getElementById('overlay');

    // --- Cart Functions ---
    window.toggleCart = function() {
        cartSidebar.classList.toggle('open');
        overlay.style.display = cartSidebar.classList.contains('open') ? 'block' : 'none';
    }

    function updateCartDisplay() {
        cartItemsList.innerHTML = ''; // Clear existing items
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        } else {
            cart.forEach(item => {
                const listItem = document.createElement('li');
                // Format price to two decimal places
                const itemPrice = (item.price * item.quantity).toFixed(2); 
                
                listItem.innerHTML = `
                    <span>${item.name} (${item.quantity})</span>
                    <span>$${itemPrice}</span>
                `;
                cartItemsList.appendChild(listItem);
                total += item.price * item.quantity;
            });
        }

        // Update total and count display
        cartTotalSpan.textContent = `$${total.toFixed(2)}`;
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function addToCart(event) {
        const button = event.target;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);

        // Check if item is already in cart
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartDisplay();
        // Optional: Open cart sidebar when an item is added
        if (!cartSidebar.classList.contains('open')) {
             toggleCart();
        }
    }

    // Attach click listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });


    // --- Category Filtering Functions ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const productCards = document.querySelectorAll('.product-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Remove active class from all buttons and add to the clicked one
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Initialize cart display on load
    updateCartDisplay();
});