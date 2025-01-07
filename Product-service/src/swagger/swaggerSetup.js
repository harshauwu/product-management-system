const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerDef');
const CONFIG = require('../config/config');

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    if (CONFIG.app === 'local' ||  CONFIG.app === 'dev' || CONFIG.app === 'qa') {
        app.use(
            '/product-service/v1/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerSpec, {
                customSiteTitle: 'E-Commerce Product Management API',
                customCss: '.topbar { display: none }',
                swaggerOptions: {
                    persistAuthorization: true
                }
            })
        );

        app.get('/product-service/v1/swagger.json', (req, res) => {
            res.json(swaggerSpec);
        });

        app.use('/product-service/logs', express.static('logs'));
    }
};

module.exports = setupSwagger;