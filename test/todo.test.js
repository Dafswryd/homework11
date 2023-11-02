const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../models/todo');
app.use(express.json());
app.use('/api', router);

describe('API Endpoints', () => {
  // Test POST /api/todo
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todo')
      .send({ note: 'Test Note' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Note successfully created');
    expect(res.body).toHaveProperty('note', 'Test Note');
  });

  // Test GET /api/todo
  it('should get all todos', async () => {
    const res = await request(app).get('/api/todo');
    expect(res.statusCode).toEqual(200);
  });

  // Test GET /api/todo/:id
  it('should get a specific todo by ID', async () => {
    const res = await request(app).get('/api/todo/1');
    expect(res.statusCode).toEqual(404);
  });

  // Test DELETE /api/todo/:id
  it('should delete a specific todo by ID', async () => {
    const res = await request(app).delete('/api/todo/1');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Note not found');
  });

});
