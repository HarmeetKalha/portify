import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignupPage.css';

export default function SignupPage() {
  const [userType, setUserType] = useState('employee');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    companyName: '',
    industry: '',
    description: ''
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.email || !formData.name) {
      setError('Please fill in all required fields');
      return;
    }

    if (userType === 'employee' && (!formData.role || !formData.bio)) {
      setError('Please fill in all required fields');
      return;
    }

    if (userType === 'employer' && (!formData.companyName || !formData.industry || !formData.description)) {
      setError('Please fill in all required fields');
      return;
    }

    // Create account
    const success = signup(formData, userType);
    
    if (success) {
      navigate(userType === 'employee' ? '/employee/home' : '/employer/home');
    } else {
      setError('An account with this email already exists');
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="signup-page">
      <div className="signup-container fade-in">
        <div className="signup-header">
          <h1 className="text-gradient">Create Account</h1>
          <p>Join Portify and start connecting</p>
        </div>

        <div className="user-type-selector">
          <button
            className={`type-btn ${userType === 'employee' ? 'active' : ''}`}
            onClick={() => setUserType('employee')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            I'm looking for work
          </button>
          <button
            className={`type-btn ${userType === 'employer' ? 'active' : ''}`}
            onClick={() => setUserType('employer')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            I'm hiring
          </button>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {userType === 'employee' ? (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  className="input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role/Title *</label>
                <input
                  id="role"
                  type="text"
                  className="input"
                  placeholder="e.g., Full-Stack Developer"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio *</label>
                <textarea
                  id="bio"
                  className="input textarea"
                  placeholder="Tell us about yourself and your experience..."
                  value={formData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows="4"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="companyName">Company Name *</label>
                <input
                  id="companyName"
                  type="text"
                  className="input"
                  placeholder="Acme Corporation"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Company Email *</label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="hr@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <input
                  id="industry"
                  type="text"
                  className="input"
                  placeholder="e.g., Technology, Finance, Healthcare"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Company Description *</label>
                <textarea
                  id="description"
                  className="input textarea"
                  placeholder="Describe your company and what you do..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows="4"
                  required
                />
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary w-full">
            Create Account
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/" className="link">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
