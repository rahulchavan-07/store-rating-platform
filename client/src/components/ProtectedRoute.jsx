import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
   
    return <div className="text-white p-4">Loading...</div>;
  }

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }


  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) {
        // User role not in allowed roles array
        return <Navigate to="/" replace />;
      }
    } else if (user.role !== role) {
      // User role does not match single role string
      return <Navigate to="/" replace />;
    }
  }

  // Authorized
  return children;
}
