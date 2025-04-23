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
    },
});

tagSchema.index({ userID: 1, tagName: 1 }, { unique: true });

module.exports = mongoose.model('Tag', tagSchema);
