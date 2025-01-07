const dynamoDB = require('./dynamoDBClient');
const CONFIG = require('../config/config');

const tableName = CONFIG.dynamo_table_name;

class AnalyticsDB {
    /**
     * Update product analytics (views, sales, revenue)
     * @param {Object} product - Product data (product_id, increment data)
     */
    static async updateAnalytics(product) {
        const params = {
            TableName: tableName,
            Key: { product_id: product.product_id },
            UpdateExpression: 'SET views = if_not_exists(views, :start) + :incr, last_updated = :now',
            ExpressionAttributeValues: {
                ':start': 0,
                ':incr': 1,
                ':now': new Date().toISOString()
            },
            ReturnValues: 'UPDATED_NEW'
        };

        try {
            const result = await dynamoDB.update(params).promise();
            console.log('Analytics Updated in DynamoDB:', result);
            return result.Attributes;
        } catch (error) {
            console.error('DynamoDB Update Error:', error);
            throw error;
        }
    }

    /**
     * Fetch product analytics by product_id
     * @param {String} productId - Product ID
     */
    static async getAnalytics(productId) {
        const params = {
            TableName: tableName,
            Key: { product_id: productId }
        };

        try {
            const result = await dynamoDB.get(params).promise();
            return result.Item || {};
        } catch (error) {
            console.error('Error fetching product analytics:', error);
            throw error;
        }
    }

    /**
     * Delete product analytics by product_id
     * @param {String} productId - Product ID
     */
    static async deleteAnalytics(productId) {
        const params = {
            TableName: tableName,
            Key: { product_id: productId }
        };

        try {
            await dynamoDB.delete(params).promise();
            console.log(`Product ${productId} analytics deleted`);
        } catch (error) {
            console.error('Error deleting analytics:', error);
            throw error;
        }
    }
}

module.exports = AnalyticsDB;
