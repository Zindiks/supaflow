import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
  const { signOut, isSigningOut } = useAuth();

  const handleLogout = () => {
    signOut();
    console.log("Logging out user");
  };

  return (
    <Button onClick={handleLogout} disabled={isSigningOut}>
      {isSigningOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
