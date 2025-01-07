const { parentPort, workerData } = require('worker_threads');
const AnalyticsDB = require('../db/analyticsDB');

async function processAnalytics(product) {
    try {
        const result = await AnalyticsDB.updateAnalytics(product);
        parentPort.postMessage({ status: 'success', data: result });
    } catch (error) {
        parentPort.postMessage({ status: 'error', error: error.message });
    }
}

processAnalytics(workerData);
