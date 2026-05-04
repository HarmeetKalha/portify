import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('portify_user');
    const savedType = localStorage.getItem('portify_user_type');
    if (savedUser && savedType) {
      setUser(JSON.parse(savedUser));
      setUserType(savedType);
    }
  }, []);

  const login = async (email, password, type) => {
    try {
      const { user: u, type: t } = await api.login(email, password, type);
      setUser(u);
      setUserType(t);
      localStorage.setItem('portify_user', JSON.stringify(u));
      localStorage.setItem('portify_user_type', t);
      return true;
    } catch {
      return false;
    }
  };

  const signup = async (formData, type) => {
    try {
      const { user: u, type: t } = await api.signup(formData, type);
      setUser(u);
      setUserType(t);
      localStorage.setItem('portify_user', JSON.stringify(u));
      localStorage.setItem('portify_user_type', t);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setRecentlyViewed([]);
    localStorage.removeItem('portify_user');
    localStorage.removeItem('portify_user_type');
  };

  const updateUserProfile = async (updatedData) => {
    try {
      let updated;
      if (userType === 'employee') {
        updated = await api.updateEmployee(user.id, updatedData);
      } else {
        updated = await api.updateEmployer(user.id, updatedData);
      }
      setUser(updated);
      localStorage.setItem('portify_user', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update profile:', e);
      // Fallback: update local state only
      const merged = { ...user, ...updatedData };
      setUser(merged);
      localStorage.setItem('portify_user', JSON.stringify(merged));
    }
  };

  const addToRecentlyViewed = (profileId) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== profileId);
      return [profileId, ...filtered].slice(0, 5);
    });
  };

  const value = {
    user,
    userType,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUserProfile,
    recentlyViewed,
    addToRecentlyViewed,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Kept for compatibility — fetches all accounts from DB
export async function getAllAccounts(type) {
  try {
    if (type === 'employee') return await api.getEmployees();
    return await api.getEmployers();
  } catch {
    return [];
  }
}
