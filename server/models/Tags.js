const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to your User model
        required: true,
    },

    tagName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
    },
});


module.exports = mongoose.model('Tag', tagSchema);
