import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeeHome from './pages/EmployeeHome';
import EmployerHome from './pages/EmployerHome';
import PortfolioBuilder from './pages/PortfolioBuilder';
import SuggestedAccounts from './pages/SuggestedAccounts';
import ProfileView from './pages/ProfileView';
import SearchResults from './pages/SearchResults';

function ProtectedRoute({ children, requiredType }) {
  const { isAuthenticated, userType } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredType && userType !== requiredType) {
    return <Navigate to={`/${userType}/home`} replace />;
  }
  
  return children;
}

function AppRoutes() {
  const { isAuthenticated, userType } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <Navigate to={`/${userType}/home`} replace />
          ) : (
            <LoginPage />
          )
        } 
      />
      
      <Route path="/signup" element={<SignupPage />} />
      
      <Route 
        path="/employee/home" 
        element={
          <ProtectedRoute requiredType="employee">
            <EmployeeHome />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/employee/portfolio-builder" 
        element={
          <ProtectedRoute requiredType="employee">
            <PortfolioBuilder />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/employer/home" 
        element={
          <ProtectedRoute requiredType="employer">
            <EmployerHome />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/employer/suggestions" 
        element={
          <ProtectedRoute requiredType="employer">
            <SuggestedAccounts />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile/:id" 
        element={
          <ProtectedRoute>
            <ProfileView />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/search" 
        element={
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
