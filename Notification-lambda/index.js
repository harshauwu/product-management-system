import { sendEmail } from './services/sesService';

// Lambda handler for SQS event
export const lambdaHandler = async (event) => {
    console.log('Event:', JSON.stringify(event, null, 2));

    try {
        const emailPromises = event.Records.map(async (record) => {
            const messageBody = JSON.parse(record.body);
            const emailParams = {
                to: messageBody.email,
                subject: messageBody.subject,
                body: messageBody.body
            };
            // Send email
            return sendEmail(emailParams);
        });

        const results = await Promise.all(emailPromises);
        console.log('Emails Sent:', results);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Emails processed successfully' })
        };

    } catch (error) {
        console.error('Error processing notifications:', error);
        throw error;
    }
};
