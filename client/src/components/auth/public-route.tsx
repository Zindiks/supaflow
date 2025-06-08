import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../spinner";

export interface IPublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FunctionComponent<IPublicRouteProps> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Get the redirectTo path from location state, or use '/' as default
  const from = location.state?.from || "/";

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
