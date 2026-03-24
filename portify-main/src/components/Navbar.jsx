import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import './Navbar.css';

export default function Navbar() {
  const { user, userType, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar glass-card">
      <div className="navbar-content">
        <h1 
          className="navbar-brand text-gradient" 
          onClick={() => navigate(userType ? `/${userType}/home` : '/')}
          style={{ cursor: 'pointer' }}
        >
          Portify
        </h1>
        
        {userType && <SearchBar />}

        <div className="navbar-actions">
          {userType === 'employee' && (
            <>
              <button className="btn btn-outline" onClick={() => navigate('/employee/jobs')}>Job Board</button>
              <button className="btn btn-outline" onClick={() => navigate('/employee/portfolio')}>My Portfolio</button>
            </>
          )}
          {userType === 'employer' && (
            <>
              <button className="btn btn-outline" onClick={() => navigate('/employer/jobs')}>Manage Jobs</button>
            </>
          )}
          
          {userType && (
            <button className="btn btn-outline" onClick={() => navigate('/messages')}>
              Messages
            </button>
          )}

          <div className="user-profile">
            <span className="user-name">{user?.name || user?.companyName}</span>
            <button className="btn btn-primary" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
