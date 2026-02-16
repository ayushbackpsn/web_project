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

// GET /api/shoes/:id - Get single shoe by ID
router.get('/:id', async (req, res) => {
    try {
        const shoe = await Shoe.findById(req.params.id);
        if (shoe) {
            res.json(shoe);
        } else {
            res.status(404).json({ message: 'Shoe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
