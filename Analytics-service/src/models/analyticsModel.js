const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    views: {
        type: Number,
        default: 0
    },
    sales: {
        type: Number,
        default: 0
    },
    revenue: {
        type: Number,
        default: 0.0
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
});

const ProductAnalytics = mongoose.model('ProductAnalytics', analyticsSchema);
module.exports = ProductAnalytics;
