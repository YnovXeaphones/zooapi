const request = require('supertest');
const app = require('../../app');
const animalService = require('../../services/animalService');

const animals = [
  { id: 1, name: "Lion", specie: "Panthera leo", diet: "Carnivore", cageId: 1 },
  { id: 2, name: "Giraffe", specie: "Giraffa camelopardalis", diet: "Herbivore", cageId: 2 },
];

jest.mock('../../services/animalService');

describe('Animal Controller', () => {

  it('should return all animals', async () => {
    animalService.getAllAnimals.mockResolvedValue(animals);
    animalService.getAnimalById.mockImplementation(id => Promise.resolve(animals.find(animal => animal.id === id)));

    const response = await request(app).get('/api/v1/animals');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(animals);
  });

  /*it('should return all animals', async () => {
    const response = await request(app).get('/api/v1/animals');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(animals);
  });

//---------------------------------------

  it('should return a single animal when given a valid ID', async () => {
    animalService.getAnimalById.mockResolvedValue(animals[0]);

    const response = await request(app).get('/api/v1/animals/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(animals[0]);
  });

//---------------------------------------

  it('should return a 404 when animal is not found', async () => {
    animalService.getAnimalById.mockResolvedValue(null);

    const response = await request(app).get('/api/v1/animals/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({});
  });

//---------------------------------------

  it('should create a new animal and return 201', async () => {
    const newAnimal = { name: "Tiger", specie: "Panthera tigris", diet: "Carnivore", cageId: 3 };
    animalService.createAnimal.mockResolvedValue({ id: 3, ...newAnimal });

    const response = await request(app)
      .post('/api/v1/animals')
      .send(newAnimal);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newAnimal);
  });

//---------------------------------------

  it('should update an existing animal and return 200', async () => {
    const updatedAnimal = { id: 1, name: "Updated Lion", specie: "Panthera leo", diet: "Carnivore", cageId: 1 };
    animalService.updateAnimalById.mockResolvedValue(updatedAnimal);

    const response = await request(app)
      .put('/api/v1/animals/1')
      .send(updatedAnimal);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedAnimal);
  });

//---------------------------------------

  it('should delete an existing animal and return 200', async () => {
    const animalIdToDelete = 1;
    animalService.deleteAnimalById.mockResolvedValue(true);

    const response = await request(app)
      .delete(`/api/v1/animals/${animalIdToDelete}`);

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Animal deleted');
  });

//---------------------------------------

  it('should return 404 when trying to delete an animal that does not exist', async () => {
    animalService.deleteAnimalById.mockResolvedValue(false);

    const response = await request(app)
      .delete('/api/v1/animals/999');

    expect(response.statusCode).toBe(404);
    expect(response.text).toContain('Animal not found');
  });*/
});
