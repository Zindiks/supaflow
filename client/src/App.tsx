import { Route, Routes } from "react-router";
import AuthLayout from "./layout/auth-layout";
import NotFoundPage from "./pages/not-found";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import ProtectedRoute from "./components/auth/protected-route";
import PublicRoute from "./components/auth/public-route";
import DashboardLayout from "./layout/dashboard-layout";
import Spinner from "./components/spinner";
import TodoPage from "./pages/todo";

export default function App() {
  return (
    <Routes>
      <Route
        path="auth"
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/spinner" element={<Spinner />} />
        <Route path="/todo" element={<TodoPage />} />
      </Route>
    </Routes>
  );
}
