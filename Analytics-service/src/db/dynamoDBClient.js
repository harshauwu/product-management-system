const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const CONFIG = require('../config/awsConfig');

const client = new DynamoDBClient({
    region: CONFIG.aws_region,
    credentials: {
        accessKeyId: CONFIG.aws_access_key_id,
        secretAccessKey: CONFIG.aws_secret_access_key
    }
});

const dynamoDB = DynamoDBDocumentClient.from(client);

module.exports = dynamoDB;