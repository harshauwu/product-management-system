import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
const CONFIG = require('../config/awsConfig');
const sesClient = new SESClient({ region: CONFIG.aws_region });

// Send email function
export const sendEmail = async ({ to, subject, body }) => {
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Text: { Data: body }
            },
            Subject: { Data: subject }
        },
        Source: 'noreply@abc.com'
    };

    try {
        const command = new SendEmailCommand(params);
        const response = await sesClient.send(command);
        console.log(`Email sent to ${to}:`, response.MessageId);
        return response;
    } catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
};
