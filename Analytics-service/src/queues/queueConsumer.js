const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');
const { runAnalyticsWorker } = require('../services/analyticsService');
const  CONFIG = require('../config/awsConfig');

// Initialize SQS Client (v3 Style)
const sqsClient = new SQSClient({
    region: CONFIG.aws_region,
    credentials: {
        accessKeyId: CONFIG.aws_access_key_id,
        secretAccessKey: CONFIG.aws_secret_access_key
    }
});

const queueUrl = CONFIG.sqs_url;

// Function to poll and process messages from SQS FIFO queue
const pollSqsQueue = async () => {
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 5,
        VisibilityTimeout: 30,
        WaitTimeSeconds: 10
    };

    try {
        const data = await sqsClient.send(new ReceiveMessageCommand(params));

        if (data.Messages && data.Messages.length > 0) {
            console.log(`Received ${data.Messages.length} messages from SQS.`);

            for (const message of data.Messages) {
                const productEvent = JSON.parse(message.Body);
                console.log('Processing Event:', productEvent);

                try {
                    // Pass message to worker thread
                    const result = await runAnalyticsWorker(productEvent);
                    console.log('Analytics Updated:', result);

                    // Delete message after successful processing
                    const deleteParams = {
                        QueueUrl: queueUrl,
                        ReceiptHandle: message.ReceiptHandle
                    };

                    await sqsClient.send(new DeleteMessageCommand(deleteParams));
                    console.log(`Deleted SQS Message: ${message.MessageId}`);
                } catch (error) {
                    console.error('Failed to process message:', error);
                }
            }
        } else {
            console.log('No messages in the queue.');
        }
    } catch (error) {
        console.error('Error polling SQS:', error);
    }
};

// Continuous polling (every 5 seconds)
setInterval(pollSqsQueue, 5000);
