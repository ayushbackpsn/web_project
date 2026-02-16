const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Shoe = require('../models/Shoe');
const { auth } = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.userId });
        
        if (!cart) {
            cart = new Cart({ user: req.user.userId, items: [] });
            await cart.save();
        }

        res.json(cart);
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
    try {
        const { productId, quantity = 1, size } = req.body;

        if (!productId || !size) {
            return res.status(400).json({ message: 'Product ID and size are required' });
        }

        // Get product details
        const product = await Shoe.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create user's cart
        let cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            cart = new Cart({ user: req.user.userId, items: [] });
        }

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && item.size === size
        );

        if (existingItemIndex > -1) {
            // Update quantity of existing item
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item with product details
            cart.items.push({
                product: productId,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
                size: size,
                quantity: quantity
            });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update cart item quantity
router.put('/update/:itemId', auth, async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Valid quantity is required' });
        }

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity = quantity;
        await cart.save();

        res.json({
            message: 'Cart updated',
            cart
        });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove item from cart
router.delete('/remove/:itemId', auth, async (req, res) => {
    try {
        const { itemId } = req.params;

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();

        res.json({
            message: 'Item removed from cart',
            cart
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();

        res.json({
            message: 'Cart cleared',
            cart
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get cart item count
router.get('/count', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId });
        
        if (!cart) {
            return res.json({ count: 0 });
        }

        const count = cart.items.reduce((total, item) => total + item.quantity, 0);
        res.json({ count });
    } catch (error) {
        console.error('Get cart count error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
