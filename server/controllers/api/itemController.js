const express = require('express');
const router = express.Router();
//const Item = require('../models/Item');

router.post('/create', async (req, res) => {
    const { } = req.body;

    try {

        // const item = new Item({});
        // await item.save();

    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/update', async (req, res) => {
    const { } = req.body;

    if (!itemId) {
        // return res.status(400).json({ message: 'Item ID is required' });
    }

    try {
        // const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Possible fields
        // item.name = name || item.name;
        // item.description = description || item.description;
        // item.price = price || item.price;

        // await item.save();
        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
