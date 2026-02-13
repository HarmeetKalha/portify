import { createContext, useContext, useState, useEffect } from 'react';
import { mockEmployees, mockEmployers } from '../data/mockData';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'employee' or 'employer'
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('portify_user');
    const savedUserType = localStorage.getItem('portify_user_type');
    
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType);
    }
  }, []);

  const login = (email, type) => {
    let foundUser;
    
    if (type === 'employee') {
      foundUser = mockEmployees.find(emp => emp.email === email);
    } else {
      foundUser = mockEmployers.find(emp => emp.email === email);
    }

    if (foundUser) {
      setUser(foundUser);
      setUserType(type);
      localStorage.setItem('portify_user', JSON.stringify(foundUser));
      localStorage.setItem('portify_user_type', type);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setRecentlyViewed([]);
    localStorage.removeItem('portify_user');
    localStorage.removeItem('portify_user_type');
  };

  const updateUserProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('portify_user', JSON.stringify(updatedUser));
  };

  const addToRecentlyViewed = (profileId) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== profileId);
      return [profileId, ...filtered].slice(0, 5); // Keep only last 5
    });
  };

  const value = {
    user,
    userType,
    isAuthenticated: !!user,
    login,
    logout,
    updateUserProfile,
    recentlyViewed,
    addToRecentlyViewed
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
