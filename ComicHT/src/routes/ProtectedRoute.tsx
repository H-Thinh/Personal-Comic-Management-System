import { Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { verifytoken } from "../api/authApi";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await verifytoken();
        setAuthorized(true);
      } catch {
        setAuthorized(false);
      }
    };
    checkToken();
  }, []);

  if (authorized === null) {
    return <div>Đang kiểm tra quyền truy cập...</div>;
  }

  return authorized ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
