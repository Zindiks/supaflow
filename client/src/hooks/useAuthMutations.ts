import { useMutation } from "@tanstack/react-query";
import supabase from "../lib/supabaseClient";
import { queryClient } from "../lib/queryClient";
import { authKeys } from "./useAuth";

interface SignInCredentials {
  email: string;
  password: string;
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      return supabase.auth.signInWithPassword(credentials);
    },
    onSuccess: (data) => {
      if (data.data.session) {
        // Update the auth state in React Query cache
        queryClient.setQueryData(authKeys.session(), {
          session: data.data.session,
          user: data.data.user,
        });
      }
    },
    onError: (error) => {
      // Consistently handle and log sign-in errors
      console.error("Authentication error:", error);

      // You could also integrate with an error tracking service here
      // or dispatch to a global error handler
    },
  });
};

interface SignUpCredentials {
  email: string;
  password: string;
  metadata?: Record<string, unknown>;
}

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      const { email, password, metadata } = credentials;
      return supabase.auth.signUp({
        email,
        password,
        options: { data: metadata },
      });
    },
    onError: (error) => {
      console.error("Sign-up error:", error);
    },
    onSuccess: (data) => {
      if (data.error) {
        console.error("Sign-up API error:", data.error);
      }
    },
  });
};

export const useSignInWithProvider = () => {
  return useMutation({
    mutationFn: async (provider: "google" | "github" | "facebook") => {
      // Check if there's a stored redirectTo path
      const storedRedirectTo = window.sessionStorage.getItem("redirectTo");

      // Validate the redirect path to prevent open redirect vulnerabilities
      // Only allow internal paths (starting with /) and validate against a whitelist of allowed paths
      const allowedPaths = ["/", "/dashboard", "/auth/callback", "/profile"];
      let redirectPath = "/"; // Default path

      if (
        storedRedirectTo &&
        storedRedirectTo.startsWith("/") &&
        allowedPaths.some(
          (path) =>
            storedRedirectTo === path || storedRedirectTo.startsWith(`${path}/`)
        )
      ) {
        redirectPath = storedRedirectTo;
      }

      // Clean up the stored redirect path
      window.sessionStorage.removeItem("redirectTo");

      return supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}${redirectPath}`,
        },
      });
    },
    onError: (error) => {
      console.error("OAuth sign-in error:", error);
    },
    onSuccess: (data) => {
      if (data.error) {
        console.error("OAuth sign-in API error:", data.error);
      }
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
    },
    onError: (error) => {
      console.error("Password reset error:", error);
    },
    onSuccess: (data) => {
      if (data.error) {
        console.error("Password reset API error:", data.error);
      }
    },
  });
};
