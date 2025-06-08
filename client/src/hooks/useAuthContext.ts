import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// This hook maintains compatibility with existing code
export const useAuthContext = () => useContext(AuthContext);

// Export for convenience - direct access to the new hook
export { useAuth } from "./useAuth";
