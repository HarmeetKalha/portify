const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── API Routes ─────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/employers', require('./routes/employers'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/applications', require('./routes/applications'));

// ── Health Check ───────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ── Frontend Static Serving (For Render Deployment) ──────────────────────
// This serves the built React app from the dist folder
const frontendDist = path.join(__dirname, '../dist');
app.use(express.static(frontendDist));

// For any other route, send back the React index.html file so React Router handles it
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// ── Error handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Portify backend running on port ${PORT}`);
});
