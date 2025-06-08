import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
  const { signOut, isSigningOut } = useAuth();

  const handleLogout = () => {
    // Don't log immediately - wait until the operation completes
    signOut();
  };

  return (
    <Button onClick={handleLogout} disabled={isSigningOut}>
      {isSigningOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
