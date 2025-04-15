import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ENV } from "@/lib/dot.env";

import { useGoogleLoginMutation, useLoginMutation } from "@/redux/api";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { useAppSelector } from "@/redux/hooks/useAppSelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { loginSchema } from "../schemas/auth.schemas";

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      captchaToken: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const { recaptchaVerified } = useAppSelector((state) => state.auth);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      form.clearErrors();
      googleLogin({ access_token })
        .unwrap()
        .catch((error) => {
          const errorMessage = getErrorMessage(error);
          form.setError("root", { type: "manual", message: errorMessage });
        });
    },
    onError: () => {
      form.setError("root", {
        type: "manual",
        message: "Google login failed. Please try again.",
      });
    },
  });

  const loadingState = loginLoading || isLoading;

  const getErrorMessage = (error: any): string => {
    if (error?.status === "FETCH_ERROR") {
      return "Network error. Please check your internet connection.";
    }
    return (
      error?.data?.message || "An unexpected error occurred. Please try again."
    );
  };

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      form.clearErrors();
      await login(data).unwrap();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      form.setError("root", { type: "manual", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    form.setValue("captchaToken", value || "");
    form.trigger("captchaToken");
  };

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Root Error Message */}
            {form.formState.errors.root && (
              <div
                role="alert"
                className="text-red-500 text-sm text-center mb-4"
              >
                {form.formState.errors.root.message}
              </div>
            )}

            {/* username or email */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@example.com"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.clearErrors("root");
                      }}
                    />
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
                      onChange={(e) => {
                        field.onChange(e);
                        form.clearErrors("root");
                      }}
                    />
                  </FormControl>
                  <span
                    className={`absolute right-3 top-8.5 cursor-pointer text-muted-foreground`}
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
            <Button
              type="submit"
              className="w-full"
              disabled={loadingState}
              aria-disabled={loadingState}
            >
              {loadingState ? "Logging in..." : "Login"}
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
          aria-label="Continue with Google"
        >
          {/* Google SVG Icon */}
          Continue with Gmail
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          First time here?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </>
  );
}
