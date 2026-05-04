import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import './ProfileView.css';

// ── Application modal ──────────────────────────────────────────────────────
function ApplyModal({ employer, applicant, onClose, onSuccess }) {
  const [form, setForm] = useState({
    coverLetter: '',
    experience: applicant?.portfolio?.experience?.[0]?.company
      ? `${applicant.portfolio.experience[0].role} at ${applicant.portfolio.experience[0].company} (${applicant.portfolio.experience[0].duration})`
      : '',
    availability: '',
    resumeLink: applicant?.portfolio?.socials?.linkedin || '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.coverLetter.trim() || !form.availability.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await api.submitApplication({
        applicantId: applicant.id,
        applicantName: applicant.name,
        applicantEmail: applicant.email,
        applicantRole: applicant.role,
        applicantAvatar: applicant.profilePicture,
        applicantSkills: applicant.portfolio?.skills || [],
        applicantLinkedIn: applicant.portfolio?.socials?.linkedin || '',
        applicantGitHub: applicant.portfolio?.socials?.github || '',
        employerId: employer.id,
        employerName: employer.companyName,
        coverLetter: form.coverLetter,
        experience: form.experience,
        availability: form.availability,
        resumeLink: form.resumeLink,
      });
      setSubmitted(true);
      setTimeout(() => onSuccess(), 1800);
    } catch (err) {
      if (err.message === 'Already applied') {
        setError('You have already applied to this company.');
      } else {
        setError(err.message || 'Failed to submit application.');
      }
    }
  };

  return (
    <div className="apply-modal-overlay" onClick={onClose}>
      <div className="apply-modal glass-card" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="apply-success">
            <div className="apply-success-icon">✓</div>
            <h2>Application Sent!</h2>
            <p>Your application has been submitted to <strong>{employer.companyName}</strong>. Good luck!</p>
          </div>
        ) : (
          <>
            <div className="apply-modal-header">
              <div className="apply-company-info">
                <img src={employer.logo} alt={employer.companyName} className="apply-company-logo" />
                <div>
                  <h2>Apply to {employer.companyName}</h2>
                  <p className="apply-company-industry">{employer.industry}</p>
                </div>
              </div>
              <button className="apply-close-btn" onClick={onClose}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="apply-form">
              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter *</label>
                <textarea
                  id="coverLetter"
                  className="input textarea"
                  rows={5}
                  placeholder={`Tell ${employer.companyName} why you're a great fit for their team...`}
                  value={form.coverLetter}
                  onChange={e => setForm({ ...form, coverLetter: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="applyExperience">Most Relevant Experience</label>
                <input
                  id="applyExperience"
                  type="text"
                  className="input"
                  placeholder="e.g., Senior Developer at Infosys (2021–Present)"
                  value={form.experience}
                  onChange={e => setForm({ ...form, experience: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability">Availability / Notice Period *</label>
                <input
                  id="availability"
                  type="text"
                  className="input"
                  placeholder="e.g., Immediate, 1 month notice, 15 days"
                  value={form.availability}
                  onChange={e => setForm({ ...form, availability: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="resumeLink">Resume / LinkedIn / Portfolio Link</label>
                <input
                  id="resumeLink"
                  type="text"
                  className="input"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={form.resumeLink}
                  onChange={e => setForm({ ...form, resumeLink: e.target.value })}
                />
              </div>

              <div className="apply-applicant-preview">
                <img src={applicant.profilePicture} alt={applicant.name} className="apply-applicant-avatar" />
                <div>
                  <p className="apply-applicant-name">{applicant.name}</p>
                  <p className="apply-applicant-role">{applicant.role}</p>
                  {applicant.portfolio?.skills?.length > 0 && (
                    <div className="apply-skills">
                      {applicant.portfolio.skills.slice(0, 4).map((s, i) => (
                        <span key={i} className="pp-skill-badge">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="apply-actions">
                <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Application</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function ProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToRecentlyViewed, user: currentUser, userType } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applied, setApplied] = useState(false);
  const [publicDocs, setPublicDocs] = useState([]);

  useEffect(() => {
    const numId = parseInt(id);

    // Try employee first, then employer
    async function loadProfile() {
      try {
        const emp = await api.getEmployee(numId);
        setProfile(emp);

        // Load public docs from DB
        api.getInventory(numId)
          .then(docs => setPublicDocs(docs.filter(d => d.isPublic)))
          .catch(() => setPublicDocs([]));
      } catch {
        try {
          const emr = await api.getEmployer(numId);
          setProfile(emr);
        } catch {
          setProfile(null);
        }
      }
      setLoading(false);
    }

    loadProfile();
  }, [id]);

  useEffect(() => {
    if (profile?.id) addToRecentlyViewed(profile.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  // Check already applied
  useEffect(() => {
    if (!profile || !currentUser || profile.type !== 'employer') return;
    api.checkApplied(profile.id, currentUser.id)
      .then(({ alreadyApplied }) => { if (alreadyApplied) setApplied(true); })
      .catch(() => {});
  }, [profile, currentUser]);

  if (loading) {
    return (
      <div className="profile-view">
        <div className="not-found glass-card"><p>Loading profile...</p></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-view">
        <div className="not-found glass-card">
          <h2>Profile not found</h2>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const isEmployer = profile.type === 'employer' || !!profile.companyName;

  if (isEmployer) {
    return (
      <div className="profile-view">
        <header className="profile-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
        </header>

        <div className="profile-content">
          <div className="profile-main glass-card">
            <div className="profile-hero">
              <img
                src={profile.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.companyName}`}
                alt={profile.companyName}
                className="profile-avatar-large"
              />
              <div className="profile-title">
                <h1>{profile.companyName || profile.name}</h1>
                <p className="profile-role-large">{profile.industry}</p>
                <div className="profile-tags-large">
                  <span className="tag tag-accent">Employer</span>
                </div>

                {userType === 'employee' && (
                  <div className="apply-here-wrapper">
                    {applied ? (
                      <div className="already-applied-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                        Application Submitted
                      </div>
                    ) : (
                      <button className="btn btn-apply" onClick={() => setShowApplyModal(true)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        Apply Here
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="profile-bio-section">
              <h2>About</h2>
              <p>{profile.description}</p>
            </div>
          </div>
        </div>

        {showApplyModal && (
          <ApplyModal
            employer={profile}
            applicant={currentUser}
            onClose={() => setShowApplyModal(false)}
            onSuccess={() => { setShowApplyModal(false); setApplied(true); }}
          />
        )}
      </div>
    );
  }

  // Employee profile
  const catColors = {
    resume:      { color: '#0ea5e9', bg: '#e0f2fe' },
    certificate: { color: '#f59e0b', bg: '#fef3c7' },
    research:    { color: '#8b5cf6', bg: '#ede9fe' },
    personal:    { color: '#ef4444', bg: '#fee2e2' },
    project:     { color: '#06b6d4', bg: '#cffafe' },
    other:       { color: '#6b7280', bg: '#f3f4f6' },
  };
  const catLabel = { resume: 'Resume / CV', certificate: 'Certificate', research: 'Research Paper', personal: 'Personal Doc', project: 'Project Report', other: 'Other' };

  return (
    <div className="profile-view">
      <header className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
      </header>

      <div className="profile-content">
        <div className="profile-main glass-card">
          <div className="profile-hero">
            <img src={profile.profilePicture} alt={profile.name} className="profile-avatar-large" />
            <div className="profile-title">
              <h1>{profile.name}</h1>
              <p className="profile-role-large">{profile.role}</p>
              {profile.tags && (
                <div className="profile-tags-large">
                  <span className="tag tag-primary">{profile.tags.technical}</span>
                  <span className="tag tag-success">{profile.tags.softSkill}</span>
                </div>
              )}
            </div>
          </div>

          <div className="profile-bio-section">
            <h2>About</h2>
            <p>{profile.bio}</p>
          </div>

          {profile.portfolio?.socials && (
            <div className="profile-socials">
              {profile.portfolio.socials.linkedin && (
                <a href={profile.portfolio.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              )}
              {profile.portfolio.socials.github && (
                <a href={profile.portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
              )}
              {profile.portfolio.socials.portfolio && (
                <a href={profile.portfolio.socials.portfolio} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Portfolio
                </a>
              )}
            </div>
          )}

          {profile.portfolio?.skills?.length > 0 && (
            <div className="profile-section">
              <h2>Skills</h2>
              <div className="skills-grid">
                {profile.portfolio.skills.map((skill, index) => (
                  <span key={index} className="skill-badge-large">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {profile.portfolio?.projects?.length > 0 && (
            <div className="profile-section">
              <h2>Projects</h2>
              {profile.portfolio.projects.map((project, index) => {
                const technologies = Array.isArray(project.technologies)
                  ? project.technologies
                  : (project.technologies ? project.technologies.split(',').map(t => t.trim()) : []);
                return (
                  <div key={index} className="project-card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {technologies.length > 0 && (
                      <div className="project-tech">
                        {technologies.map((tech, i) => <span key={i} className="tech-badge">{tech}</span>)}
                      </div>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">View Project →</a>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {profile.portfolio?.experience?.length > 0 && (
            <div className="profile-section">
              <h2>Experience</h2>
              {profile.portfolio.experience.map((exp, index) => (
                <div key={index} className="experience-card">
                  <div className="exp-header">
                    <div>
                      <h3>{exp.role}</h3>
                      <p className="exp-company">{exp.company}</p>
                    </div>
                    <span className="exp-duration">{exp.duration}</span>
                  </div>
                  <p className="exp-description">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {profile.portfolio?.education?.length > 0 && (
            <div className="profile-section">
              <h2>Education</h2>
              {profile.portfolio.education.map((edu, index) => (
                <div key={index} className="education-card">
                  <h3>{edu.degree}</h3>
                  <p className="edu-institution">{edu.institution}</p>
                  <p className="edu-year">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {publicDocs.length > 0 && (
            <div className="profile-section">
              <h2>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  Public Documents
                </span>
              </h2>
              <div className="pub-docs-grid">
                {publicDocs.map(doc => {
                  const cm = catColors[doc.category] || catColors.other;
                  return (
                    <div key={doc.id} className="pub-doc-card">
                      <div className="pub-doc-top">
                        <span className="pub-doc-ext" style={{ background: cm.bg, color: cm.color }}>
                          {doc.fileType?.toUpperCase().slice(0, 3) || 'DOC'}
                        </span>
                        <div className="pub-doc-info">
                          <p className="pub-doc-name">{doc.name}</p>
                          <p className="pub-doc-meta">
                            <span style={{ background: cm.bg, color: cm.color, padding: '0.1rem 0.5rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600 }}>
                              {catLabel[doc.category] || 'Other'}
                            </span>
                            &nbsp;·&nbsp;{doc.size}
                          </p>
                        </div>
                      </div>
                      {doc.description && <p className="pub-doc-desc">{doc.description}</p>}
                      {doc.previewUrl && (
                        <a href={doc.previewUrl} target="_blank" rel="noopener noreferrer" className="pub-doc-view-btn">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          View Document
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
