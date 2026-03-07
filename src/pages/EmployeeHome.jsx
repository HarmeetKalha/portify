import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import RecentlyViewed from '../components/RecentlyViewed';
import { mockEmployers } from '../data/mockData';
import './EmployeeHome.css';

export default function EmployeeHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const workplaceSuggestions = mockEmployers.filter(emp => 
    !emp.employees?.includes(user?.id)
  ).slice(0, 3);

  return (
    <div className="employee-home">
      <header className="home-header">
        <div className="header-content">
          <h1 className="text-gradient">Portify</h1>
          <div className="header-actions">
            <span className="user-name">Welcome, {user?.name}</span>
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
