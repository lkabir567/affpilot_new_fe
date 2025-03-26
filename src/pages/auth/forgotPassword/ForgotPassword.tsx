import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { primaryLogo } from "@/lib/images/importImage";
import { Label } from "@/components/ui/label";

// Define form validation schema
const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

// Define TypeScript type for form values
type FormValues = {
  email: string;
};

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState<FormValues>({ email: "" });
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          newErrors[err.path[0]] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Success message display
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 relative overflow-hidden">
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
          <Button
            className="w-full cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Return to login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 relative overflow-hidden">
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Work Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>

          <div className="text-center text-sm font-medium">
            Go back,
            <Link
              to="/login"
              className="text-primary hover:text-primary/90 ml-1"
            >
              Log In
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
