const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: 'text'  // Text index for search
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active',
    index: true
  }
},
{
    timestamps: true
});

// Index for active products
productSchema.index({ status: 1 }, { partialFilterExpression: { status: 'active' } });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
