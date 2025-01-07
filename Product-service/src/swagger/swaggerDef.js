const swaggerJsDoc = require('swagger-jsdoc');
const { name, version } = require('../../package.json');
const { port } = require('../config/config');
const path = require('path');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: name,
            version: version,
            description:
        'This is documentation for the Product Management API.<br><br> For every request you must include in the header: <br> <b>Content-Type: application/json</b> <br> <b>Authorization: Bearer <TOKEN></b> (Only for protected routes by authorization we use JWT.)<br>',
            termsOfService: 'http://swagger.io/terms/',
            contact: {
                email: 'harshauwu@gmail.com'
            },
            license: {
                name: 'Apache 2.0',
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
            },
            basePath: '/',
            schemes: ['http'],
            tags: [
                {
                    name: 'product-service',
                    description: 'Product Service'
                }
            ],
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'JWT Authentication Token'
                }
            },
            security: [{ JWT: [] }],
            defaultSecurity: 'basicAuth'
        },
        servers: [
            {
                url: `http://localhost:${port}/product-service/v1`,
                description: 'Local development environment'
            },
            {
                url:'https://qtewh4npvi.execute-api.us-west-2.amazonaws.com/dev/product-service/v1',
                description: 'Dev environment'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        path.resolve(__dirname, './routes/*.js'),
        path.resolve(__dirname, '../routes/api/v1/*.routes.js')
    ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;