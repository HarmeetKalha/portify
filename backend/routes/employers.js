const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

function parseEmployer(row) {
  if (!row) return null;
  return {
    ...row,
    type: 'employer',
    companyName: row.company_name,
    employees: JSON.parse(row.employee_ids || '[]'),
    recentlyViewed: JSON.parse(row.recently_viewed || '[]'),
  };
}

// GET /api/employers
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const rows = db.all('SELECT * FROM employers');
    res.json(rows.map(parseEmployer));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/employers/:id
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const row = db.get('SELECT * FROM employers WHERE id = ?', [parseInt(req.params.id)]);
    if (!row) return res.status(404).json({ error: 'Employer not found' });
    res.json(parseEmployer(row));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT /api/employers/:id
router.put('/:id', (req, res) => {
  try {
    const db = getDb();
    const id = parseInt(req.params.id);
    const existing = db.get('SELECT * FROM employers WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ error: 'Employer not found' });

    const name         = req.body.name        ?? existing.name;
    const company_name = req.body.companyName ?? existing.company_name;
    const industry     = req.body.industry    ?? existing.industry;
    const description  = req.body.description ?? existing.description;
    const logo         = req.body.logo        ?? existing.logo;
    const employee_ids = req.body.employees !== undefined ? JSON.stringify(req.body.employees) : existing.employee_ids;

    db.run(
      'UPDATE employers SET name=?, company_name=?, industry=?, description=?, logo=?, employee_ids=? WHERE id=?',
      [name, company_name, industry, description, logo, employee_ids, id]
    );
    const updated = db.get('SELECT * FROM employers WHERE id = ?', [id]);
    res.json(parseEmployer(updated));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
