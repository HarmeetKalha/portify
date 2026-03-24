import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllJobs } from '../utils/jobsStore';
import { addApplication, hasEmployeeApplied } from '../utils/applicationsStore';

export default function JobBoard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState({});

  useEffect(() => {
    const all = getAllJobs();
    setJobs(all);
    
    // Check which jobs user has applied to
    const appliedStatus = {};
    if (user) {
      all.forEach(j => {
        appliedStatus[j.id] = hasEmployeeApplied(j.employerId, user.id);
      });
    }
    setAppliedJobs(appliedStatus);
  }, [user]);

  const handleApply = (job) => {
    if (!user) return;
    addApplication({
      id: Date.now(),
      employerId: job.employerId,
      employeeId: user.id,
      employeeName: user.name,
      employeeProfilePicture: user.profilePicture,
      createdAt: Date.now(),
      details: { role: job.title }
    });
    setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 2rem' }}>
      <h2 className="text-gradient">Job Board</h2>
      <p className="section-subtitle mt-2 mb-4">Discover and apply to roles from top companies</p>

      {jobs.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <p>No jobs have been posted yet. Check back later!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {jobs.map(job => (
            <div key={job.id} className="glass-card" style={{ display: 'flex', gap: '1.5rem' }}>
              <img 
                src={job.logo || `https://api.dicebear.com/7.x/initials/svg?seed=${job.companyName}`} 
                alt={job.companyName}
                style={{ width: 64, height: 64, borderRadius: 12, flexShrink: 0 }}
                onClick={() => navigate(`/profile/${job.employerId}`)}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.3rem' }}>{job.title}</h3>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-accent)', fontWeight: 500 }}>
                      {job.companyName} &bull; <span style={{ color: 'var(--text-secondary)' }}>{job.location}</span>
                    </p>
                  </div>
                  <button 
                    className={`btn ${appliedJobs[job.id] ? 'btn-outline' : 'btn-primary'}`}
                    disabled={appliedJobs[job.id]}
                    onClick={() => handleApply(job)}
                  >
                    {appliedJobs[job.id] ? 'Applied' : 'Easy Apply'}
                  </button>
                </div>
                
                <p style={{ margin: '1rem 0' }}>{job.description}</p>
                
                {job.requirements && (
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {job.requirements.split(',').map((req, idx) => (
                      <span key={idx} className="tag tag-primary">{req.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
