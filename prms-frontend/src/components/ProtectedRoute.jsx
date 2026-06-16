import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { roleToPath } from '../contexts/AuthContext';

/**
 * Redirect to /login when user is not authenticated.
 * Optionally restrict routes to specific roles.
 * While auth is hydrating (loading=true), render nothing to avoid flicker.
 */
export function ProtectedRoute({ children, allowedRoles }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role guard (AUTH-006)
  if (allowedRoles && allowedRoles.length > 0 && user) {
    const hasAccess = allowedRoles.some(
      (role) => role.toLowerCase() === user.role?.toLowerCase()
    );
    if (!hasAccess) {
      // Redirect to their role-appropriate dashboard
      const fallback = roleToPath(user.role);
      return <Navigate to={fallback} replace />;
    }
  }

  return children;
}

/**
 * Redirect to dashboard when user is already authenticated.
 * Uses role-based path, not localStorage (AUTH-005/007).
 */
export function PublicRoute({ children }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) return null;

  if (isAuthenticated && user) {
    const path = roleToPath(user.role);
    return <Navigate to={path} replace />;
  }

  return children;
}
