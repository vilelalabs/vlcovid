require('dotenv').config();
const db = require('../dbConfig')
const Cases = require('../models/dbFunctions');

const request = require('supertest');
const app = require('../api');

let dates = [];
Cases.getDates()
    .then(data => {
        dates = data
    })
    .catch(err => dates = err);

async function getRandomDate() {
    await request(app).get('/dates');
    const datesValues = dates.map(date => date.date);
    let randomDate = new Date(datesValues[Math.floor(Math.random() * dates.length)]).toISOString().split('T')[0];
    return randomDate;
}


describe('Count route tests', () => {

    it('should return status 200 for GET /cases/:date/count ', async () => {

        let casesUrl = `/cases/${await getRandomDate()}/count`;
        const res = await request(app).get(casesUrl);
        expect(res.statusCode).toBe(200);
    });

    it('should not be empty', async () => {
        let casesUrl = `/cases/${await getRandomDate()}/count`;
        const res = await request(app).get(casesUrl);
        expect(res.body.count).not.toBe([]);
        expect(res.status).not.toBe(404);
    });
    it('should receive correct data from GET /cases/:date/count ', async () => {
        let casesUrl = `/cases/${await getRandomDate()}/count`;
        let randomCountData = dates[Math.floor(Math.random() * dates.length)];

        const res = await request(app).get(casesUrl);
        expect(res.body[0]).toEqual(randomCountData[0]);
    });
});


afterAll(async () => {
    await db.destroy();
});