const productService = require('../../services/productService');

/**
 * Creates a new product.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing product details.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct({...req.body, seller_id:req.user.seller_id });
        res.status(201).json({
            success: true,
            data: product,
            message: "Product created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to create product"
        });
    }
};

/**
 * Retrieves all products.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({
            status: 'success',
            message: 'Products retrieved successfully',
            data: products
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve products',
            error: error.message
        });
    }
};

/**
 * Updates an existing product by ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the product to update.
 * @param {Object} req.body - The body of the request containing updated product details.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update product',
            error: error.message
        });
    }
};

/**
 * Deletes a product by ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the product to delete.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(204).json({
            status: 'success',
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete product',
            error: error.message
        });
    }
};