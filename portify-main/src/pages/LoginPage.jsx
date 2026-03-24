import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address')
});

export default function LoginPage() {
  const [userType, setUserType] = useState('employee');
  const [authError, setAuthError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '' }
  });

  const onSubmit = (data) => {
    setAuthError('');
    const success = login(data.email, userType);
    
    if (success) {
      navigate(userType === 'employee' ? '/employee/home' : '/employer/home');
    } else {
      setAuthError('Invalid credentials. Try one of the demo accounts below.');
    }
  };

  const handleDemoClick = (email) => {
    setValue('email', email, { shouldValidate: true });
    // Auto submit doesn't happen with just setValue, but the user can click Sign In 
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
            type="button"
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
            type="button"
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

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="text"
              className={`input ${errors.email ? 'input-error' : ''}`}
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.email.message}</span>}
          </div>

          {authError && <div className="error-message">{authError}</div>}

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
                type="button"
                className="demo-account-btn"
                onClick={() => handleDemoClick(account.email)}
              >
                {account.name}
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
