import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import GoogleButton from "./google-button";
import { useSignIn } from "@/hooks/useAuthMutations";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirectTo path from location state, or use '/' as default
  const from = location.state?.from || "/";

  // Use the React Query mutation hook for sign in
  const signIn = useSignIn();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;

    try {
      const result = await signIn.mutateAsync({ email, password });

      if (result.error) {
        console.error("Login error:", result.error);
      } else if (result.data.session) {
        console.log("User logged in:", result.data.user);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <div className="mt-4 text-center mb-8">
        <GoogleButton redirectTo={from} />
      </div>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      {signIn.error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {signIn.error instanceof Error
            ? signIn.error.message
            : "An error occurred during sign in"}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full text-background"
            disabled={signIn.isPending}
          >
            {signIn.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        <Link to="/auth/forgot-password">Forgot your password?</Link>
      </div>
      <div className="mt-4 text-center text-sm">
        {"Don't have an account? "}
        <Link to="/auth/register">Register</Link>
      </div>
    </>
  );
}
