const request = require('supertest');
const app = require('../../app');

let authToken = '';

describe('Zoo Controller', () => {
    it('should create a new zoo and return 201', async () => {
        const createZooResponse = await request(app)
        .post('/api/v1/createZoo')
        .set('Content-type', 'application/json')
        .send({
            zoo_name: "testzoo",
            firstName: "testuser",
            lastName: "testuser",
            mail: "test@test.fr",
            password: "password"
        });

        expect(createZooResponse.statusCode).toBe(201);
        expect(createZooResponse.body).toHaveProperty('zoo_id');
    
        // Perform login to obtain token
        const zooId = createZooResponse.body.zoo_id;

        const loginResponse = await request(app)
        .post('/api/v1/login')
        .send({ 
            mail: 'test@test.fr', 
            password: 'password', 
            zooId: zooId 
        });
    
        authToken = loginResponse.body.token;
    });

    it('should update a zoo and return 200', async () => {
        const updateZooResponse = await request(app)
        .put('/api/v1/updateZoo')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: "updatedzoo" });

        expect(updateZooResponse.statusCode).toBe(200);
        expect(updateZooResponse.body).toEqual(
            expect.objectContaining({
              name: "updatedzoo",
            })
        );
    });

    it('should delete a zoo and return 200', async () => {
        const deleteZooResponse = await request(app)
        .delete('/api/v1/deleteZoo')
        .set('Authorization', `Bearer ${authToken}`);

        expect(deleteZooResponse.statusCode).toBe(200);
    });
});