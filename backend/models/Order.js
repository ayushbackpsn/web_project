const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shoe',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        image: {
            type: String,
            required: true
        }
    }],
    shippingAddress: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: 'USA'
        }
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash_on_delivery', 'credit_card', 'paypal'],
        default: 'cash_on_delivery'
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    whatsappSent: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Calculate total before saving
orderSchema.pre('save', function(next) {
    if (this.isModified('items')) {
        this.itemsPrice = this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        this.taxPrice = this.itemsPrice * 0.08; // 8% tax
        this.shippingPrice = this.itemsPrice > 100 ? 0 : 10; // Free shipping over $100
        this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice;
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
