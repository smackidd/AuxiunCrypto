const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetstokenSchema = new Schema({
    token: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    owner: {
        type: String,
        require: true,
        trim: true,
        minLength: 1
    },
    inmarketplace: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
        require: true,
        trim: true,
        minLength: 1
    }
}, {
    timestamps: true,
});

const AssetsToken = mongoose.model('AssetsToken', assetstokenSchema);

module.exports = AssetsToken;