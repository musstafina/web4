const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemNameEn: {
        type: String,
        required: true
    },
    itemNameLocalized: {
        type: String,
        required: true
    },
    itemDescriptionEn: {
        type: String,
        required: true
    },
    itemDescriptionLocalized: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Item', itemSchema);
