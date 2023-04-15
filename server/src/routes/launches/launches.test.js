const request = require('supertest');
const app = require('../../server');

describe('Test GET /launches', () => {
    test('Should response with 200 success', async () => {
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test POST /launches', () => {
    test('Should response with 200 success.', () => {

    });

    test('Should catch missing required properties.', () => {

    });

    test('Should catch invalid dates.', () => {

    });
});