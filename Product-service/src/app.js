const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const parseError = require('parse-error');
const cors = require('cors');
const rTracer = require('cls-rtracer');
const helmet = require('helmet');
const cluster = require('cluster');
const os = require('os');

const { log } = require('./services/log.service');
const { httpLogger, requestLogger } = require('./middleware/index');
const CONFIG = require('./config/config');
const routes = require('./routes/api/routes');
const setupSwagger = require('./swagger/swaggerSetup');
const database = require('./db/database'); 

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    // eslint-disable-next-line no-undef
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Optionally restart the worker
        cluster.fork();
    });
} else {

    // DATABASE ///
    const db = database.getDb();

    // Create global app object
    var app = express();

    // frontend accepted headers
    const corsOptions = {
        origin: CONFIG.origin,
        exposedHeaders: 'Authorization, x-csrf-token'
    };

    // Set application security headers
    if (CONFIG.app !== 'dev') {
        // Sets "X-Frame-Options: SAMEORIGIN"
        app.use(
            helmet.frameguard({
                action: 'SAMEORIGIN',
            })
        );
    }

    // CORS
    app.use(cors(corsOptions));

    // Normal express config defaults
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    morgan.token('id', function getId(req) {
        return req.id;
    });

    // use log middleware
    app.use(rTracer.expressMiddleware());
    app.use(httpLogger);
    app.use(morgan('combined'));

    if (CONFIG.app !== 'prod') {
        app.use(requestLogger);
    }

    app.use('/product-service/v1/api', routes);

    // Setup Swagger
    setupSwagger(app);

    app.use('/product-service/health', function(req, res) {
        res.statusCode = 200;
        res.json({
            status: 'success',
            message: 'Product Service is Healthy',
            data: {}
        });
    });

    app.use('/', function(req, res) {
        // send the appropriate status code
        res.statusCode = 200;
        res.json({
            status: 'success',
            message: 'Welcome to Product Service API',
            data: {}
        });
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    const PORT = CONFIG.port || 4001;
    console.log(PORT)
    app.listen(PORT, () => {
        // eslint-disable-next-line no-undef
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });

    // eslint-disable-next-line no-undef
    process.on('unhandledRejection', error => {
        log.error('Uncaught Error', parseError(error));
    });
}
