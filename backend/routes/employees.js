const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

function parseEmployee(row) {
  if (!row) return null;
  return {
    ...row,
    portfolio: JSON.parse(row.portfolio || '{}'),
    tags: JSON.parse(row.tags || '{}'),
    profilePicture: row.profile_picture,
  };
}

// GET /api/employees
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const rows = db.all('SELECT * FROM employees');
    res.json(rows.map(parseEmployee));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/employees/:id
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const row = db.get('SELECT * FROM employees WHERE id = ?', [parseInt(req.params.id)]);
    if (!row) return res.status(404).json({ error: 'Employee not found' });
    res.json(parseEmployee(row));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT /api/employees/:id  — full profile update
router.put('/:id', (req, res) => {
  try {
    const db = getDb();
    const id = parseInt(req.params.id);
    const existing = db.get('SELECT * FROM employees WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ error: 'Employee not found' });

    const name            = req.body.name            ?? existing.name;
    const role            = req.body.role            ?? existing.role;
    const bio             = req.body.bio             ?? existing.bio;
    const profile_picture = req.body.profilePicture  ?? existing.profile_picture;
    const portfolio       = req.body.portfolio !== undefined ? JSON.stringify(req.body.portfolio) : existing.portfolio;
    const tags            = req.body.tags       !== undefined ? JSON.stringify(req.body.tags)      : existing.tags;

    db.run(
      'UPDATE employees SET name=?, role=?, bio=?, profile_picture=?, portfolio=?, tags=? WHERE id=?',
      [name, role, bio, profile_picture, portfolio, tags, id]
    );
    const updated = db.get('SELECT * FROM employees WHERE id = ?', [id]);
    res.json(parseEmployee(updated));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
