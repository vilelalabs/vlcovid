require('dotenv').config();

const { Server } = require('http');
const app = require('./api');

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});