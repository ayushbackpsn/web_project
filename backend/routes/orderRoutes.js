const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { auth } = require('../middleware/auth');
const whatsappService = require('../utils/whatsapp');

// Create new order
router.post('/', auth, async (req, res) => {
    try {
        const {
            items,
            shippingAddress,
            paymentMethod = 'cash_on_delivery'
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in order' });
        }

        if (!shippingAddress) {
            return res.status(400).json({ message: 'Shipping address is required' });
        }

        // Create order
        const order = new Order({
            user: req.user.userId,
            items: items.map(item => ({
                product: item.product,
                name: item.name,
                brand: item.brand,
                price: item.price,
                size: item.size,
                quantity: item.quantity,
                image: item.image
            })),
            shippingAddress,
            paymentMethod,
            status: 'pending'
        });

        const createdOrder = await order.save();
        await createdOrder.populate('user items.product');

        // Send WhatsApp notification
        const whatsappResult = await whatsappService.sendOrderMessage(createdOrder);
        
        if (whatsappResult.success) {
            createdOrder.whatsappSent = true;
            await createdOrder.save();
        }

        // Clear user's cart after order is placed
        await Cart.findOneAndUpdate(
            { user: req.user.userId },
            { items: [], totalItems: 0, totalPrice: 0 }
        );

        res.status(201).json({
            message: 'Order created successfully',
            order: createdOrder,
            whatsappUrl: whatsappResult.url
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
            .populate('items.product')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get order by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user items.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if order belongs to user
        if (order.user._id.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(order);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update order status (admin only)
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;

        if (status === 'delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        if (status === 'paid') {
            order.isPaid = true;
            order.paidAt = Date.now();
        }

        const updatedOrder = await order.save();
        await updatedOrder.populate('user items.product');

        res.json({
            message: 'Order status updated',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Cancel order
router.put('/:id/cancel', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if order belongs to user
        if (order.user.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Only allow cancellation if order is pending or confirmed
        if (!['pending', 'confirmed'].includes(order.status)) {
            return res.status(400).json({ message: 'Order cannot be cancelled' });
        }

        order.status = 'cancelled';
        const cancelledOrder = await order.save();
        await cancelledOrder.populate('items.product');

        res.json({
            message: 'Order cancelled',
            order: cancelledOrder
        });
    } catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all orders (admin only)
router.get('/', auth, async (req, res) => {
    try {
        // This would typically have admin middleware
        const orders = await Order.find({})
            .populate('user items.product')
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
