import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Redirect to /login when user is not authenticated.
 * While auth is hydrating (loading=true), render nothing to avoid flicker.
 */
export function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/**
 * Redirect to dashboard when user is already authenticated.
 * Prevents logged-in users from seeing login/register pages.
 */
export function PublicRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to={localStorage.getItem('prmsDashboardPath') || '/admin'} replace />;
  }

  return children;
}
