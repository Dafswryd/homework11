const request = require('supertest');
const app = require('../index');

describe('Todo Routes', () => {
    it('should get all todos', async () => {
        const response = await request(app)
            .get('/todo');

        console.log('Response Status Code:', response.statusCode);
        console.log('Response Body:', response.body);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Successfully get all notes');
        expect(response.body.notes).toBeDefined();
    });
    it('should create a new todo', async () => {
        const response = await request(app)
          .post('/todo')
          .send({ note: 'New Note' });
    
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Note succesfully created');
        expect(response.body.note).toBe('New Note');
      });
    
      it('should get a specific todo', async () => {
        const response = await request(app).get('/todo/2');
    
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Succesfully get this note');
        expect(response.body.detail).toBeDefined();
      });
    
      it('should return a 404 status if a specific todo is not found', async () => {
        const response = await request(app).get('/todo/999');
    
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Data not found');
      });
    
      it('should delete a specific todo', async () => {
        const response = await request(app).delete('/todo/1');
    
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Delete succesfullly');
      });
    
      it('should return a 404 status if trying to delete a non-existent todo', async () => {
        const response = await request(app).delete('/todo/999');
    
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Note not found');
      });
});
