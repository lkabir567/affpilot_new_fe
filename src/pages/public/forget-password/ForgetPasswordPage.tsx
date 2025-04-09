import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/features/auth";
import { primaryLogo } from "@/lib/images/importImage";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Success message display
  const successMessage = (
    <Card className="sm:mx-auto sm:w-full sm:max-w-2xl z-10 px-4 py-4 text-center">
      <div className="flex justify-center">
        <img src={primaryLogo} alt="" className="h-10 w-40 mx-auto" />
      </div>
      <div className="rounded-full bg-green-50 p-3 text-primary mx-auto w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 className="text-lg font-medium">Check your email</h3>
      <p className="text-sm text-muted-foreground">
        We've sent a password reset link to your email address.
      </p>
      <hr />
      <Link
        to={"/login"}
        className="w-full cursor-pointer text-primary text-sm font-semibold hover:underline"
      >
        Return to login
      </Link>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 relative overflow-hidden">
      {isSuccess ? (
        successMessage
      ) : (
        <Card className="sm:mx-auto sm:w-full sm:max-w-2xl z-10 px-4 py-4">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center">
              <img src={primaryLogo} alt="" className="h-10 w-40 mx-auto" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Forgot Password?
              </h1>
              <p className="text-sm text-muted-foreground">
                No problem! It happens to the best of us. Just enter your work
                email address below to reset your password.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm value={{ setIsSuccess }} />
          </CardContent>
          <hr />
          <CardFooter>
            <div className="text-center text-sm font-medium mx-auto">
              Go back to,
              <Link
                to="/login"
                className="text-primary hover:text-primary/90 ml-1"
              >
                Log In
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
