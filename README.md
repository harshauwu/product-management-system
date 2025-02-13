# Scalable Event-Driven Product Management System  
A scalable, event-driven product management system designed for an e-commerce platform. This system enables sellers to manage their inventory, add or update products, and view product analytics. Built with Node.js, it utilizes advanced concepts such as asynchronous programming, streams, worker threads, and clustering to ensure high performance and scalability.  

## Table of Contents
1. [About the Project](#about-the-project)  
2. [System Architecture](#system-architecture)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
5. [Event-Driven Flow](#event-driven-flow)  
6. [Microservices Overview](#microservices-overview)  
7. [API Endpoints](#api-endpoints)  
8. [Scaling and Performance](#scaling-and-performance)  
9. [Contributing](#contributing)  
10. [License](#license)  

## About the Project  
This project leverages an event-driven architecture to enable seamless, real-time updates across the e-commerce platform. It consists of multiple microservices that interact through SNS (Simple Notification Service) and SQS (Simple Queue Service), enabling product updates, notifications, and analytics.  

Key Goals:  
- Provide a highly scalable system for managing e-commerce products.  
- Use event-driven communication for notifications, analytics, and inventory updates.  
- Ensure fault tolerance and scalability through Node.js worker threads, clustering, and auto-scaling.  

## System Architecture  
The system follows a microservices architecture with a combination of RESTful APIs and event-driven messaging.  

### High-Level Diagram  
![Architecture Diagram](diagram/Product-Managment-1.png)  

### Components:  
- **API Gateway** – Exposes RESTful APIs to users and forwards requests to microservices.  
- **Product Management Service** – Handles product creation, updates, and inventory management.  
- **SNS** – Acts as an event bus to fan out events to multiple services.  
- **SQS** – Manages queues for asynchronous processing (FIFO for inventory, notifications, and analytics).  
- **Lambda Functions** – Handle downstream processing for inventory updates and notifications.  
- **Analytics Service** – Processes events and updates product analytics in real time.  

## Tech Stack  
- **Backend** – Node.js (Express.js)  
- **Event-Driven Services** – AWS SNS/SQS  
- **Frontend** – React (for client management interfaces)  
- **Databases** – PostgreSQL, DynamoDB  
- **Cloud Infrastructure** – AWS Lambda, ECS (Elastic Container Service)  
- **Scaling** – Auto-scaling through ECS and Lambda  
- **Notifications** – AWS SES (Simple Email Service)  
- 
## Getting Started  
Follow the instructions below to set up the project locally.  

### Prerequisites  
Ensure you have the following installed on your machine:  
- **Node.js** (>= 18)  
- **Docker**  
- **AWS CLI** (configured)  
- **MongoDB** (local or cloud instance)  

### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/username/product-management.git
   cd product-management
   ```

2. Configure Environment Variables:  
   Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   nano .env
   ```

3. Start the Product Service (Development Mode):  
   Use the build-dev.sh script to build and run the product service.

   If the script is not executable, make it executable first:
   ```bash
   chmod +x build-dev.sh
   ```

   Then, start the product service:
   ```bash
   ./build-dev.sh
   ```

4. Verify the Service:  
   Once the service is running, visit:
   [http://localhost:4003/product-service/v1/api-docs](http://localhost:4003/product-service/v1/api-docs)

   You should see the Swagger API documentation for the Product Management System.
   
   ![Swagger Document](diagram/swagger-doc.png)  




## Microservices Overview  

### Product Management Service  
- Handles CRUD operations for products.  
- Emits events to SNS for downstream processing.  

### Notification Service  
- Listens to the notification SQS queue and triggers emails using AWS SES.  

### Inventory Service  
- Listens to the inventory SQS queue and updates product stock.  

### Analytics Service  
- Consumes analytics events from the analytics queue and updates product dashboards.  

## API Endpoints  

The following RESTful endpoints are available for managing products in the Product Management System.  

### Base URL:  
`http://localhost:4003/product-service/v1`  

---

### **Products**  
Endpoints related to product management.  

#### 1. Create a New Product  
**POST** `/api/v1/products`  
- **Description**: Create a new product.  
- **Authorization**: Bearer Token (JWT).  
- **Content-Type**: `application/json`  
- **Request Body (Example)**:  
```json
{
  "name": "Gaming Laptop",
  "description": "High-end laptop for gaming",
  "price": 1500.00,
  "stock": 50
}

