const request = require('supertest');
const app = require('../../server');

describe('Test GET /launches', () => {
    test('Should response with 200 success', async () => {
        const response = await request(app).get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        // expect(response.statusCode).toBe(200);
    });
});

describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'USS Enterprice',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186',
        launchDate: 'January 4, 2028'
    };

    const launchDataWithoutData = {
        mission: 'USS Enterprice',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186'
    };
    
    const launchDataWithInvalidDate = {
        mission: 'USS Enterprice',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186',
        launchDate: '44444'
    }

    test('Should response with 201 created.', async () => {
        const response = await request(app).post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);;
        
        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);
        
        // match object
        expect(response.body).toMatchObject(launchDataWithoutData);
    });

    test('Should catch missing required properties.', async () => {
        const response = await request(app).post('/launches')
            .send(launchDataWithoutData)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Messing require launch property.'
        });
    });

    test('Should catch invalid dates.', async () => {
        const response = await request(app).post('/launches')
            .send(launchDataWithoutData)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date.'
        });
    });
});