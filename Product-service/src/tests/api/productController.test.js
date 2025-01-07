const productController = require('../../api/controllers/productController');
const productService = require('../../services/productService');

jest.mock('../../services/productService');

describe('Product Controller - createProduct', () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        mockRequest = {
            body: {
                id: "abc123",
                name: "Wireless Headphones",
                description: "Noise-cancelling wireless headphones",
                price: 120.99,
                quantity: 50,
                category: "Electronics"
            }
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.clearAllMocks();
    });

    it('should create a product and return 201 status', async () => {
        const mockProduct = {
            id: "abc123",
            name: "Wireless Headphones",
            price: 120.99,
            quantity: 50
        };

        productService.createProduct.mockResolvedValue(mockProduct);

        await productController.createProduct(mockRequest, mockResponse);

        expect(productService.createProduct).toHaveBeenCalledWith(mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockProduct,
            message: 'Product created successfully'
        });
    });

    it('should return 500 status when product creation fails', async () => {
        const errorMessage = 'Failed to create product';
        productService.createProduct.mockRejectedValue(new Error(errorMessage));

        await productController.createProduct(mockRequest, mockResponse);

        expect(productService.createProduct).toHaveBeenCalledWith(mockRequest.body);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            error: errorMessage,
            message: 'Failed to create product'
        });
    });
});

describe('Product Controller - Update and Delete Product', () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        mockRequest = {
            params: { id: "abc123" },
            body: {
                name: "Updated Headphones",
                price: 150.99,
                quantity: 30
            }
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        jest.clearAllMocks();
    });

    describe('updateProduct', () => {
        it('should update a product and return 200 status', async () => {
            const updatedProduct = {
                id: "abc123",
                name: "Updated Headphones",
                price: 150.99,
                quantity: 30
            };

            productService.updateProduct.mockResolvedValue(updatedProduct);

            await productController.updateProduct(mockRequest, mockResponse);

            expect(productService.updateProduct).toHaveBeenCalledWith("abc123", mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Product updated successfully',
                data: updatedProduct
            });
        });

        it('should return 500 status if update fails', async () => {
            const errorMessage = 'Failed to update';
            productService.updateProduct.mockRejectedValue(new Error(errorMessage));

            await productController.updateProduct(mockRequest, mockResponse);

            expect(productService.updateProduct).toHaveBeenCalledWith("abc123", mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'error',
                message: 'Failed to update product',
                error: errorMessage
            });
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product and return 204 status', async () => {
            productService.deleteProduct.mockResolvedValue();

            await productController.deleteProduct(mockRequest, mockResponse);

            expect(productService.deleteProduct).toHaveBeenCalledWith("abc123");
            expect(mockResponse.status).toHaveBeenCalledWith(204);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Product deleted successfully'
            });
        });

        it('should return 500 status if deletion fails', async () => {
            const errorMessage = 'Failed to delete';
            productService.deleteProduct.mockRejectedValue(new Error(errorMessage));

            await productController.deleteProduct(mockRequest, mockResponse);

            expect(productService.deleteProduct).toHaveBeenCalledWith("abc123");
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: 'error',
                message: 'Failed to delete product',
                error: errorMessage
            });
        });
    });
});