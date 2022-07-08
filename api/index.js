const express = require('express');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const casesRoute = require('../routes/cases-routes');
const datesRoute = require('../routes/dates-routes');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Covid-19 API',
            version: '1.0.0',
            description: 'Covid-19 API from dataset from Kaggle'
        }
    },
    apis: [
        'api/index.js',
        'routes/cases-routes.js',
        'routes/dates-routes.js'
    ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


const app = express();
app.use(cors());
app.use(express.json());


/**
 * @swagger
 * /:
 *  get:
 *      description: Returns the title of the challenge
 *      responses:
 *          200:
 *              description: Successful request
 */
app.get('/', (req, res) => {
    res.status(200).json({ "message": "Backend Challenge 2021 🏅 - Covid Daily Cases" });
});

app.use('/cases', casesRoute);
app.use('/dates', datesRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;