import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResetPasswordForm } from "@/features/auth";
import useManageQueryParams from "@/hooks/useManageQueryParams";
import { primaryLogo } from "@/lib/images/importImage";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const { readQueryParam } = useManageQueryParams();
  const code = readQueryParam("code");
  console.log("code", code);
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
      <h3 className="text-lg font-medium">
        Your password has been changed successfully.
      </h3>
      <p className="text-sm text-muted-foreground">
        You can now sign in with your new password and continue using our
        platform.
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
    <div className="h-screen flex items-center justify-center">
      {isSuccess ? (
        successMessage
      ) : (
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <div className="flex justify-center">
              <img src={primaryLogo} alt="" className="h-10 w-40 mx-auto" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 my-2 mx-auto">
              <KeyRound className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-center text-xl">
              Reset Password
            </CardTitle>
            <CardDescription className="text-center">
              Create a new password for your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ResetPasswordForm code={code} setIsSuccess={setIsSuccess} />
          </CardContent>

          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Remembered your password?{" "}
            </div>
            <Link
              to="/login"
              className="text-sm text-primary hover:underline font-semibold"
            >
              {" "}
              Back to login
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ResetPasswordPage;
