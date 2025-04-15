import { Card, CardHeader } from "@/components/ui/card";
import { LoginForm } from "@/features/auth";
import { primaryLogo } from "@/lib/images/importImage";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 relative overflow-hidden">
      <Card className="sm:mx-auto sm:w-full sm:max-w-2xl z-10">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <img src={primaryLogo} alt="" className="h-10 w-40 mx-auto" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-sm text-muted-foreground">
              Please enter username below to continue
            </p>
          </div>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
