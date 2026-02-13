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

// Helper functions to manage custom accounts in localStorage
function getCustomAccounts(type) {
  const key = type === 'employee' ? 'portify_custom_employees' : 'portify_custom_employers';
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

function saveCustomAccount(account, type) {
  const key = type === 'employee' ? 'portify_custom_employees' : 'portify_custom_employers';
  const existing = getCustomAccounts(type);
  existing.push(account);
  localStorage.setItem(key, JSON.stringify(existing));
}

function getAllAccounts(type) {
  const customAccounts = getCustomAccounts(type);
  const demoAccounts = type === 'employee' ? mockEmployees : mockEmployers;
  return [...demoAccounts, ...customAccounts];
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
    const allAccounts = getAllAccounts(type);
    const foundUser = allAccounts.find(acc => acc.email === email);

    if (foundUser) {
      setUser(foundUser);
      setUserType(type);
      localStorage.setItem('portify_user', JSON.stringify(foundUser));
      localStorage.setItem('portify_user_type', type);
      return true;
    }
    
    return false;
  };

  const signup = (formData, type) => {
    // Check if email already exists
    const allAccounts = getAllAccounts(type);
    const emailExists = allAccounts.some(acc => acc.email === formData.email);
    
    if (emailExists) {
      return false;
    }

    // Generate unique ID
    const newId = Date.now();

    let newAccount;
    
    if (type === 'employee') {
      newAccount = {
        id: newId,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        bio: formData.bio,
        portfolio: {
          projects: [],
          experience: [],
          socials: { linkedin: '', github: '', twitter: '', portfolio: '' },
          education: [],
          skills: []
        },
        tags: {
          technical: 'Developer',
          softSkill: 'Professional'
        }
      };
    } else {
      newAccount = {
        id: newId,
        name: formData.companyName,
        email: formData.email,
        type: 'employer',
        companyName: formData.companyName,
        industry: formData.industry,
        logo: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.companyName}`,
        description: formData.description,
        employees: [],
        recentlyViewed: []
      };
    }

    // Save to localStorage
    saveCustomAccount(newAccount, type);

    // Log in the new user
    setUser(newAccount);
    setUserType(type);
    localStorage.setItem('portify_user', JSON.stringify(newAccount));
    localStorage.setItem('portify_user_type', type);

    return true;
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
    
    console.log('Updating user profile:', updatedUser);
    console.log('User type:', userType);
    
    // Also update in custom accounts storage
    if (userType) {
      const customAccounts = getCustomAccounts(userType);
      console.log('Custom accounts before update:', customAccounts);
      
      const index = customAccounts.findIndex(acc => acc.id === updatedUser.id);
      console.log('Found account at index:', index);
      
      if (index !== -1) {
        // Update existing custom account
        customAccounts[index] = updatedUser;
        const key = userType === 'employee' ? 'portify_custom_employees' : 'portify_custom_employers';
        localStorage.setItem(key, JSON.stringify(customAccounts));
        console.log('Updated custom account in localStorage');
      } else {
        // This might be a demo account that was modified, or a new custom account
        // Check if this is actually a custom account by checking if ID is recent (timestamp-based)
        const isDemoAccount = updatedUser.id < 1000000000000; // IDs before year 2001 are demo accounts
        
        if (!isDemoAccount) {
          // This is a custom account that somehow wasn't found, add it
          customAccounts.push(updatedUser);
          const key = userType === 'employee' ? 'portify_custom_employees' : 'portify_custom_employers';
          localStorage.setItem(key, JSON.stringify(customAccounts));
          console.log('Added custom account to localStorage');
        } else {
          console.log('This is a demo account, only updating current user state');
        }
      }
    }
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
    signup,
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

// Export helper to get all accounts (for search and other features)
export { getAllAccounts };

