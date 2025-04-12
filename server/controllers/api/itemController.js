const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const User = require('../../models/User');
const cheerio = require('cheerio');
const axios = require('axios');

router.post('/create', async (req, res) => {
    const { userID, tagID, description, imageURL, price, title } = req.body;

    try {
        if (!userID || !tagID || !description || !imageURL || price === undefined || !title) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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
    const { itemId, tagID, description, imageURL, price, title, isBought } = req.body;

    if (!itemId) {
        return res.status(400).json({ message: 'Item ID is required' });
    }

    try {
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

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

    if (!itemID) {
        return res.status(404).json({ message: "itemID missing" });
    }

    // TODO: do the changes in the database!

    try {
        const query = await Item.deleteOne({ _id: itemID });

        res.status(200).json({
            message: "removal successful",
            numRemoved: query.deletedCount
        })
    } catch (err) {
        console.error("Encountered the following error\n", err);
        res.status(500).json({ message: "Error deleting, see console" });
    }
})

router.post('/singleitem', async (req, res) => {
    const { itemID } = req.body;

    try {
        const query = await Item.findById(itemID);

        res.status(200).json({ message: "success", item: query });

    } catch (err) {
        console.error("error getting a singleitem", err);
        return res.status(404).json({ message: "item not found" });
    }
})

router.post('/search', async (req, res) => {
    // needs userID (will get all the items for that userID)
    // if title is present, it will retrieve those docs. with title in it

    const { title, userID } = req.body;

    if (!userID) {
        return res.status(404).json({ message: "userID missing" });
    }
    try {
        // will get all the items that have the requested title in it.
        // it could be one word, or the whole title, or just a portion of a word
        let query;

        if (!title) {
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
        res.status(200).json({
            message: "searching successful, see console",
            items: query
        });

    } catch (err) {
        console.log("Something wrong happened", err);
    }

})

router.post('/getprodinfo', async (req, res) => {
    // input: url of the product
    // returns: title, description, and imageURL
    const { url } = req.body;

    const headers = {
        headers: {
            'User-Agent': 'Twitterbot/1.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        },
        maxRedirects: 5,
        timeout: 10000
    }

    try {
        const response = await axios.get(url, headers);

        const $ = cheerio.load(response.data);

        const image = $("meta[property='og:image']").attr('content');
        const title = $("meta[property='og:title']").attr('content');
        const description = $("meta[property='og:description']").attr('content');

        let responseBody = {
            title: title,
            description: description,
            image: image
        }

        res.status(200).json({ message: "fetch success", info: responseBody });

    } catch (err) {
        console.log("error: ", err)
        return res.status(404).json({ message: "unexpected error" });
    }
})

module.exports = router;
