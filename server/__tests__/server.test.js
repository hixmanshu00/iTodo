const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../index');
const User = require('../models/user');
const Todo = require('../models/todo');


describe('Todo API', () => {
  let token;
  let userId;
  let todoId;

  beforeAll(async () => {
    const user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });
    await user.save();
    userId = user._id;

    token = jwt.sign({ userId: user._id }, 'your-secret-key');
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Todo.deleteMany({});
    await mongoose.connection.close();
  });

  it('should register a user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });
    expect(response.statusCode).toBe(202);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should log in a user', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password123',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should add a new todo', async () => {
    const response = await request(app)
      .post(`/todos/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Todo',
        category: 'General',
        dueDate: '2024-08-28',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Todo added successfully');
    expect(response.body.todo).toHaveProperty('title', 'New Todo');
    todoId = response.body.todo._id;
  });

  it('should get all todos for a user', async () => {
    const response = await request(app)
      .get(`/users/${userId}/todos`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.todos).toBeInstanceOf(Array);
  });

  it('should toggle the status of a todo', async () => {
    const response = await request(app)
      .patch(`/todos/${todoId}/toggleStatus`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Todo status changed');
  });

  it('should toggle the priority of a todo', async () => {
    const response = await request(app)
      .patch(`/todos/${todoId}/togglePriority`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Todo priority changed');
  });

  it('should delete a todo', async () => {
    const response = await request(app)
      .delete(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Todo Deleted');
  });
});
