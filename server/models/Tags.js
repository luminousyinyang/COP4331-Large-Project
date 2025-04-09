const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({

    tagName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
});


module.exports = mongoose.model('Tag', tagSchema);
