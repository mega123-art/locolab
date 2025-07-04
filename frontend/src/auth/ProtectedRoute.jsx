import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect based on user role
    if (user.role === 'brand') return <Navigate to="/brand" replace />;
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'creator') return <Navigate to="/creator" replace />;
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;