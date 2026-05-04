import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    const success = await login(email, password, userType);

    if (success) {
      navigate(userType === 'employee' ? '/employee/home' : '/employer/home');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const quickAccounts = {
    employee: [
      { email: 'arjun.sharma@email.com', password: '1234', name: 'Arjun Sharma', role: 'Full-Stack Developer' },
      { email: 'priya.nair@email.com', password: '1234', name: 'Priya Nair', role: 'AI/ML Engineer' },
      { email: 'rohan.mehta@email.com', password: '1234', name: 'Rohan Mehta', role: 'Frontend Developer' },
      { email: 'kavya.reddy@email.com', password: '1234', name: 'Kavya Reddy', role: 'DevOps & Cloud Engineer' },
      { email: 'vikram.iyer@email.com', password: '1234', name: 'Vikram Iyer', role: 'Data Scientist' },
    ],
    employer: [
      { email: 'hr@techventuresindia.com', password: '1234', name: 'TechVentures India', role: 'Technology' },
      { email: 'careers@neuralbridgeai.com', password: '1234', name: 'NeuralBridge AI Labs', role: 'Artificial Intelligence' },
      { email: 'talent@infraedge.io', password: '1234', name: 'InfraEdge Solutions', role: 'Cloud Infrastructure' },
      { email: 'jobs@datasutra.in', password: '1234', name: 'DataSutra Analytics', role: 'Data & Analytics' },
      { email: 'hr@kalpavriksha.tech', password: '1234', name: 'Kalpavriksha Digital', role: 'Digital Transformation' },
    ]
  };

  const handleQuickLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
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
            onClick={() => { setUserType('employee'); setError(''); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            I'm looking for work
          </button>
          <button
            className={`type-btn ${userType === 'employer' ? 'active' : ''}`}
            onClick={() => { setUserType('employer'); setError(''); }}
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>
        </form>

        <div className="demo-accounts">
          <p className="demo-title">Quick Login — {userType === 'employee' ? 'Employees' : 'Employers'}:</p>
          <div className="demo-list">
            {quickAccounts[userType].map((account) => (
              <button
                key={account.email}
                className="demo-account-btn"
                onClick={() => handleQuickLogin(account)}
              >
                <span className="demo-account-name">{account.name}</span>
                <span className="demo-account-role">{account.role}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="link">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
}
