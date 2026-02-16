const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// GET /api/users/profile - Get user profile (protected)
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/users/profile - Update user profile (protected)
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, email } = req.body;
        
        // Check if email is already taken by another user
        if (email) {
            const existingUser = await User.findOne({ 
                email, 
                _id: { $ne: req.user.userId } 
            });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already taken' });
            }
        }
        
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            updateData,
            { new: true }
        ).select('-password');
        
        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
