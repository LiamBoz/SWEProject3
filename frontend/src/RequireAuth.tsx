import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "./Auth";

export function RequireAuth() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
