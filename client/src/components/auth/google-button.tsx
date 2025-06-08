import { Button } from "@/components/ui/button";
import { useSignInWithProvider } from "@/hooks/useAuthMutations";

interface GoogleButtonProps {
  redirectTo?: string;
}

export default function GoogleButton({ redirectTo = "/" }: GoogleButtonProps) {
  const signInWithGoogle = useSignInWithProvider();

  const handleGoogleSignIn = async () => {
    try {
      // Override the default redirectTo with the prop value
      window.sessionStorage.setItem("redirectTo", redirectTo);

      const result = await signInWithGoogle.mutateAsync("google");

      if (result.error) {
        console.error("Google sign-in error:", result.error);
      } else {
        console.log("Google sign-in initiated:", result.data);
      }
    } catch (error) {
      console.error("Unexpected error during Google sign-in:", error);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleGoogleSignIn}
      disabled={signInWithGoogle.isPending}
    >
      {!signInWithGoogle.isPending && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className="mr-2"
        >
          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
        </svg>
      )}
      {signInWithGoogle.isPending ? "Connecting..." : "Continue with Google"}
    </Button>
  );
}
