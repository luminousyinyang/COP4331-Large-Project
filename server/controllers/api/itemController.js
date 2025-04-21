const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const User = require('../../models/User');
const Tag = require('../../models/Tags');
const cheerio = require('cheerio');
const axios = require('axios');
const fileUpload = require('express-fileupload');
const upload = require('../../config/multer');

router.post('/create', upload.single('image'), async (req, res) => {
    console.log("/create");
    const { userID, tag, description, imageURL, price, title, productLink } = req.body;

    try {
        if (!userID || !description || price === undefined || !title || !productLink) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let uploadedImageURL = imageURL; // default to the provided imageURL
        if (req.file) {
            uploadedImageURL = `/uploads/${req.file.filename}`; // Save the file path to the imageURL
        }

        // Check if user exists
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let tagID = null;
        if (tag) {
            const tagLower = tag.toLowerCase();
            let foundTag = await Tag.findOne({ tagName: {
                $regex: `^${tag}$`,
                $options: 'i'
            } });
            if (!foundTag) {
                // Create a new if no matches
                foundTag = new Tag({
                    userID,
                    tagName: tag,
                });
                await foundTag.save();
            }
            tagID = foundTag._id;
        }

        // Save Item
        const item = new Item({
            userID,
            description,
            // Save the image URL
            imageURL: uploadedImageURL,
            price,
            title,
            // Only include tagID if it is set
            ...(tagID && { tagID }),
            productURL: productLink,
        });

        await item.save();

        // Return success response
        res.status(201).json({ message: 'Item created successfully', item });

    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// router.post('/uploadimg', fileUpload({
//     limits: {
//         fileSize: 10000000,
//         safeFileNames: true,
//     },
//     abortOnLimit: true,
// }), async (req, res) => {
//     // first obtains the image from the request

//     const { image } = req.body;

//     // checks if there is a file and if there is a file, it is considered
//     // an image
//     if (!image) {
//         return res.status(400).json({ message: "Image missing" });
//     }

//     if (!/^image/.test(image.mimetype)) {
//         return res.status(400).json({ message: "Invalid file type" });
//     }

//     // new filename to ensure we do not overwrite other images
//     const fileExtension = path.extname(image.name);
//     const uniqueFilename = crypto.randomUUID() + fileExtension;

//     // file destination
//     const destinationFile = path.join("../../../upload/", uniqueFilename);


//     // save the image in the upload folder, which is at the root of the project
//     image.mv(destinationFile);

//     // return the file path for the file
//     return res.status(200).json({
//         message: "image upload successful",
//         imgPath: destinationFile
//     })
// })

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
    const { itemID, userID } = req.body;
    // requires just itemID

    if (!itemID) {
        return res.status(404).json({ message: "itemID missing" });
    }

    // checks if the user has access to this item
    const itemUserID = await Item.findById(itemID);
    if (itemUserID.userID != userID) {
        return res.status(403).json({ message: "Forbidden: Item not for this user" });
    }

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
            'User-Agent': 'WishListAppBot/1.0',
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
        let image, title, description;
        const isAmazon = url.includes("a.co") || url.includes("amazon.com")

        if (isAmazon) {
            image = $('img#landingImage');
            title = $("meta[name='title']");
            description = $("meta[name='description']");
        } else {
            image = $("meta[property='og:image']");
            title = $("meta[property='og:title']");
            description = $("meta[property='og:description']");
        }

        if (image.length == 0 || title.length == 0 || description.length == 0) {
            return res.status(404).json({ message: "unable to fetch product data" });
        }

        let responseBody = {
            title: title.attr('content'),
            description: description.attr('content'),
            image: isAmazon ? image.attr('src') : image.attr('content')
        }

        res.status(200).json({ message: "fetch success", info: responseBody });

    } catch (err) {
        console.log("error: ", err)
        return res.status(404).json({ message: "unexpected error" });
    }
})

router.get('/getitems', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId parameter' });
    }

    try {
        const items = await Item.find({ userID: userId }).sort({ createdAt: -1 });
        res.status(200).json({ message: 'Items retrieved successfully', items });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/gettags', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId parameter' });
    }

    try {
        const tags = await Tag.find({ userID: userId }).sort({ createdAt: -1 });
        res.status(200).json({ message: 'Tags retrieved successfully', tags });
    } catch (err) {
        console.error('Error fetching tags:', err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;
