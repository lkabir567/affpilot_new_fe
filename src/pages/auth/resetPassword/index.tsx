import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { primaryLogo } from "@/lib/images/importImage";
import { KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <div className="flex justify-center">
            <img src={primaryLogo} alt="" className="h-10 w-40 mx-auto" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 my-2 mx-auto">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-center text-xl">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Create a new password for your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ResetPasswordForm />
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
    </div>
  );
};

export default ResetPassword;
