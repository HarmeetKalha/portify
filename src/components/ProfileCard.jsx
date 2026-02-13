import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';

export default function ProfileCard({ profile, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(profile.id);
    }
    navigate(`/profile/${profile.id}`);
  };

  return (
    <div className="profile-card glass-card" onClick={handleClick}>
      <div className="profile-card-header">
        <img 
          src={profile.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`}
          alt={profile.name}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h3>{profile.name}</h3>
          <p className="profile-role">{profile.role}</p>
        </div>
      </div>

      <p className="profile-bio">{profile.bio?.substring(0, 100)}...</p>

      {profile.tags && (
        <div className="profile-tags">
          <span className="tag tag-primary">{profile.tags.technical}</span>
          <span className="tag tag-success">{profile.tags.softSkill}</span>
        </div>
      )}

      {profile.portfolio?.skills && (
        <div className="profile-skills">
          {profile.portfolio.skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="skill-badge">{skill}</span>
          ))}
          {profile.portfolio.skills.length > 4 && (
            <span className="skill-badge">+{profile.portfolio.skills.length - 4}</span>
          )}
        </div>
      )}
    </div>
  );
}
