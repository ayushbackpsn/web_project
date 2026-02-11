const express = require('express');
const router = express.Router();
const Shoe = require('../models/Shoe');

// GET /api/shoes - Get all shoes
router.get('/', async (req, res) => {
    try {
        const shoes = await Shoe.find({});
        res.json(shoes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
