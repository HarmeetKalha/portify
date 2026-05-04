import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import RecentlyViewed from '../components/RecentlyViewed';
import { api } from '../services/api';
import './EmployerHome.css';

function RecentApplicants({ employerId }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!employerId) return;
    api.getApplications(employerId)
      .then(apps => setApplications([...apps].sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))))
      .catch(() => setApplications([]));
  }, [employerId]);

  if (applications.length === 0) {
    return (
      <div className="recent-applicants">
        <h3>Recent Applicants</h3>
        <p className="section-subtitle">People who applied to your company</p>
        <div className="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <p>No applications yet</p>
          <p className="empty-hint">Applications will appear here when candidates apply</p>
        </div>
      </div>
    );
  }

  const timeAgo = (iso) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="recent-applicants">
      <h3>Recent Applicants</h3>
      <p className="section-subtitle">{applications.length} application{applications.length !== 1 ? 's' : ''} received</p>

      <div className="applicants-list">
        {applications.map((app) => (
          <div key={app.id} className="applicant-card glass-card">
            <div
              className="applicant-card-header"
              onClick={() => setExpanded(expanded === app.id ? null : app.id)}
            >
              <img
                src={app.applicantAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${app.applicantName}`}
                alt={app.applicantName}
                className="applicant-avatar"
              />
              <div className="applicant-info">
                <p className="applicant-name">{app.applicantName}</p>
                <p className="applicant-role">{app.applicantRole}</p>
                <p className="applicant-time">{timeAgo(app.appliedAt)}</p>
              </div>
              <svg
                className={`applicant-chevron ${expanded === app.id ? 'rotated' : ''}`}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>

            {expanded === app.id && (
              <div className="applicant-details">
                {/* Cover Letter */}
                <div className="applicant-detail-section">
                  <p className="applicant-detail-label">Cover Letter</p>
                  <p className="applicant-detail-text">{app.coverLetter}</p>
                </div>

                {/* Experience */}
                {app.experience && (
                  <div className="applicant-detail-section">
                    <p className="applicant-detail-label">Relevant Experience</p>
                    <p className="applicant-detail-text">{app.experience}</p>
                  </div>
                )}

                {/* Availability */}
                <div className="applicant-detail-section">
                  <p className="applicant-detail-label">Availability</p>
                  <p className="applicant-detail-text">{app.availability}</p>
                </div>

                {/* Skills */}
                {app.applicantSkills?.length > 0 && (
                  <div className="applicant-detail-section">
                    <p className="applicant-detail-label">Skills</p>
                    <div className="applicant-skills">
                      {app.applicantSkills.slice(0, 6).map((s, i) => (
                        <span key={i} className="applicant-skill-badge">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="applicant-links">
                  {app.resumeLink && (
                    <a
                      href={app.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="applicant-link-btn"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Resume / Profile
                    </a>
                  )}
                  <button
                    className="applicant-view-profile-btn"
                    onClick={() => navigate(`/profile/${app.applicantId}`)}
                  >
                    View Full Profile →
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmployerHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState({ technical: '', softSkill: '' });
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    api.getEmployees().then(setAllEmployees).catch(() => setAllEmployees([]));
  }, []);

  const handleFindTalent = () => {
    if (requirements.technical || requirements.softSkill) {
      navigate('/employer/suggestions', { state: { requirements } });
    }
  };

  const currentEmployees = allEmployees.filter(emp =>
    user?.employees?.includes(emp.id)
  );

  return (
    <div className="employer-home">
      <header className="home-header">
        <div className="header-content">
          <h1 className="text-gradient">Portify</h1>
          <div className="header-actions">
            <span className="user-name">{user?.companyName}</span>
            <button className="btn btn-outline" onClick={logout}>Logout</button>
          </div>
        </div>
        <SearchBar />
      </header>

      <div className="grid-3">
        <aside className="sidebar-left">
          <RecentlyViewed />
          {/* Recent Applicants below Recently Viewed */}
          <div className="mt-3">
            <RecentApplicants employerId={user?.id} />
          </div>
        </aside>

        <main className="main-content">
          <div className="requirements-card glass-card">
            <h2>Find the Perfect Talent</h2>
            <p>Describe what you're looking for and we'll match you with the best candidates</p>

            <div className="requirements-form">
              <div className="form-group">
                <label htmlFor="technical">Technical Skills</label>
                <input
                  id="technical"
                  type="text"
                  className="input"
                  placeholder="e.g., Full-Stack Developer, AI Specialist, DevOps"
                  value={requirements.technical}
                  onChange={(e) => setRequirements({ ...requirements, technical: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="softSkill">Soft Skills</label>
                <input
                  id="softSkill"
                  type="text"
                  className="input"
                  placeholder="e.g., Team Leader, Detail-Oriented, Creative"
                  value={requirements.softSkill}
                  onChange={(e) => setRequirements({ ...requirements, softSkill: e.target.value })}
                />
              </div>

              <button
                className="btn btn-primary w-full"
                onClick={handleFindTalent}
                disabled={!requirements.technical && !requirements.softSkill}
              >
                Find Matching Candidates
              </button>
            </div>

            <div className="quick-suggestions">
              <p className="quick-title">Quick searches:</p>
              <div className="quick-buttons">
                <button
                  className="quick-btn"
                  onClick={() => setRequirements({ technical: 'Full-Stack Developer', softSkill: '' })}
                >
                  Full-Stack Developer
                </button>
                <button
                  className="quick-btn"
                  onClick={() => setRequirements({ technical: 'AI Specialist', softSkill: '' })}
                >
                  AI Specialist
                </button>
                <button
                  className="quick-btn"
                  onClick={() => setRequirements({ technical: '', softSkill: 'Team Leader' })}
                >
                  Team Leader
                </button>
              </div>
            </div>
          </div>
        </main>

        <aside className="sidebar-right">
          <div className="your-workplace">
            <h3>Your Workplace</h3>
            <p className="section-subtitle">Current team members</p>

            {currentEmployees.length > 0 ? (
              <div className="employees-list">
                {currentEmployees.map(employee => (
                  <div
                    key={employee.id}
                    className="employee-card glass-card"
                    onClick={() => navigate(`/profile/${employee.id}`)}
                  >
                    <img
                      src={employee.profilePicture}
                      alt={employee.name}
                      className="employee-avatar"
                    />
                    <div className="employee-info">
                      <h4>{employee.name}</h4>
                      <p className="employee-role">{employee.role}</p>
                      <div className="employee-tags">
                        <span className="tag tag-primary">{employee.tags?.technical}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <p>No team members yet</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
