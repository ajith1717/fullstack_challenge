const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'ADK-ER API Documentation',
        version: '1.0.0',
        description: 'API documentation for your all case forms',
    },
    servers: [
        {
            url: 'http://localhost:5001/api/case', // Change this to your server's URL
        },
        {
            url: 'https://adk-er.vercel.app/api/case', // Change this to your server's URL
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
