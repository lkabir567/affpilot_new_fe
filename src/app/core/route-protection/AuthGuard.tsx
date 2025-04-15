import { useAuth } from "@/features/auth";
import { Navigate, useLocation } from "react-router-dom";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isVerified } = useAuth();
  const location = useLocation();
  console.log("isAuthenticated", isAuthenticated);
  console.log("isVerified", isVerified);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isVerified) {
    return <Navigate to="/verify-email" />;
  }

  return children;
};
