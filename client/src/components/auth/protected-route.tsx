import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import Spinner from "../spinner";

export interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = ({
  children,
}) => {
  const { user, loading } = useAuthContext();
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
