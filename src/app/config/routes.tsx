import DashboardLayout from "@/pages/private/dashboard/DashboardLayout";
import OverviewPage from "@/pages/private/dashboard/overview/OverviewPage";
import EmailVerificationNoticePage from "@/pages/public/email-verfication/EmailVerificationNoticePage";
import ForgotPasswordPage from "@/pages/public/forget-password/ForgetPasswordPage";
import LoginPage from "@/pages/public/login/LoginPage";
import ResetPasswordPage from "@/pages/public/reset-password/ResetPasswordPage";
import SignupPage from "@/pages/public/signup/SignupPage";
import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../core/route-protection/AuthGuard";
import { contentGenerationRoute } from "./content-route/content.route";

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
    path: "/verify-email",
    element: <EmailVerificationNoticePage />,
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
      ...contentGenerationRoute,
    ],
  },
]);
