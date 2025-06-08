import React, { createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useAuth } from "../hooks/useAuth";

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  loading: true,
  signOut: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use our new React Query hook under the hood
  const { user, session, loading, signOut } = useAuth();

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
