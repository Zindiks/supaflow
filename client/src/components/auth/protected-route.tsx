import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../spinner";

export interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
