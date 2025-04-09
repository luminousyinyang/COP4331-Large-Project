const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');

router.post('/create', async (req, res) => {
    const { userID, tagID, description, imageURL, price, title } = req.body;

    try {
        if (!userID || !tagID || !description || !imageURL || price === undefined || !title) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const item = new Item({
            userID,
            tagID,
            description,
            imageURL,
            price,
            title,
        });

        await item.save();
        res.status(201).json({ message: 'Item created successfully', item });
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/update', async (req, res) => {
    const { itemId, userID, tagID, description, imageURL, price, title, isBought } = req.body;

    if (!itemId) {
        return res.status(400).json({ message: 'Item ID is required' });
    }

    try {
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.userID = userID || item.userID;
        item.tagID = tagID || item.tagID;
        item.description = description || item.description;
        item.imageURL = imageURL || item.imageURL;
        item.price = price !== undefined ? price : item.price;
        item.title = title || item.title;
        item.isBought = isBought !== undefined ? isBought : item.isBought;

        await item.save();
        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
