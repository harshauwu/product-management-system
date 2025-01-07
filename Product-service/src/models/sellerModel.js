const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    joined_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;