const Electronics = require('./category/electronics');
const Clothing = require('./category/clothing');

class ProductFactory {
    static createProduct(data) {
        const category = data.category.toLowerCase();
        switch (category) {
            case 'electronics':
                return new Electronics(data);
            case 'clothing':
                return new Clothing(data);
            default:
                throw new Error('Invalid product category');
        }
    }
}

module.exports = ProductFactory;
