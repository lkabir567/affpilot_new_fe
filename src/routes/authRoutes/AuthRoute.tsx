import ForgotPasswordForm from "@/pages/auth/forgotPassword/ForgotPassword";
import LoginPage from "@/pages/auth/login/Login";
import Registration from "@/pages/auth/register/Register";
import ResetPassword from "@/pages/auth/resetPassword/ResetPassword";
import { Route, Routes } from "react-router-dom";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AuthRoute;
