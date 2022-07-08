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


describe('Cumulative route tests', () => {
    it('should return status 200 for GET /cases/:date/cumulative ', async () => {
        let cumulativeUrl = `/cases/${await getRandomDate()}/cumulative`;
        const res = await request(app).get(cumulativeUrl);
        expect(res.statusCode).toBe(200);
    });

    it('should not be empty', async () => {
        let cumulativeUrl = `/cases/${await getRandomDate()}/cumulative`;
        const res = await request(app).get(cumulativeUrl);
        expect(res.body.cumulative).not.toBe([]);
        expect(res.status).not.toBe(404);
    });

    it('should receive correct data from GET /cases/:date/cumulative ', async () => {
        let cumulativeUrl = `/cases/${await getRandomDate()}/cumulative`;
        let randomCumulativeData = dates[Math.floor(Math.random() * dates.length)];

        const res = await request(app).get(cumulativeUrl);
        expect(res.body[0]).toEqual(randomCumulativeData[0]);
    });
});


afterAll(async () => {
    await db.destroy();
});