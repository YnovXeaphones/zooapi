const request = require('supertest');
const app = require('../../app');

let authToken = '';
let cageId = '';

beforeAll(async () => {
    // Create a zoo
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
  
      zooId = createZooResponse.body.zoo_id;
  
    // Perform login to obtain token
    const loginResponse = await request(app)
      .post('/api/v1/login')
      .send({ 
        mail: 'test@test.fr', 
        password: 'password', 
        zooId: zooId 
      });
  
    authToken = loginResponse.body.token;
});

describe('Cages Controller', () => {
    it('should create a new cage and return 201', async () => {
      const newCage = { name: "Lion Cage" };
  
      const response = await request(app)
        .post('/api/v1/cages')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newCage);
  
      expect(response.statusCode).toBe(201);
    });
  
    it('should return all cages', async () => {
      const response = await request(app)
      .get('/api/v1/cages')
      .set('Authorization', `Bearer ${authToken}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Lion Cage",
          }),
        ])
      );
  
      cageId = response.body[0].id;
    });
  
    it('should return a single cage when given a valid ID', async () => {
      const response = await request(app)
      .get('/api/v1/cages/' + cageId)
      .set('Authorization', `Bearer ${authToken}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: "Lion Cage",
        })
      );
    });
  
    it('should return a 404 when cage is not found', async () => {
      const response = await request(app)
      .get('/api/v1/cages/999')
      .set('Authorization', `Bearer ${authToken}`);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({});
    });
  
    it('should update an existing cage and return 200', async () => {
      const updatedAnimal = { name: "Updated Lion Cage" };
  
      const response = await request(app)
        .put('/api/v1/cages/' + cageId)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedAnimal);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: "Updated Lion Cage",
        })
      );
    });
  
    it('should delete an existing animal and return 200', async () => {
      const response = await request(app)
        .delete('/api/v1/cages/' + cageId)
        .set('Authorization', `Bearer ${authToken}`);
  
      expect(response.statusCode).toBe(200);
    });
  
    it('should return 404 when trying to delete an animal that does not exist', async () => {
      const response = await request(app)
        .delete('/api/v1/cages/999')
        .set('Authorization', `Bearer ${authToken}`);
  
      expect(response.statusCode).toBe(404);
    });
  });
  