const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
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
            min: 1,
            default: 1
        },
        image: {
            type: String,
            required: true
        }
    }],
    totalItems: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0.0
    }
}, {
    timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
    if (this.isModified('items')) {
        this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
        this.totalPrice = this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
