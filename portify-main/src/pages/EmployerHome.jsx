import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecentlyViewed from '../components/RecentlyViewed';
import { mockEmployees } from '../data/mockData';
import { matchEmployeesToRequirements } from '../utils/matchingEngine';
import { getApplicationsForEmployer } from '../utils/applicationsStore';
import './EmployerHome.css';

export default function EmployerHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState({ technical: '', softSkill: '' });

  const handleFindTalent = () => {
    if (requirements.technical || requirements.softSkill) {
      navigate('/employer/suggestions', { state: { requirements } });
    }
  };

  const currentEmployees = mockEmployees.filter(emp => 
    user?.employees?.includes(emp.id)
  );

  const applications = user?.id ? getApplicationsForEmployer(user.id) : [];

  return (
    <div className="employer-home">
      <div className="grid-3" style={{ marginTop: '2rem' }}>
        <aside className="sidebar-left">
          <RecentlyViewed />
          <div className="glass-card mt-3">
            <h3>Applications</h3>
            <p className="section-subtitle">People who applied to your company</p>

            {applications.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {applications.slice(0, 10).map(app => (
                  <div
                    key={app.id}
                    className="employee-card glass-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/profile/${app.employeeId}`)}
                  >
                    <img
                      src={app.employeeProfilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${app.employeeName}`}
                      alt={app.employeeName}
                      className="employee-avatar"
                    />
                    <div className="employee-info">
                      <h4>{app.employeeName}</h4>
                      <p className="employee-role">{app.details?.role || 'Applicant'}</p>
                      <div className="employee-tags">
                        <span className="tag tag-primary">{app.details?.phone || '—'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No applications yet</p>
              </div>
            )}
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

          <div className="glass-card mt-3">
            <h3>Profile Visibility</h3>
            <p className="section-subtitle">
              Control whether your company profile is visible to candidates in search and suggestions.
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
