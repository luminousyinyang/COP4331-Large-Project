const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to your User model
        required: true,
    },

    tagID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: false,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    imageURL: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    isBought: {
        type: Boolean,
        default: false,
        index: true,
    },
},
    {
        timestamps: true,
    });


module.exports = mongoose.model('Item', itemSchema);
