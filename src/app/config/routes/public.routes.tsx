import EmailVerificationNoticePage from "@/pages/public/email-verfication/EmailVerificationNoticePage";
import ForgotPasswordPage from "@/pages/public/forget-password/ForgetPasswordPage";
import LoginPage from "@/pages/public/login/LoginPage";
import ResetPasswordPage from "@/pages/public/reset-password/ResetPasswordPage";
import SignupPage from "@/pages/public/signup/SignupPage";

export const publicRoutes = [
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
];
