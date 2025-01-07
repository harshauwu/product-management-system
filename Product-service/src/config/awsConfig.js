/* eslint-disable no-undef */
require('dotenv').config();

const CONFIG = {};

CONFIG.aws_access_key_id = process.env.AWS_ACCESS_KEY_ID || '';
CONFIG.aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY || '';
CONFIG.aws_region = process.env.AWS_REGION || 'us-west-2';
CONFIG.sns_topic_arn = process.env.SNS_TOPIC_ARN || '';
CONFIG.sqs_url = process.env.SQS_URL || '';

module.exports = CONFIG;