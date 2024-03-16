const request = require('supertest');
const app = require('../../app');
const userService = require('../../services/userService');

const users = [
    { id: 1, firstName: "Test", lastName: "Example", mail: "test@example.com", password: "password", access: "user", zooId: "zoo1" },
    { id: 2, firstName: "Test2", lastName: "Example2", mail: "test2@example.com", password: "password2", access: "admin", zooId: "zoo2" },
];

jest.mock('../../services/userService');

describe('User Controller', () => {

  it('should return all users', async () => {
    userService.getAllUsers.mockResolvedValue(users);
    userService.getUserById.mockImplementation(id => Promise.resolve(users.find(user => user.id === id)));

    const response = await request(app).get('/api/v1/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(users);
  });

//---------------------------------------

  /*it('should return a single user when given a valid ID', async () => {
    userService.getUserById.mockResolvedValue(users[0]);

    const response = await request(app).get('/users/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(users[0]);
  });*/

//---------------------------------------

  it('should return a 404 when user is not found', async () => {
    userService.getUserById.mockResolvedValue(null);

    const response = await request(app).get('/users/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({});
  });

//---------------------------------------

  /*it('should return a 500 when an error occurs', async () => {
    userService.getUserById.mockRejectedValue(new Error('An error occurred'));

    const response = await request(app).get('/users/1');

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual('An error occurred');
  });

//---------------------------------------

  it('should create a new user and return 201', async () => {
    const newUser = { 
      firstName: "New", 
      lastName: "User", 
      mail: "newuser@example.com", 
      password: "newpassword", 
      access: "user", 
      zooId: "zoo3" 
    };
    userService.createUser.mockResolvedValue({ id: 3, ...newUser });

    const response = await request(app)
      .post('/users')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newUser);
  });

//---------------------------------------

  it('should update an existing user and return 200', async () => {
    const updatedUser = { 
      id: 1,
      firstName: "Updated", 
      lastName: "User", 
      mail: "updated@example.com", 
      password: "updatedpassword", 
      access: "admin", 
      zooId: "zoo1"
    };
    userService.updateUserById.mockResolvedValue(updatedUser);

    const response = await request(app)
      .put('/users/1')
      .send({ firstName: "Updated", mail: "updated@example.com", password: "updatedpassword", access: "admin" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ firstName: "Updated" });
  });

//---------------------------------------

  it('should delete an existing user and return 200', async () => {
    const userIdToDelete = 1;
    userService.deleteUserById.mockResolvedValue(true);

    const response = await request(app)
      .delete(`/users/${userIdToDelete}`);

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('User deleted');
  });

//---------------------------------------

  /*it('should return 404 when trying to delete a user that does not exist', async () => {
    userService.deleteUserById.mockResolvedValue(false);

    const response = await request(app)
      .delete('/users/999');

    expect(response.statusCode).toBe(404);
    expect(response.text).toContain('User not found');
  });*/
});
