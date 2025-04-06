import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ENV } from "@/lib/dot.env";
import { loginSchema } from "../utils/schema";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
      captchaToken: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    console.log("Form submitted", values);
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
    // Implement Google OAuth login
  };

  const handleCaptchaChange = (value: string | null) => {
    form.setValue("captchaToken", value || "");
    form.trigger("captchaToken");
  };

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* username or email */}
            <FormField
              control={form.control}
              name="usernameOrEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to={"/forgot-password"}
                      className="text-primary font-semibold text-sm hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <span
                    className={`absolute right-3 top-12 cursor-pointer text-muted-foreground`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-6" />
                    ) : (
                      <Eye className="w-4 h-6" />
                    )}
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* captcha */}
            <FormField
              control={form.control}
              name="captchaToken"
              render={() => (
                <FormItem>
                  <div className="flex flex-col space-y-2 mx-auto">
                    <FormLabel>Captcha</FormLabel>

                    <FormControl className="w-full mx-auto">
                      <ReCAPTCHA
                        sitekey={ENV.SITE_KEY}
                        onChange={handleCaptchaChange}
                        theme="light"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-sm text-muted-foreground">
                      Verify that you are human
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <hr />

            {/*submit-button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
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
    </>
  );
}
