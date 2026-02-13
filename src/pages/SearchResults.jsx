import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockEmployees } from '../data/mockData';
import { searchByName } from '../utils/matchingEngine';
import ProfileCard from '../components/ProfileCard';
import './SuggestedAccounts.css';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToRecentlyViewed } = useAuth();
  const query = searchParams.get('q') || '';

  const results = searchByName(query, mockEmployees);

  return (
    <div className="suggested-accounts">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>Search Results</h1>
      </header>

      <div className="search-criteria glass-card">
        <h3>Searching for: "{query}"</h3>
        <p>{results.length} result{results.length !== 1 ? 's' : ''} found</p>
      </div>

      <div className="profiles-grid">
        {results.length > 0 ? (
          results.map(profile => (
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
            <h2>No results found for "{query}"</h2>
            <p>Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
}
