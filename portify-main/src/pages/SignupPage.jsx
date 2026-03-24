import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import './SignupPage.css';

const signupSchema = z.object({
  userType: z.enum(['employee', 'employer']),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  name: z.string().optional().or(z.literal('')),
  role: z.string().optional().or(z.literal('')),
  bio: z.string().optional().or(z.literal('')),
  companyName: z.string().optional().or(z.literal('')),
  industry: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal(''))
}).superRefine((data, ctx) => {
  if (data.userType === 'employee') {
    if (!data.name?.trim()) ctx.addIssue({ path: ['name'], message: 'Name is required', code: z.ZodIssueCode.custom });
    if (!data.role?.trim()) ctx.addIssue({ path: ['role'], message: 'Role/Title is required', code: z.ZodIssueCode.custom });
    if (!data.bio?.trim() || data.bio.length < 10) ctx.addIssue({ path: ['bio'], message: 'Bio must be at least 10 characters', code: z.ZodIssueCode.custom });
  } else {
    if (!data.companyName?.trim()) ctx.addIssue({ path: ['companyName'], message: 'Company Name is required', code: z.ZodIssueCode.custom });
    if (!data.industry?.trim()) ctx.addIssue({ path: ['industry'], message: 'Industry is required', code: z.ZodIssueCode.custom });
    if (!data.description?.trim() || data.description.length < 10) ctx.addIssue({ path: ['description'], message: 'Description must be at least 10 characters', code: z.ZodIssueCode.custom });
  }
});

export default function SignupPage() {
  const [authError, setAuthError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: 'employee',
      email: '', name: '', role: '', bio: '', companyName: '', industry: '', description: ''
    }
  });

  const userType = watch('userType');

  // Clear fields when userType changes to prevent lingering errors
  useEffect(() => {
    setAuthError('');
  }, [userType]);

  const onSubmit = (data) => {
    setAuthError('');
    const success = signup(data, data.userType);
    
    if (success) {
      navigate(data.userType === 'employee' ? '/employee/home' : '/employer/home');
    } else {
      setAuthError('An account with this email already exists');
    }
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
            type="button"
            className={`type-btn ${userType === 'employee' ? 'active' : ''}`}
            onClick={() => setValue('userType', 'employee')}
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
            onClick={() => setValue('userType', 'employer')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            I'm hiring
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          {userType === 'employee' ? (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  placeholder="John Doe"
                  {...register('name')}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="text"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  placeholder="john@example.com"
                  {...register('email')}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="role">Role/Title *</label>
                <input
                  id="role"
                  type="text"
                  className={`input ${errors.role ? 'input-error' : ''}`}
                  placeholder="e.g., Full-Stack Developer"
                  {...register('role')}
                />
                {errors.role && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.role.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio *</label>
                <textarea
                  id="bio"
                  className={`input textarea ${errors.bio ? 'input-error' : ''}`}
                  placeholder="Tell us about yourself and your experience..."
                  rows="4"
                  {...register('bio')}
                />
                {errors.bio && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.bio.message}</span>}
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="companyName">Company Name *</label>
                <input
                  id="companyName"
                  type="text"
                  className={`input ${errors.companyName ? 'input-error' : ''}`}
                  placeholder="Acme Corporation"
                  {...register('companyName')}
                />
                {errors.companyName && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.companyName.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Company Email *</label>
                <input
                  id="email"
                  type="text"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                  placeholder="hr@company.com"
                  {...register('email')}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <input
                  id="industry"
                  type="text"
                  className={`input ${errors.industry ? 'input-error' : ''}`}
                  placeholder="e.g., Technology, Finance, Healthcare"
                  {...register('industry')}
                />
                {errors.industry && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.industry.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Company Description *</label>
                <textarea
                  id="description"
                  className={`input textarea ${errors.description ? 'input-error' : ''}`}
                  placeholder="Describe your company and what you do..."
                  rows="4"
                  {...register('description')}
                />
                {errors.description && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{errors.description.message}</span>}
              </div>
            </>
          )}

          {authError && <div className="error-message">{authError}</div>}

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
