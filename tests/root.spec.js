const request = require('supertest');
const app = require('../api');


describe('Root route tests', () => {
    it('should return status 200 for GET / ', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });
    it('should receive right message from GET / ', async () => {
        const res = await request(app).get('/');
        expect(res.body).toEqual({ "message": "Backend Challenge 2021 🏅 - Covid Daily Cases" });
    });

});
