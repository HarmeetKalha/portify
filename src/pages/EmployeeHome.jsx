import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import RecentlyViewed from '../components/RecentlyViewed';
import { api } from '../services/api';
import './EmployeeHome.css';

function PortfolioPreview({ portfolio, user }) {
  if (!portfolio) return null;

  const hasContent =
    (portfolio.skills?.length > 0) ||
    (portfolio.projects?.length > 0 && portfolio.projects[0]?.title) ||
    (portfolio.experience?.length > 0 && portfolio.experience[0]?.company) ||
    (portfolio.education?.length > 0 && portfolio.education[0]?.degree);

  if (!hasContent) return null;

  return (
    <div className="portfolio-preview glass-card mt-3">
      {/* Header */}
      <div className="pp-header">
        <div className="pp-avatar-row">
          <img
            src={user.profilePicture}
            alt={user.name}
            className="pp-avatar"
          />
          <div>
            <h2 className="pp-name">{user.name}</h2>
            <p className="pp-role">{user.role}</p>
            {user.tags && (
              <div className="pp-tags">
                <span className="tag tag-primary">{user.tags.technical}</span>
                <span className="tag tag-success">{user.tags.softSkill}</span>
              </div>
            )}
          </div>
        </div>
        {user.bio && <p className="pp-bio">{user.bio}</p>}

        {/* Socials */}
        {portfolio.socials && (
          <div className="pp-socials">
            {portfolio.socials.linkedin && (
              <a href={portfolio.socials.linkedin} target="_blank" rel="noopener noreferrer" className="pp-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            )}
            {portfolio.socials.github && (
              <a href={portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="pp-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            )}
            {portfolio.socials.portfolio && (
              <a href={portfolio.socials.portfolio} target="_blank" rel="noopener noreferrer" className="pp-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Portfolio
              </a>
            )}
          </div>
        )}
      </div>

      {/* Skills */}
      {portfolio.skills?.length > 0 && (
        <div className="pp-section">
          <h3 className="pp-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Skills
          </h3>
          <div className="pp-skills">
            {portfolio.skills.map((skill, i) => (
              <span key={i} className="pp-skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {portfolio.projects?.length > 0 && portfolio.projects[0]?.title && (
        <div className="pp-section">
          <h3 className="pp-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Projects
          </h3>
          {portfolio.projects.map((project, i) => {
            if (!project.title) return null;
            const techs = Array.isArray(project.technologies)
              ? project.technologies
              : (project.technologies ? project.technologies.split(',').map(t => t.trim()) : []);
            return (
              <div key={i} className="pp-card">
                <div className="pp-card-header">
                  <h4>{project.title}</h4>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="pp-link">
                      View →
                    </a>
                  )}
                </div>
                <p className="pp-card-desc">{project.description}</p>
                {techs.length > 0 && (
                  <div className="pp-techs">
                    {techs.map((t, j) => <span key={j} className="pp-tech-badge">{t}</span>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Experience */}
      {portfolio.experience?.length > 0 && portfolio.experience[0]?.company && (
        <div className="pp-section">
          <h3 className="pp-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Experience
          </h3>
          {portfolio.experience.map((exp, i) => {
            if (!exp.company) return null;
            return (
              <div key={i} className="pp-card">
                <div className="pp-exp-header">
                  <div>
                    <h4>{exp.role}</h4>
                    <p className="pp-company">{exp.company}</p>
                  </div>
                  <span className="pp-duration">{exp.duration}</span>
                </div>
                <p className="pp-card-desc">{exp.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Education */}
      {portfolio.education?.length > 0 && portfolio.education[0]?.degree && (
        <div className="pp-section">
          <h3 className="pp-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            Education
          </h3>
          {portfolio.education.map((edu, i) => {
            if (!edu.degree) return null;
            return (
              <div key={i} className="pp-card">
                <h4>{edu.degree}</h4>
                <p className="pp-company">{edu.institution}</p>
                <p className="pp-duration">{edu.year}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function EmployeeHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [allEmployers, setAllEmployers] = useState([]);

  useEffect(() => {
    api.getEmployers().then(setAllEmployers).catch(() => setAllEmployers([]));
  }, []);

  const workplaceSuggestions = allEmployers.filter(emp =>
    !emp.employees?.includes(user?.id)
  ).slice(0, 3);

  return (
    <div className="employee-home">
      <header className="home-header">
        <div className="header-content">
          <h1 className="text-gradient">Portify</h1>
          <div className="header-actions">
            <span className="user-name">Welcome, {user?.name}</span>
            <button
              className="btn btn-outline"
              onClick={() => navigate('/employee/inventory')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              My Documents
            </button>
            <button className="btn btn-outline" onClick={logout}>Logout</button>
          </div>
        </div>
        <SearchBar />
      </header>

      <div className="grid-3">
        <aside className="sidebar-left">
          <RecentlyViewed />
        </aside>

        <main className="main-content">
          <div className="portfolio-builder-card glass-card">
            <div className="builder-icon-wrapper">
              <button
                className="builder-icon-btn"
                onClick={() => navigate('/employee/portfolio-builder')}
              >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
            <h2>Build Your Portfolio</h2>
            <p>Showcase your skills, projects, and experience to stand out to employers</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate('/employee/portfolio-builder')}
            >
              {user?.portfolio ? 'Edit Portfolio' : 'Create Portfolio'}
            </button>
          </div>

          {user?.tags && (
            <div className="current-tags glass-card mt-3">
              <h3>Your Tags</h3>
              <div className="tags-display">
                <span className="tag tag-primary">{user.tags.technical}</span>
                <span className="tag tag-success">{user.tags.softSkill}</span>
              </div>
              <p className="tags-info">
                These tags are automatically generated based on your portfolio and help employers find you
              </p>
            </div>
          )}

          {/* View Portfolio Section */}
          {user?.portfolio && (
            <div className="mt-3">
              <div className="view-portfolio-heading">
                <h2>My Portfolio</h2>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => navigate('/employee/portfolio-builder')}
                >
                  ✏️ Edit
                </button>
              </div>
              <PortfolioPreview portfolio={user.portfolio} user={user} />
            </div>
          )}
        </main>

        <aside className="sidebar-right">
          <div className="workplace-suggestions">
            <h3>Workplace Suggestions</h3>
            <p className="section-subtitle">Companies looking for talent like you</p>

            {workplaceSuggestions.length > 0 ? (
              <div className="suggestions-list">
                {workplaceSuggestions.map(employer => (
                  <div key={employer.id} className="workplace-card glass-card">
                    <img
                      src={employer.logo}
                      alt={employer.companyName}
                      className="company-logo"
                    />
                    <h4>{employer.companyName}</h4>
                    <p className="company-industry">{employer.industry}</p>
                    <p className="company-desc">{employer.description?.substring(0, 80)}...</p>
                    <button
                      className="btn btn-secondary w-full mt-2"
                      onClick={() => navigate(`/profile/${employer.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Complete your portfolio to get personalized suggestions</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
