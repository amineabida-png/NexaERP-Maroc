const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'NexaERP API' });
});

app.post('/auth/login', (req, res) => {
  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ message: 'email requis' });
  }
  return res.json({
    accessToken: 'demo-token',
    user: { id: 'u_1', email, role: 'admin' }
  });
});

app.get('/admin/tenants', (req, res) => {
  res.json([
    { id: 't_1', name: 'NexaERP Demo Company', country: 'MA', currency: 'MAD' }
  ]);
});

app.get('/crm/leads', (req, res) => {
  res.json([
    { id: 'l_1', fullName: 'Client Prospect', status: 'new', source: 'website' }
  ]);
});

app.get('/sales/quotes', (req, res) => {
  res.json([
    { id: 'q_1', reference: 'DEV-2026-0001', amount: 12000, currency: 'MAD', status: 'draft' }
  ]);
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    method: req.method,
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }

  const status = err.status || 500;
  return res.status(status).json({
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
