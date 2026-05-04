const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

function parseDoc(row) {
  return {
    ...row,
    isPublic: row.is_public === 1,
    uploadDate: row.upload_date,
    fileType: row.file_type,
    previewUrl: row.preview_url,
    isUserUpload: row.is_user_upload === 1,
  };
}

// GET /api/inventory/:employeeId
router.get('/:employeeId', (req, res) => {
  try {
    const db = getDb();
    const rows = db.all('SELECT * FROM inventory WHERE employee_id = ? ORDER BY upload_date DESC', [parseInt(req.params.employeeId)]);
    res.json(rows.map(parseDoc));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/inventory
router.post('/', (req, res) => {
  try {
    const db = getDb();
    const { employeeId, name, category, description, isPublic, uploadDate, size, fileType, previewUrl } = req.body;
    const id = Date.now();
    db.run(
      'INSERT INTO inventory (id, employee_id, name, category, description, is_public, upload_date, size, file_type, preview_url, is_user_upload) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)',
      [id, parseInt(employeeId), name, category, description || '', isPublic ? 1 : 0, uploadDate, size, fileType, previewUrl || '']
    );
    const created = db.get('SELECT * FROM inventory WHERE id = ?', [id]);
    res.status(201).json(parseDoc(created));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT /api/inventory/:id/toggle-public
router.put('/:id/toggle-public', (req, res) => {
  try {
    const db = getDb();
    const id = parseInt(req.params.id);
    const row = db.get('SELECT * FROM inventory WHERE id = ?', [id]);
    if (!row) return res.status(404).json({ error: 'Document not found' });
    db.run('UPDATE inventory SET is_public = ? WHERE id = ?', [row.is_public ? 0 : 1, id]);
    const updated = db.get('SELECT * FROM inventory WHERE id = ?', [id]);
    res.json(parseDoc(updated));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE /api/inventory/:id
router.delete('/:id', (req, res) => {
  try {
    const db = getDb();
    db.run('DELETE FROM inventory WHERE id = ?', [parseInt(req.params.id)]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
