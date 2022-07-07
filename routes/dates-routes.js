const express = require('express');

const Cases = require('../models/dbFunctions');

const router = express.Router();

//endpoints for /dates
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