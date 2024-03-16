const request = require('supertest');
const app = require('../../app');

let authToken = '';
let userId = '';

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

describe('User Controller', () => {

  it('should return all users', async () => {
    const response = await request(app)
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: "testuser",
          lastName: "testuser",
          mail: "test@test.fr"
        }),
      ])
    );

    userId = response.body[0].id;
  });

  it('should return a single user when given a valid ID', async () => {
    const response = await request(app)
    .get('/api/v1/users/' + userId)
    .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        firstName: "testuser",
        lastName: "testuser",
        mail: "test@test.fr"
      })
    );
  });

  it('should return a 404 when user is not found', async () => {
    const response = await request(app)
    .get('/api/v1/users/999')
    .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({});
  });

  it('should create a new user and return 201', async () => {
    const newUser = { 
      firstName: "New", 
      lastName: "User", 
      mail: "newuser@example.com", 
      password: "newpassword", 
      access: "crud"
    };

    const response = await request(app)
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        firstName: "New",
        lastName: "User",
        mail: "newuser@example.com"
      })
    );

    userId = response.body.id;
  });

  it('should update an existing user and return 200', async () => {
    const response = await request(app)
      .put('/api/v1/users/' + userId)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ firstame: "Updated" });

    expect(response.statusCode).toBe(200);
  });

  it('should delete an existing user and return 200', async () => {
    const response = await request(app)
      .delete('/api/v1/users/' + userId)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
  });

  it('should return 404 when trying to delete a user that does not exist', async () => {
    const response = await request(app)
      .delete('/api/v1/users/999')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toBe(404);
  });
});
