/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         description:
 *           type: string
 *           description: Detailed description of the product
 *         price:
 *           type: number
 *           format: float
 *           description: Product price (e.g., 99.99)
 *         quantity:
 *           type: integer
 *           description: Available stock quantity
 *         category:
 *           type: string
 *           description: Product category
 *       example:
 *         id: "abc123"
 *         name: "Wireless Headphones"
 *         description: "Noise-cancelling wireless headphones"
 *         price: 120.99
 *         quantity: 50
 *         category: "Electronics"
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             example:
 *               message: "Product created successfully"
 *               product:
 *                 id: "abc123"
 *                 name: "Wireless Headphones"
 *                 price: 120.99
 *                 quantity: 50
 *       400:
 *         description: Bad request - Validation error
 *         content:
 *           application/json:
 *             example:
 *               error: "Price is required and must be greater than 0"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             example:
 *               - id: "abc123"
 *                 name: "Wireless Headphones"
 *                 price: 120.99
 *                 quantity: 50
 *               - id: "xyz456"
 *                 name: "Smartwatch"
 *                 price: 199.99
 *                 quantity: 20
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Product updated successfully"
 *               product:
 *                 id: "abc123"
 *                 name: "Updated Headphones"
 *                 price: 110.00
 *                 quantity: 45
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Product with ID abc123 not found"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete
 *     responses:
 *       204:
 *         description: Product successfully deleted
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Product with ID abc123 not found"
 *       500:
 *         description: Server error
 */
