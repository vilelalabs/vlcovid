const express = require('express');

const Cases = require('../models/dbFunctions');

const router = express.Router();

//endpoints for /dates

/**
 * @swagger
 * /dates:
 *  get:
 *      description: Returns cases count for the selected date for each country divided by variant
 *         
 *      responses:
 *          200:
 *              description: Successful request
 *          404:
 *              description: Not found any data in the database
 *          500:
 *              description: Internal Server Error / Error retrieving data from the database
 */
router.get('/', (req, res) => {

    Cases.getDates()
        .then(data => {
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({ message: 'No data found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
});

module.exports = router;