# Authentication with React Query

This project has transitioned from a Context-based authentication system to a pure React Query-based system for managing authentication.

## Components

### React Query Authentication API

- `useAuth.ts`: Main hook for authentication state with React Query
- `useAuthMutations.ts`: Collection of mutation hooks for authentication operations

## Benefits of the React Query Approach

- **Simpler Architecture**: No Context API needed, just import the hooks directly
- **Better Performance**: More efficient re-renders and caching
- **TypeScript Integration**: Full type safety for auth state and operations

## Using the New API

### Getting Authentication State

```tsx
import { useAuth } from "../hooks/useAuth";

function MyComponent() {
  const { user, session, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return user ? <div>Welcome, {user.email}</div> : <div>Please login</div>;
}
```

### Authentication Operations

```tsx
import {
  useSignIn,
  useSignUp,
  useSignInWithProvider,
} from "../hooks/useAuthMutations";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = useSignIn();
  const signUp = useSignUp();
  const googleAuth = useSignInWithProvider();

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn.mutate({ email, password });
  };

  const handleGoogleSignIn = () => {
    googleAuth.mutate("google");
  };

  return (
    <form onSubmit={handleSignIn}>
      {/* Form fields */}
      <button type="submit" disabled={signIn.isPending}>
        {signIn.isPending ? "Signing in..." : "Sign In"}
      </button>
      <button type="button" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </form>
  );
}
```

## Benefits of React Query for Auth

1. **Built-in Loading States:** Track if operations are loading with `isPending`
2. **Error Handling:** Easy access to error states and messages
3. **Optimistic Updates:** Update UI immediately for better UX
4. **Automatic Refetching:** Keep data fresh when needed
5. **Devtools:** Debug with React Query devtools
6. **Typescript Support:** Full type safety
7. **Caching:** Efficient request caching to minimize API calls

## Transitioning Existing Components

For now, all existing components that use the Context API will continue to work without changes. We recommend gradually updating components to use the React Query hooks directly as you refactor them.
