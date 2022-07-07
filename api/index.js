const express = require('express');
const cors = require('cors');

const casesRoute = require('../routes/cases-routes');
const datesRoute = require('../routes/dates-routes');



const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ "message": "Backend Challenge 2021 🏅 - Covid Daily Cases" });
});

app.use('/cases', casesRoute);
app.use('/dates', datesRoute);

module.exports = app;