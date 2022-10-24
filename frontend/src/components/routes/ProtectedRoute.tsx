import { Navigate, Outlet } from "react-router-dom";
import { Children } from "../../utils/types/common";

interface RouteProps extends Children {
  isLoggedIn: boolean;
}

function ProtectedRoute({ children, isLoggedIn }: RouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children || <Outlet />;
}

export default ProtectedRoute;
