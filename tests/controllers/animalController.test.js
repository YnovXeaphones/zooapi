const request = require('supertest');
const app = require('../../app');

let authToken = '';
let cageId = '';
let animalId = '';

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

  // Create a cage
  const createCageResponse = await request(app)
    .post('/api/v1/cages')
    .set('Authorization', `Bearer ${authToken}`)
    .send({ name: "Cage 1", zooId: zooId });

  cageId = createCageResponse.body.id;
});

describe('Animal Controller', () => {
  it('should create a new animal and return 201', async () => {
    const newAnimal = { name: "Lion", specie: "Panthera leo", diet: "Carnivore", cageId: cageId };

    const response = await request(app)
      .post('/api/v1/animals')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newAnimal);

    expect(response.statusCode).toBe(201);
  });

  it('should return all animals', async () => {
    const response = await request(app)
    .get('/api/v1/animals')
    .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Lion',
          specie: 'Panthera leo',
          diet: 'Carnivore',
          cageId: cageId,
        }),
      ])
    );

    animalId = response.body[0].id;
  });

  it('should return a single animal when given a valid ID', async () => {
    const response = await request(app)
    .get('/api/v1/animals/' + animalId)
    .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Lion',
        specie: 'Panthera leo',
        diet: 'Carnivore',
        cageId: cageId,
      })
    );
  });

  it('should return a 404 when animal is not found', async () => {
    const response = await request(app)
    .get('/api/v1/animals/999')
    .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({});
  });

  it('should update an existing animal and return 200', async () => {
    const updatedAnimal = { name: "Updated Lion" };

    const response = await request(app)
      .put('/api/v1/animals/' + animalId)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedAnimal);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Updated Lion',
        specie: 'Panthera leo',
        diet: 'Carnivore',
        cageId: cageId,
      })
    );
  });

  it('should delete an existing animal and return 200', async () => {
    const response = await request(app)
      .delete('/api/v1/animals/' + animalId)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
  });

  it('should return 404 when trying to delete an animal that does not exist', async () => {
    const response = await request(app)
      .delete('/api/v1/animals/999')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(404);
  });
});
