import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";
import Spinner from "../spinner";

export interface IPublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FunctionComponent<IPublicRouteProps> = ({
  children,
}) => {
  const { user, loading } = useAuthContext();
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
