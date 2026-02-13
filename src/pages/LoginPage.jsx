import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('employee');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    const success = login(email, userType);
    
    if (success) {
      navigate(userType === 'employee' ? '/employee/home' : '/employer/home');
    } else {
      setError('Invalid credentials. Try one of the demo accounts below.');
    }
  };

  const demoAccounts = {
    employee: [
      { email: 'sarah.chen@email.com', name: 'Sarah Chen - Full-Stack Developer' },
      { email: 'marcus.j@email.com', name: 'Marcus Johnson - AI/ML Engineer' },
      { email: 'emily.r@email.com', name: 'Emily Rodriguez - Frontend Developer' }
    ],
    employer: [
      { email: 'hr@techventures.com', name: 'TechVentures Inc.' },
      { email: 'careers@aiinnovations.com', name: 'AI Innovations' }
    ]
  };

  return (
    <div className="login-page">
      <div className="login-container fade-in">
        <div className="login-header">
          <h1 className="text-gradient">Portify</h1>
          <p>Connect talent with opportunity</p>
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

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>
        </form>

        <div className="demo-accounts">
          <p className="demo-title">Demo Accounts:</p>
          <div className="demo-list">
            {demoAccounts[userType].map((account) => (
              <button
                key={account.email}
                className="demo-account-btn"
                onClick={() => setEmail(account.email)}
              >
                {account.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
