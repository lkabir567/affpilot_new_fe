import DashboardLayout from "@/pages/private/dashboard/DashboardLayout";
import OverviewPage from "@/pages/private/dashboard/overview/OverviewPage";
import ForgotPasswordPage from "@/pages/public/forget-password/ForgetPasswordPage";
import LoginPage from "@/pages/public/login/LoginPage";
import ResetPasswordPage from "@/pages/public/reset-password/ResetPasswordPage";
import SignupPage from "@/pages/public/signup/SignupPage";
import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../core/route-protection/AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <OverviewPage />,
      },
    ],
  },
]);
