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

router.post('/delete', async (req, res) => {
    const { itemID } = req.body;
    // requires just itemID

    if(!itemID) {
        return res.status(404).json({message: "itemID missing"});
    }

    // TODO: do the changes in the database!

    try {
        const query = await Item.deleteOne({_id: itemID});

        res.status(200).json({message: "removal successful",
             numRemoved: query.deletedCount})
    } catch (err) {
        console.error("Encountered the following error\n", err);
        res.status(500).json({message: "Error deleting, see console"});
    }
})

router.post('/search', async (req, res) => {
    // needs userID (will get all the items for that userID)
    // if title is present, it will retrieve those docs. with title in it
    
    const { title, userID } = req.body;
    
    if (!userID) {
        return res.status(404).json({message: "userID missing"});
    }
    try {
        // will get all the items that have the requested title in it.
        // it could be one word, or the whole title, or just a portion of a word
        let query;

        if(!title) {
            // search all of the items
            console.log(`Searching all the items for user ${userID}`);
            query = await Item.find({
                userID: userID
            })
        } else {
            // search for a specific item
            console.log(`Searching for ${title} for user ${userID}`);
            query = await Item.find({
                userID: userID,
                title: new RegExp(title, "im")
            });
        }
        
        console.log(query);
        res.status(200).json({message: "searching successful, see console", 
            items: query});

    } catch(err) {
        console.log("Something wrong happened", err);
    }

})

module.exports = router;
