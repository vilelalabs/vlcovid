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


describe('Dates route tests', () => {

    it('should return status 200 for GET /dates ', async () => {
        const res = await request(app).get('/dates');
        expect(res.statusCode).toBe(200);
    });

    it('should receive correct data lenght from GET /dates ', async () => {
        const res = await request(app).get('/dates');
        expect(res.body.length).toBe(dates.length);
    });
    it('should not be empty', async () => {
        const res = await request(app).get('/dates');
        expect(res.body.date).not.toBe([]);
        expect(res.status).not.toBe(404);
    });

    it('should have property date on object', async () => {
        const res = await request(app).get('/dates');
        expect(res.body[0]).toHaveProperty('date');
    });


});


afterAll(async () => {
    await db.destroy();
});