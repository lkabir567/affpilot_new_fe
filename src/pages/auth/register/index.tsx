import { Card } from "@/components/ui/card";
import { primaryLogo } from "@/lib/images/importImage";
import { Link } from "react-router-dom";
import RegistrationForm from "./RegisterForm";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const RegisterPage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Success message display
  const successMessage = (
    <Card className="sm:mx-auto sm:w-full sm:max-w-4xl z-10">
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="flex justify-center mb-4">
          <img src={primaryLogo} alt="" className="h-10 w-40 mx-auto" />
        </div>
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-6 text-xl font-medium text-gray-900">
          Registration successful!
        </h3>
        <div className="mt-3 text-sm text-gray-500">
          <p>Your account has been created successfully.</p>
          <p>Check your email for confirmation.</p>
        </div>
      </div>
      <hr />
      <div className="mx-auto">
        <Link
          to={"/login"}
          className="text-primary text-sm font-semibold hover:underline"
        >
          Go back to Login
        </Link>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 relative overflow-hidden mb-2">
      {isSuccess ? (
        successMessage
      ) : (
        <Card className="sm:mx-auto sm:w-full sm:max-w-4xl z-10">
          <div className="text-center space-y-2">
            <img src={primaryLogo} alt="" className="h-10 w-40 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-700">
              Create an account
            </h2>
            <p className="text-sm text-gray-600">
              Please enter work email below and complete the profile information
              to continue
            </p>
          </div>
          <hr />
          <RegistrationForm value={{ setIsSuccess }} />

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/50 underline inline-block"
            >
              Sign in
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RegisterPage;
