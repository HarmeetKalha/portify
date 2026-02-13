import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockEmployees } from '../data/mockData';
import './ProfileView.css';

export default function ProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToRecentlyViewed } = useAuth();
  
  const profile = mockEmployees.find(emp => emp.id === parseInt(id));

  if (!profile) {
    return (
      <div className="profile-view">
        <div className="not-found glass-card">
          <h2>Profile not found</h2>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Add to recently viewed
  addToRecentlyViewed(profile.id);

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
              src={profile.profilePicture}
              alt={profile.name}
              className="profile-avatar-large"
            />
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              {profile.portfolio.socials.github && (
                <a href={profile.portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {profile.portfolio.socials.portfolio && (
                <a href={profile.portfolio.socials.portfolio} target="_blank" rel="noopener noreferrer" className="social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Portfolio
                </a>
              )}
            </div>
          )}

          {profile.portfolio?.skills && profile.portfolio.skills.length > 0 && (
            <div className="profile-section">
              <h2>Skills</h2>
              <div className="skills-grid">
                {profile.portfolio.skills.map((skill, index) => (
                  <span key={index} className="skill-badge-large">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {profile.portfolio?.projects && profile.portfolio.projects.length > 0 && (
            <div className="profile-section">
              <h2>Projects</h2>
              {profile.portfolio.projects.map((project, index) => (
                <div key={index} className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.technologies && (
                    <div className="project-tech">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {profile.portfolio?.experience && profile.portfolio.experience.length > 0 && (
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

          {profile.portfolio?.education && profile.portfolio.education.length > 0 && (
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
        </div>
      </div>
    </div>
  );
}
