const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

function parseApp(row) {
  return {
    ...row,
    applicantSkills: JSON.parse(row.applicant_skills || '[]'),
    applicantId: row.applicant_id,
    applicantName: row.applicant_name,
    applicantEmail: row.applicant_email,
    applicantRole: row.applicant_role,
    applicantAvatar: row.applicant_avatar,
    applicantLinkedIn: row.applicant_linkedin,
    applicantGitHub: row.applicant_github,
    employerId: row.employer_id,
    employerName: row.employer_name,
    coverLetter: row.cover_letter,
    resumeLink: row.resume_link,
    appliedAt: row.applied_at,
  };
}

// GET /api/applications/employer/:employerId
router.get('/employer/:employerId', (req, res) => {
  try {
    const db = getDb();
    const rows = db.all('SELECT * FROM applications WHERE employer_id = ? ORDER BY applied_at DESC', [parseInt(req.params.employerId)]);
    res.json(rows.map(parseApp));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/applications/check/:employerId/:applicantId
router.get('/check/:employerId/:applicantId', (req, res) => {
  try {
    const db = getDb();
    const row = db.get('SELECT id FROM applications WHERE employer_id = ? AND applicant_id = ?', [parseInt(req.params.employerId), parseInt(req.params.applicantId)]);
    res.json({ alreadyApplied: !!row });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/applications
router.post('/', (req, res) => {
  try {
    const db = getDb();
    const { applicantId, applicantName, applicantEmail, applicantRole, applicantAvatar, applicantSkills, applicantLinkedIn, applicantGitHub, employerId, employerName, coverLetter, experience, availability, resumeLink } = req.body;

    const existing = db.get('SELECT id FROM applications WHERE employer_id = ? AND applicant_id = ?', [parseInt(employerId), parseInt(applicantId)]);
    if (existing) return res.status(409).json({ error: 'Already applied' });

    const appliedAt = new Date().toISOString();
    db.run(
      `INSERT INTO applications (applicant_id, applicant_name, applicant_email, applicant_role, applicant_avatar, applicant_skills, applicant_linkedin, applicant_github, employer_id, employer_name, cover_letter, experience, availability, resume_link, applied_at, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [parseInt(applicantId), applicantName, applicantEmail, applicantRole, applicantAvatar, JSON.stringify(applicantSkills || []), applicantLinkedIn || '', applicantGitHub || '', parseInt(employerId), employerName, coverLetter, experience || '', availability, resumeLink || '', appliedAt]
    );
    res.status(201).json({ appliedAt });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
