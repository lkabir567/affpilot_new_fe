import ForgotPasswordForm from "@/pages/auth/forgotPassword/ForgotPassword";
import LoginPage from "@/pages/auth/login/Login";
import Registration from "@/pages/auth/register/Register";
import { Route, Routes } from "react-router-dom";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
    </Routes>
  );
};

export default AuthRoute;
