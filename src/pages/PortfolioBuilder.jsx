import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analyzePortfolio } from '../utils/taggingEngine';
import './PortfolioBuilder.css';

export default function PortfolioBuilder() {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [portfolio, setPortfolio] = useState({
    projects: [{ title: '', description: '', technologies: '', link: '' }],
    experience: [{ company: '', role: '', duration: '', description: '' }],
    socials: { linkedin: '', github: '', twitter: '', portfolio: '' },
    education: [{ degree: '', institution: '', year: '' }],
    skills: []
  });
  
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (user?.portfolio) {
      setPortfolio(user.portfolio);
    }
  }, [user]);

  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [...portfolio.projects, { title: '', description: '', technologies: '', link: '' }]
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...portfolio.projects];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, projects: updated });
  };

  const removeProject = (index) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    setPortfolio({
      ...portfolio,
      experience: [...portfolio.experience, { company: '', role: '', duration: '', description: '' }]
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...portfolio.experience];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, experience: updated });
  };

  const removeExperience = (index) => {
    setPortfolio({
      ...portfolio,
      experience: portfolio.experience.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    setPortfolio({
      ...portfolio,
      education: [...portfolio.education, { degree: '', institution: '', year: '' }]
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...portfolio.education];
    updated[index][field] = value;
    setPortfolio({ ...portfolio, education: updated });
  };

  const removeEducation = (index) => {
    setPortfolio({
      ...portfolio,
      education: portfolio.education.filter((_, i) => i !== index)
    });
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setPortfolio({
        ...portfolio,
        skills: [...portfolio.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setPortfolio({
      ...portfolio,
      skills: portfolio.skills.filter((_, i) => i !== index)
    });
  };

  const handleSave = () => {
    // Generate tags based on portfolio
    const tags = analyzePortfolio(portfolio);
    
    // Update user profile with portfolio and tags
    updateUserProfile({ portfolio, tags });
    
    navigate('/employee/home');
  };

  return (
    <div className="portfolio-builder">
      <header className="builder-header">
        <div className="header-content">
          <h1>Portfolio Builder</h1>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={() => navigate('/employee/home')}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Portfolio
            </button>
          </div>
        </div>
      </header>

      <div className="builder-content">
        {/* Projects Section */}
        <section className="builder-section glass-card">
          <div className="section-header">
            <h2>Projects</h2>
            <button className="btn btn-secondary" onClick={addProject}>+ Add Project</button>
          </div>
          
          {portfolio.projects.map((project, index) => (
            <div key={index} className="form-card">
              <div className="form-card-header">
                <h3>Project {index + 1}</h3>
                {portfolio.projects.length > 1 && (
                  <button className="remove-btn" onClick={() => removeProject(index)}>Remove</button>
                )}
              </div>
              
              <div className="form-group">
                <label>Project Title</label>
                <input
                  className="input"
                  placeholder="E-Commerce Platform"
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="input textarea"
                  placeholder="Describe what you built and the impact it had..."
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows="4"
                />
              </div>
              
              <div className="form-group">
                <label>Technologies (comma-separated)</label>
                <input
                  className="input"
                  placeholder="React, Node.js, MongoDB"
                  value={project.technologies}
                  onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Project Link</label>
                <input
                  className="input"
                  placeholder="https://github.com/username/project"
                  value={project.link}
                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Experience Section */}
        <section className="builder-section glass-card">
          <div className="section-header">
            <h2>Experience</h2>
            <button className="btn btn-secondary" onClick={addExperience}>+ Add Experience</button>
          </div>
          
          {portfolio.experience.map((exp, index) => (
            <div key={index} className="form-card">
              <div className="form-card-header">
                <h3>Experience {index + 1}</h3>
                {portfolio.experience.length > 1 && (
                  <button className="remove-btn" onClick={() => removeExperience(index)}>Remove</button>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input
                    className="input"
                    placeholder="TechCorp Inc."
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Role</label>
                  <input
                    className="input"
                    placeholder="Senior Developer"
                    value={exp.role}
                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Duration</label>
                <input
                  className="input"
                  placeholder="2021 - Present"
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="input textarea"
                  placeholder="Describe your responsibilities and achievements..."
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows="4"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Socials Section */}
        <section className="builder-section glass-card">
          <h2>Social Links</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                className="input"
                placeholder="https://linkedin.com/in/username"
                value={portfolio.socials.linkedin}
                onChange={(e) => setPortfolio({
                  ...portfolio,
                  socials: { ...portfolio.socials, linkedin: e.target.value }
                })}
              />
            </div>
            
            <div className="form-group">
              <label>GitHub</label>
              <input
                className="input"
                placeholder="https://github.com/username"
                value={portfolio.socials.github}
                onChange={(e) => setPortfolio({
                  ...portfolio,
                  socials: { ...portfolio.socials, github: e.target.value }
                })}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Twitter</label>
              <input
                className="input"
                placeholder="https://twitter.com/username"
                value={portfolio.socials.twitter}
                onChange={(e) => setPortfolio({
                  ...portfolio,
                  socials: { ...portfolio.socials, twitter: e.target.value }
                })}
              />
            </div>
            
            <div className="form-group">
              <label>Portfolio Website</label>
              <input
                className="input"
                placeholder="https://yourwebsite.com"
                value={portfolio.socials.portfolio}
                onChange={(e) => setPortfolio({
                  ...portfolio,
                  socials: { ...portfolio.socials, portfolio: e.target.value }
                })}
              />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="builder-section glass-card">
          <div className="section-header">
            <h2>Education</h2>
            <button className="btn btn-secondary" onClick={addEducation}>+ Add Education</button>
          </div>
          
          {portfolio.education.map((edu, index) => (
            <div key={index} className="form-card">
              <div className="form-card-header">
                <h3>Education {index + 1}</h3>
                {portfolio.education.length > 1 && (
                  <button className="remove-btn" onClick={() => removeEducation(index)}>Remove</button>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Degree</label>
                  <input
                    className="input"
                    placeholder="B.S. Computer Science"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Year</label>
                  <input
                    className="input"
                    placeholder="2019"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Institution</label>
                <input
                  className="input"
                  placeholder="Stanford University"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="builder-section glass-card">
          <h2>Skills</h2>
          
          <div className="skills-input-group">
            <input
              className="input"
              placeholder="Add a skill (e.g., React, Python, AWS)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <button className="btn btn-secondary" onClick={addSkill}>Add</button>
          </div>
          
          <div className="skills-display">
            {portfolio.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
                <button className="skill-remove" onClick={() => removeSkill(index)}>×</button>
              </div>
            ))}
          </div>
        </section>

        <div className="save-section">
          <button className="btn btn-primary btn-large" onClick={handleSave}>
            Save Portfolio & Generate Tags
          </button>
        </div>
      </div>
    </div>
  );
}
