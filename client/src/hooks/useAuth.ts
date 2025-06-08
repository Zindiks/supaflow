import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Session } from "@supabase/supabase-js";
import supabase from "../lib/supabaseClient";
import React from "react";

// Types
export interface AuthState {
  user: User | null;
  session: Session | null;
}

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
};

// Main auth hook
export const useAuth = () => {
  const queryClient = useQueryClient();

  // Fetch session query
  const { data, isLoading } = useQuery({
    queryKey: authKeys.session(),
    queryFn: async (): Promise<AuthState> => {
      const { data } = await supabase.auth.getSession();
      return {
        session: data.session,
        user: data.session?.user ?? null,
      };
    },
    // Don't refetch on window focus as we'll handle auth state via onAuthStateChange
    refetchOnWindowFocus: false,
  });

  // Sign out mutation
  const signOutMutation = useMutation({
    mutationFn: async () => {
      return supabase.auth.signOut();
    },
    onSuccess: () => {
      // Invalidate auth queries on signout
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      console.log("User logged out successfully");
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });

  // Set up auth state listener on mount
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        // Update auth state in React Query cache
        queryClient.setQueryData(authKeys.session(), {
          session: currentSession,
          user: currentSession?.user ?? null,
        });
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [queryClient]);

  return {
    user: data?.user ?? null,
    session: data?.session ?? null,
    loading: isLoading,
    signOut: signOutMutation.mutate,
    isSigningOut: signOutMutation.isPending,
  };
};
