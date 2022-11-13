import { Navigate, Outlet } from "react-router-dom";

interface RouteProps {
  isLoggedIn: boolean;
}

function ProtectedRoute({ isLoggedIn }: RouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
