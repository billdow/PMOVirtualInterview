import { Navigate, useLocation } from 'react-router-dom';
import { useUsers } from '../context/UserContext';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { currentUser } = useUsers();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
