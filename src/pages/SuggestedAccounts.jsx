import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockEmployees } from '../data/mockData';
import { matchEmployeesToRequirements } from '../utils/matchingEngine';
import ProfileCard from '../components/ProfileCard';
import './SuggestedAccounts.css';

export default function SuggestedAccounts() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToRecentlyViewed } = useAuth();
  const requirements = location.state?.requirements;

  let suggestedProfiles = mockEmployees;
  
  if (requirements) {
    suggestedProfiles = matchEmployeesToRequirements(mockEmployees, requirements);
  }

  return (
    <div className="suggested-accounts">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Suggested Candidates</h1>
      </header>

      {requirements && (
        <div className="search-criteria glass-card">
          <h3>Search Criteria</h3>
          <div className="criteria-tags">
            {requirements.technical && (
              <span className="tag tag-primary">Technical: {requirements.technical}</span>
            )}
            {requirements.softSkill && (
              <span className="tag tag-success">Soft Skill: {requirements.softSkill}</span>
            )}
          </div>
        </div>
      )}

      <div className="profiles-grid">
        {suggestedProfiles.length > 0 ? (
          suggestedProfiles.map(profile => (
            <ProfileCard 
              key={profile.id} 
              profile={profile}
              onClick={addToRecentlyViewed}
            />
          ))
        ) : (
          <div className="no-results glass-card">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h2>No matching candidates found</h2>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
