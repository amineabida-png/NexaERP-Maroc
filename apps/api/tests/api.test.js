const request = require('supertest');
const app = require('../src/app');

describe('NexaERP API', () => {
  it('GET /health should return service status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      service: 'NexaERP API'
    });
  });

  it('GET /admin/tenants should return tenants list', async () => {
    const res = await request(app).get('/admin/tenants');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toMatchObject({
      id: 't_1',
      name: 'NexaERP Demo Company'
    });
  });

  it('GET /crm/leads should return leads list', async () => {
    const res = await request(app).get('/crm/leads');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toMatchObject({
      id: 'l_1',
      status: 'new'
    });
  });

  it('GET /sales/quotes should return quotes list', async () => {
    const res = await request(app).get('/sales/quotes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toMatchObject({
      id: 'q_1',
      reference: 'DEV-2026-0001'
    });
  });

  it('POST /auth/login should return token when email is provided', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@nexa.ma' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken', 'demo-token');
    expect(res.body).toHaveProperty('user.email', 'admin@nexa.ma');
  });

  it('POST /auth/login should return 400 when email is missing', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: 'email requis' });
  });

  it('POST /auth/login should return 400 when email is empty', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: 'email requis' });
  });

  it('GET unknown route should return 404 JSON', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      message: 'Route not found',
      method: 'GET',
      path: '/unknown-route'
    });
  });

  it('PUT /health should return 404 JSON', async () => {
    const res = await request(app).put('/health');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      message: 'Route not found',
      method: 'PUT',
      path: '/health'
    });
  });

  it('Malformed JSON should return 400 JSON', async () => {
    const res = await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send('{"email": }');

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: 'Invalid JSON payload' });
  });
});
