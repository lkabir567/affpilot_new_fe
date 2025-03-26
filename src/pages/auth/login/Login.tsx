import type React from "react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { primaryLogo } from "@/lib/images/importImage";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

// Define validation schema with zod
const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  captchaToken: z.string().min(1, "Captcha verification is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    usernameOrEmail: "",
    password: "",
    captchaToken: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle captcha completion
  const handleCaptchaChange = (token: string | null) => {
    setFormData((prev) => ({
      ...prev,
      captchaToken: token || "",
    }));

    // Remove captcha error if filled
    if (token) {
      setErrors((prev) => ({
        ...prev,
        captchaToken: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const { captchaToken, ...restData } = formData;
      console.log("Login successful", restData);
      // Redirect or handle successful login
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
    // Implement Google OAuth login
  };

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
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usernameOrEmail">Username or Email</Label>
              <div className="relative">
                <Input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="email"
                  placeholder="Username or Email"
                  value={formData.usernameOrEmail}
                  onChange={handleInputChange}
                  className={errors.usernameOrEmail ? "border-destructive" : ""}
                  aria-invalid={!!errors.usernameOrEmail}
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              {errors.usernameOrEmail && (
                <p className="text-sm text-destructive">
                  {errors.usernameOrEmail}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "border-destructive" : ""}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey="6LdxxREnAAAAAECR3mOVhctg3eP2tS1JGFZFcXu6"
                onChange={handleCaptchaChange}
                theme="light"
              />
            </div>
            {errors.captchaToken && (
              <p className="mt-2 text-sm text-red-600 text-center">
                {errors.captchaToken}
              </p>
            )}

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading || !formData.captchaToken}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-0">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center gap-2 cursor-pointer"
            onClick={handleGoogleLogin}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path
                  fill="#4285F4"
                  d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                />
                <path
                  fill="#34A853"
                  d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                />
                <path
                  fill="#EA4335"
                  d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                />
              </g>
            </svg>
            Continue with Gmail
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            First time here?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
