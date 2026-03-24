import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecentlyViewed from '../components/RecentlyViewed';
import { mockEmployers } from '../data/mockData';
import './EmployeeHome.css';

export default function EmployeeHome() {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const workplaceSuggestions = mockEmployers.filter(emp => 
    !emp.employees?.includes(user?.id) && emp.isPublic !== false
  ).slice(0, 3);

  const hasAnyPortfolioContent = (() => {
    const p = user?.portfolio;
    if (!p) return false;
    const hasListContent =
      (p.projects?.length || 0) > 0 ||
      (p.experience?.length || 0) > 0 ||
      (p.education?.length || 0) > 0 ||
      (p.skills?.length || 0) > 0;
    const socials = p.socials || {};
    const hasSocial =
      !!socials.linkedin || !!socials.github || !!socials.twitter || !!socials.portfolio;
    return hasListContent || hasSocial;
  })();

  return (
    <div className="employee-home">
      <div className="grid-3" style={{ marginTop: '2rem' }}>
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
            <div className="mt-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/employee/portfolio-builder')}
              >
                {user?.portfolio ? 'Edit Portfolio' : 'Create Portfolio'}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/employee/portfolio')}
                disabled={!hasAnyPortfolioContent}
                title={hasAnyPortfolioContent ? 'View your portfolio' : 'Add some portfolio content first'}
              >
                View Portfolio
              </button>
            </div>
          </div>

          <div className="glass-card mt-3">
            <h3>Profile Visibility</h3>
            <p className="section-subtitle">
              Control whether your profile is visible to other users in search and suggestions.
            </p>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span className="tag" style={{ textTransform: 'uppercase' }}>
                {user?.isPublic === false ? 'Private' : 'Public'}
              </span>
              <button
                className="btn btn-secondary"
                onClick={() => updateUserProfile({ isPublic: user?.isPublic === false ? true : false })}
              >
                {user?.isPublic === false ? 'Make Profile Public' : 'Make Profile Private'}
              </button>
            </div>
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
