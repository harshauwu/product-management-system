const ProductFactory = require('./productFactory');
const ProductRepository = require('../repositories/productRepository');
const EventObserver = require('../events/observers/eventObserver');

class ProductService {
    /**
     * Creates a new product.
     * 
     * @param {Object} data - The product data required to create a new product.
     * @returns {Promise<Object>} - The saved product object.
     * 
     * This method utilizes the ProductFactory to create a product instance and saves it 
     * using the ProductRepository. After saving, it notifies observers by triggering a 
     * 'product.created' event.
     */
    async createProduct(data) {
        try {
            console.log('Creating product:', data);
            // Create Product
            const product = ProductFactory.createProduct(data);
            console.log('Product:', product);
            const savedProduct = await ProductRepository.create(product);

            // Notify Observers (SNS/SQS Event Trigger)
            EventObserver.notify('product.created', savedProduct);
            return savedProduct;
        } catch (error) {   
            console.error('Error creating product:', error);
            throw error;
        }
    }

    /**
     * Updates an existing product.
     * 
     * @param {string} productId - The ID of the product to be updated.
     * @param {Object} data - The updated product data.
     * @returns {Promise<Object>} - The updated product object.
     * 
     * This method updates the product by passing the product ID and data to the 
     * ProductRepository. Upon successful update, it notifies observers with a 
     * 'product.updated' event.
     */
    async updateProduct(productId, data) {
        try {
            // Update Product
            const updatedProduct = await ProductRepository.update(productId, data);
            EventObserver.notify('product.updated', updatedProduct);
            return updatedProduct;
        } catch (error) {   
            console.error('Error updating product:', error);
            throw error;
        }
    }

    /**
     * Deletes an existing product.
     * 
     * @param {string} productId - The ID of the product to be deleted.
     * @returns {Promise<Object>} - The deleted product object.
     * 
     * This method deletes the product from the repository by its ID and triggers a 
     * 'product.deleted' event to notify observers.
     */
    async deleteProduct(productId) {
        try {
            // Delete Product
            const deletedProduct = await ProductRepository.delete(productId);
            EventObserver.notify('product.deleted', { productId });
            return deletedProduct;
        }   catch (error) { 
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    /**
     * Retrieves all products.
     * 
     * @returns {Promise<Array>} - A list of all products.
     * 
     * This method fetches all products from the repository.
     */
    async getAllProducts() {
        try {
            return await ProductRepository.findAll();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        } 
    }
}


module.exports = new ProductService();