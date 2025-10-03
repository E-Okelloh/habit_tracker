const request = require('supertest');
const app = require('../src/server');

describe('Entry API', () => {
  let habitId;
  let entryId;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/habits')
      .send({ name: 'Test Habit', target_frequency: 1 });
    habitId = res.body.id;
  });

  test('POST /api/entries - create entry', async () => {
    const res = await request(app)
      .post('/api/entries')
      .send({
        habit_id: habitId,
        completed: true,
        mood: 4,
        notes: 'Felt great!',
        date: new Date().toISOString().split('T')[0]
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    entryId = res.body.id;
  });

  test('GET /api/entries - get entries', async () => {
    const res = await request(app).get(`/api/entries?habitId=${habitId}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/entries/:id - update entry', async () => {
    const res = await request(app)
      .put(`/api/entries/${entryId}`)
      .send({
        completed: true,
        mood: 5,
        notes: 'Updated notes'
      });

    expect(res.status).toBe(200);
    expect(res.body.mood).toBe(5);
  });

  test('DELETE /api/entries/:id - delete entry', async () => {
    const res = await request(app).delete(`/api/entries/${entryId}`);
    expect(res.status).toBe(204);
  });

  afterAll(async () => {
    await request(app).delete(`/api/habits/${habitId}`);
  });
});