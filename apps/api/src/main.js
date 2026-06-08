const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`NexaERP API listening on port ${port}`);
});
