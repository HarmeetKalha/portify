import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getJobsByEmployer, addJob, deleteJob } from '../utils/jobsStore';

export default function ManageJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(() => getJobsByEmployer(user?.id));
  const [formData, setFormData] = useState({ title: '', description: '', requirements: '', location: '' });

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    const newJob = addJob({
      ...formData,
      employerId: user.id,
      companyName: user.companyName,
      logo: user.logo
    });
    setJobs([newJob, ...jobs]);
    setFormData({ title: '', description: '', requirements: '', location: '' });
  };

  const handleDeleteJob = (jobId) => {
    deleteJob(jobId);
    setJobs(jobs.filter(j => j.id !== jobId));
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 2rem' }}>
      <h2 className="text-gradient">Manage Job Postings</h2>
      
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3>Create New Job</h3>
        <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label>Job Title</label>
            <input 
              required
              className="input w-full" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
            />
          </div>
          <div>
            <label>Location / Type</label>
            <input 
              required
              className="input w-full" 
              placeholder="e.g. Remote, San Francisco, CA"
              value={formData.location} 
              onChange={e => setFormData({...formData, location: e.target.value})} 
            />
          </div>
          <div>
            <label>Description</label>
            <textarea 
              required
              className="input w-full" 
              rows="4"
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          <div>
            <label>Requirements (comma separated tags)</label>
            <input 
              className="input w-full" 
              placeholder="e.g. React, Node.js, 3+ years experience"
              value={formData.requirements} 
              onChange={e => setFormData({...formData, requirements: e.target.value})} 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Post Job</button>
        </form>
      </div>

      <div className="glass-card">
        <h3>Your Active Postings</h3>
        {jobs.length === 0 ? (
          <p className="text-secondary mt-2">You haven't posted any jobs yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {jobs.map(job => (
              <div key={job.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{job.title}</h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)' }}>{job.location}</p>
                    <p style={{ margin: '0 0 1rem 0' }}>{job.description}</p>
                  </div>
                  <button 
                    className="btn btn-outline" 
                    style={{ color: '#ef4444', borderColor: '#ef4444' }}
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
