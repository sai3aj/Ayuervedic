import { Navigate } from 'react-router-dom';
import { useSupabase } from '../contexts/SupabaseContext';

/**
 * ProtectedRoute component that redirects to login page if user is not authenticated
 * or doesn't have required role
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {boolean} props.requireAdmin - Whether to require admin role
 * @returns {React.ReactNode} - Rendered component or redirect
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useSupabase();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-green"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if admin access is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated and has required role
  return children;
};

export default ProtectedRoute; 