const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const CONFIG = require('../../config/awsConfig');

const snsClient = new SNSClient({
    region: CONFIG.aws_region,
    credentials: {
        accessKeyId: CONFIG.aws_access_key_id,
        secretAccessKey: CONFIG.aws_secret_access_key
    }
});

class EventObserver {
    static async notify(eventType, payload) {
        const message = JSON.stringify({ eventType, data: payload });

        const params = {
            TopicArn: CONFIG.sns_topic_arn,
            Message: message
        };

        try {
            const data = await snsClient.send(new PublishCommand(params));
            console.log(`Event Published: ${eventType}`, data);
        } catch (err) {
            console.error('Event Notification Failed:', err);
        }
    }
}

module.exports = EventObserver;