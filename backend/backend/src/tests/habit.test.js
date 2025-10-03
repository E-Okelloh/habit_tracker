const request = require('supertest');
const app = require('../src/server');

describe('Habit API', () => {
  let habitId;

  test('POST /api/habits - create habit', async () => {
    const res = await request(app)
      .post('/api/habits')
      .send({
        name: 'Exercise',
        description: 'Daily workout',
        color: '#10b981',
        target_frequency: 1
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Exercise');
    habitId = res.body.id;
  });

  test('GET /api/habits - get all habits', async () => {
    const res = await request(app).get('/api/habits');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/habits/:id - get single habit', async () => {
    const res = await request(app).get(`/api/habits/${habitId}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Exercise');
  });

  test('PUT /api/habits/:id - update habit', async () => {
    const res = await request(app)
      .put(`/api/habits/${habitId}`)
      .send({
        name: 'Morning Exercise',
        description: 'Updated',
        color: '#10b981',
        target_frequency: 1
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Morning Exercise');
  });

  test('DELETE /api/habits/:id - delete habit', async () => {
    const res = await request(app).delete(`/api/habits/${habitId}`);
    expect(res.status).toBe(204);
  });
});