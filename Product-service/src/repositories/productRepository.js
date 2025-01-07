const Product = require('../models/productModel');

class ProductRepository {
    /**
     * Creates a new product.
     * 
     * @param {Object} productData - The product data.
     * @returns {Promise<Object>} - The created product object.
     */
    async create(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    /**
     * Retrieves all products.
     * 
     * @returns {Promise<Array>} - A list of all products.
     */
    async findAll() {
        return await Product.find();
    }

    /**
     * Retrieves a product by its ID.
     * 
     * @param {string} productId - The ID of the product to retrieve.
     * @returns {Promise<Object|null>} - The product object or null if not found.
     */
    async findById(productId) {
        return await Product.findById(productId);
    }

    /**
     * Updates a product by its ID.
     * 
     * @param {string} productId - The ID of the product to update.
     * @param {Object} data - The updated product data.
     * @returns {Promise<Object|null>} - The updated product object or null if not found.
     */
    async update(productId, data) {
        return await Product.findByIdAndUpdate(productId, data, { new: true });
    }

    /**
     * Deletes a product by its ID.
     * 
     * @param {string} productId - The ID of the product to delete.
     * @returns {Promise<Object|null>} - The deleted product object or null if not found.
     */
    async delete(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

module.exports = new ProductRepository();