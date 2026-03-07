import { useAuth, getAllAccounts } from '../context/AuthContext';
import ProfileCard from './ProfileCard';
import './RecentlyViewed.css';

export default function RecentlyViewed() {
  const { user, recentlyViewed, addToRecentlyViewed } = useAuth();

  const allEmployees = getAllAccounts('employee');
  const allEmployers = getAllAccounts('employer');

  const recentProfiles = recentlyViewed
    .map(id => allEmployees.find(emp => emp.id === id) || allEmployers.find(emp => emp.id === id))
    .filter(profile => {
      if (!profile) return false;
      // Always allow employers and your own profile, respect visibility for other employees
      const isEmployer = profile.type === 'employer' || profile.companyName;
      const isSelf = user && Number(user.id) === Number(profile.id);
      if (isEmployer || isSelf) return true;
      return profile.isPublic !== false;
    })
    .slice(0, 5);

  if (recentProfiles.length === 0) {
    return (
      <div className="recently-viewed">
        <h3>Recently Viewed</h3>
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <p>No recently viewed profiles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recently-viewed">
      <h3>Recently Viewed</h3>
      <div className="recent-profiles">
        {recentProfiles.map(profile => (
          <ProfileCard 
            key={profile.id} 
            profile={profile}
            onClick={addToRecentlyViewed}
          />
        ))}
      </div>
    </div>
  );
}
