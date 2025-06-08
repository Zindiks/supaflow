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
  });
};

export const useSignInWithProvider = () => {
  return useMutation({
    mutationFn: async (provider: "google" | "github" | "facebook") => {
      // Check if there's a stored redirectTo path
      const storedRedirectTo = window.sessionStorage.getItem("redirectTo");
      const redirectPath = storedRedirectTo || "/";

      return supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}${redirectPath}`,
        },
      });
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
  });
};
