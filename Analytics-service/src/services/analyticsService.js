const { Worker } = require('worker_threads');

function runAnalyticsWorker(productData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker/analyticsWorker.js', {
            workerData: productData
        });

        worker.on('message', (result) => {
            console.log('Analytics Updated:', result);
            resolve(result);
        });

        worker.on('error', (error) => {
            console.error('Worker Error:', error);
            reject(error);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

module.exports = { runAnalyticsWorker };
