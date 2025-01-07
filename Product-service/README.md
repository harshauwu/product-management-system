# Product Management System

## Overview
The Product Management System is a RESTful API built with Node.js, Express, and MongoDB. It allows users to manage products, including creating, retrieving, updating, and deleting products.

## Features
- Create a new product
- Retrieve all products
- Update an existing product by ID
- Delete a product by ID
- User authentication with JWT
- API documentation with Swagger

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- Swagger for API documentation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/product-management-system.git
    ```
2. Navigate to the project directory:
    ```sh
    cd product-management-system
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration
1. Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the following environment variables:
    ```env
    PORT=4001
    MONGODB_URI=mongodb://localhost:27017/product-management
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application
1. Start the development server:
    ```sh
    npm start
    ```
2. The API will be available at `http://localhost:4001`.

### Running Tests
1. Run the tests:
    ```sh
    npm test
    ```

## API Documentation
The API documentation is available at `http://localhost:4001/api-docs` when the application is running.

## Project Structure
```plaintext
├── src
│   ├── api
│   │   ├── controllers
│   │   │   └── productController.js
│   │   ├── models
│   │   │   └── productModel.js
│   │   ├── routes
│   │   │   └── productRoutes.js
│   ├── config
│   │   └── config.js
│   ├── middleware
│   │   └── index.js
│   ├── swagger
│   │   ├── swaggerDef.js
│   │   └── swaggerSetup.js
│   └── app.js
├── tests
│   └── product.test.js
├── .env
├── .eslintrc.json
├── .gitignore
├── Dockerfile
├── package.json
└── README.md