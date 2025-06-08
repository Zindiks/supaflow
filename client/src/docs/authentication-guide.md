# Authentication with React Query

This project uses React Query for authentication, providing a clean and efficient way to manage authentication state and operations.

## Current Architecture

- **React Query**: All authentication state and operations are managed by React Query
- **No Context API**: We've removed the Context API dependency for a simpler architecture
- **Simple Imports**: Just import the hooks you need and use them directly

## Authentication Hooks

```tsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { user, session, loading, signOut } = useAuth();

  // Use the auth state and actions
}
```

### React Query API (Recommended)

```tsx
import { useAuth } from "@/hooks/useAuth";
import {
  useSignIn,
  useSignUp,
  useSignInWithProvider,
} from "@/hooks/useAuthMutations";

function MyComponent() {
  // Get the auth state
  const { user, session, loading, signOut, isSigningOut } = useAuth();

  // Use authentication mutations
  const signIn = useSignIn();
  const signUp = useSignUp();
  const googleAuth = useSignInWithProvider();

  // Sign in with email/password
  const handleSignIn = async () => {
    await signIn.mutateAsync({ email, password });
  };

  // Sign up new user
  const handleSignUp = async () => {
    await signUp.mutateAsync({
      email,
      password,
      metadata: { username },
    });
  };

  // Sign in with OAuth provider
  const handleGoogleSignIn = async () => {
    await googleAuth.mutateAsync("google");
  };

  // Sign out
  const handleSignOut = () => {
    signOut();
  };
}
```

## Key Benefits of React Query

1. **Better Loading States**: Access to `isPending`, `isSuccess`, `isError` states
2. **Type Safety**: Full TypeScript support for all operations
3. **Error Handling**: Standardized error handling
4. **Devtools**: React Query DevTools for debugging
5. **Optimistic Updates**: Better UX through optimistic updates
6. **Caching**: Intelligent caching to reduce API calls

## Migration Strategy

1. **Step 1**: Keep using Context API in existing components
2. **Step 2**: Use React Query hooks in new components
3. **Step 3**: Gradually refactor existing components to use React Query hooks

## Available Hooks

### Auth State Hook

- `useAuth()` - Primary hook for authentication state

### Auth Mutation Hooks

- `useSignIn()` - Email/password sign in
- `useSignUp()` - New user registration
- `useSignOut()` - Sign out (available through useAuth)
- `useSignInWithProvider()` - OAuth sign in (Google, GitHub, etc.)
- `useResetPassword()` - Password reset

## Example: Login Form

```tsx
import { useSignIn } from "@/hooks/useAuthMutations";
import { useForm } from "react-hook-form";

function LoginForm() {
  const signIn = useSignIn();
  const form = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn.mutateAsync({
        email: data.email,
        password: data.password,
      });

      // Redirect handled automatically by protected routes
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
      <button type="submit" disabled={signIn.isPending}>
        {signIn.isPending ? "Signing in..." : "Sign In"}
      </button>

      {signIn.isError && (
        <div className="error">
          {signIn.error instanceof Error
            ? signIn.error.message
            : "An error occurred"}
        </div>
      )}
    </form>
  );
}
```

## Debugging Authentication

Use the React Query DevTools to inspect the authentication state and operations. Enable the DevTools by clicking the floating icon in the bottom-right corner of your application.

## Future Improvements

1. Add more authentication providers (GitHub, Facebook, etc.)
2. Implement email verification flows
3. Add password reset functionality
4. Implement MFA/2FA
5. Add session refresh logic
