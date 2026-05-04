const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

function parseEmployee(row) {
  if (!row) return null;
  return { ...row, portfolio: JSON.parse(row.portfolio || '{}'), tags: JSON.parse(row.tags || '{}'), profilePicture: row.profile_picture };
}
function parseEmployer(row) {
  if (!row) return null;
  return { ...row, type: 'employer', companyName: row.company_name, employees: JSON.parse(row.employee_ids || '[]'), recentlyViewed: JSON.parse(row.recently_viewed || '[]') };
}

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password, type } = req.body;
    const db = getDb();

    if (type === 'employee') {
      const row = db.get('SELECT * FROM employees WHERE email = ? AND password = ?', [email, password]);
      if (!row) return res.status(401).json({ error: 'Invalid credentials' });
      return res.json({ user: parseEmployee(row), type: 'employee' });
    } else {
      const row = db.get('SELECT * FROM employers WHERE email = ? AND password = ?', [email, password]);
      if (!row) return res.status(401).json({ error: 'Invalid credentials' });
      return res.json({ user: parseEmployer(row), type: 'employer' });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  try {
    const { formData, type } = req.body;
    const db = getDb();

    const existsEmp = db.get('SELECT id FROM employees WHERE email = ?', [formData.email]);
    const existsEmr = db.get('SELECT id FROM employers WHERE email = ?', [formData.email]);
    if (existsEmp || existsEmr) return res.status(409).json({ error: 'Email already exists' });

    const newId = Date.now();

    if (type === 'employee') {
      const portfolio = JSON.stringify({ projects: [], experience: [], socials: { linkedin:'', github:'', twitter:'', portfolio:'' }, education: [], skills: [] });
      const tags = JSON.stringify({ technical: 'Developer', softSkill: 'Professional' });
      const pic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`;
      db.run(
        'INSERT INTO employees (id, name, email, password, role, profile_picture, bio, portfolio, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [newId, formData.name, formData.email, formData.password, formData.role || '', pic, formData.bio || '', portfolio, tags]
      );
      const created = db.get('SELECT * FROM employees WHERE id = ?', [newId]);
      return res.status(201).json({ user: parseEmployee(created), type: 'employee' });
    } else {
      const logo = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.companyName)}`;
      db.run(
        'INSERT INTO employers (id, name, email, password, company_name, industry, logo, description, employee_ids, recently_viewed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [newId, formData.companyName, formData.email, formData.password, formData.companyName, formData.industry || '', logo, formData.description || '', '[]', '[]']
      );
      const created = db.get('SELECT * FROM employers WHERE id = ?', [newId]);
      return res.status(201).json({ user: parseEmployer(created), type: 'employer' });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/auth/profile/:type/:id  — reload fresh user from DB (used after updates)
router.get('/profile/:type/:id', (req, res) => {
  try {
    const db = getDb();
    const id = parseInt(req.params.id);
    if (req.params.type === 'employee') {
      const row = db.get('SELECT * FROM employees WHERE id = ?', [id]);
      if (!row) return res.status(404).json({ error: 'Not found' });
      return res.json(parseEmployee(row));
    } else {
      const row = db.get('SELECT * FROM employers WHERE id = ?', [id]);
      if (!row) return res.status(404).json({ error: 'Not found' });
      return res.json(parseEmployer(row));
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
