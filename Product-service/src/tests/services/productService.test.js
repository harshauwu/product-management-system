const ProductService = require('../../services/productService');
const ProductFactory = require('../../services/productFactory');
const ProductRepository = require('../../repositories/productRepository');
const EventObserver = require('../../events/observers/eventObserver');

jest.mock('../../services/productFactory');
jest.mock('../../repositories/productRepository');
jest.mock('../../events/observers/eventObserver');

describe('Product Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createProduct', () => {
        it('should create and save a product, then notify observers', async () => {
            const productData = {
                name: "Wireless Headphones",
                price: 120.99,
                quantity: 50
            };

            const createdProduct = { id: 'abc123', ...productData };

            ProductFactory.createProduct.mockReturnValue(createdProduct);
            ProductRepository.create.mockResolvedValue(createdProduct);
            EventObserver.notify.mockResolvedValue();

            const result = await ProductService.createProduct(productData);

            expect(ProductFactory.createProduct).toHaveBeenCalledWith(productData);
            expect(ProductRepository.create).toHaveBeenCalledWith(createdProduct);
            expect(EventObserver.notify).toHaveBeenCalledWith('product.created', createdProduct);
            expect(result).toEqual(createdProduct);
        });

        it('should throw an error if product creation fails', async () => {
            ProductFactory.createProduct.mockImplementation(() => { throw new Error('Factory error'); });

            await expect(ProductService.createProduct({})).rejects.toThrow('Factory error');
        });
    });

    describe('updateProduct', () => {
        it('should update a product and notify observers', async () => {
            const productId = 'abc123';
            const updatedData = { name: 'Updated Product', price: 150 };
            const updatedProduct = { id: productId, ...updatedData };

            ProductRepository.update.mockResolvedValue(updatedProduct);
            EventObserver.notify.mockResolvedValue();

            const result = await ProductService.updateProduct(productId, updatedData);

            expect(ProductRepository.update).toHaveBeenCalledWith(productId, updatedData);
            expect(EventObserver.notify).toHaveBeenCalledWith('product.updated', updatedProduct);
            expect(result).toEqual(updatedProduct);
        });

        it('should throw an error if update fails', async () => {
            ProductRepository.update.mockRejectedValue(new Error('Update failed'));

            await expect(ProductService.updateProduct('abc123', {})).rejects.toThrow('Update failed');
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product and notify observers', async () => {
            const productId = 'abc123';
            const deletedProduct = { id: productId };

            ProductRepository.delete.mockResolvedValue(deletedProduct);
            EventObserver.notify.mockResolvedValue();

            const result = await ProductService.deleteProduct(productId);

            expect(ProductRepository.delete).toHaveBeenCalledWith(productId);
            expect(EventObserver.notify).toHaveBeenCalledWith('product.deleted', { productId });
            expect(result).toEqual(deletedProduct);
        });

        it('should throw an error if delete fails', async () => {
            ProductRepository.delete.mockRejectedValue(new Error('Delete failed'));

            await expect(ProductService.deleteProduct('abc123')).rejects.toThrow('Delete failed');
        });
    });

    describe('getAllProducts', () => {
        it('should retrieve all products', async () => {
            const mockProducts = [
                { id: 'abc123', name: 'Product 1' },
                { id: 'def456', name: 'Product 2' }
            ];

            ProductRepository.findAll.mockResolvedValue(mockProducts);

            const result = await ProductService.getAllProducts();

            expect(ProductRepository.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockProducts);
        });

        it('should throw an error if retrieval fails', async () => {
            ProductRepository.findAll.mockRejectedValue(new Error('Fetch failed'));

            await expect(ProductService.getAllProducts()).rejects.toThrow('Fetch failed');
        });
    });
});
