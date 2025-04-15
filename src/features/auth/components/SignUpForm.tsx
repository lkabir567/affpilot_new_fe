import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ENV } from "@/lib/dot.env";

import { useSignupMutation } from "@/redux/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registerSchema } from "../schemas/auth.schemas";
import { getPasswordStrength } from "../utils/passwordIndicator";

type SignupFormProps = {
  value: {
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export function SignupForm({ value }: SignupFormProps) {
  const { setIsSuccess } = value;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signup] = useSignupMutation();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      captchaToken: "",
    },
  });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signup(data).unwrap();
      setIsSuccess(true);
    } catch (error: any) {
      if (error.status === 400 && error.data) {
        // Handle field-specific errors
        Object.entries(error.data).forEach(([field, messages]) => {
          const formField = field as keyof RegisterFormData;
          const message = (messages as string[]).join(" ");

          if (Object.keys(form.getValues()).includes(formField)) {
            form.setError(formField, { type: "manual", message });
          } else {
            form.setError("root", { type: "manual", message });
          }
        });
      } else {
        // Handle generic errors
        form.setError("root", {
          type: "manual",
          message: "An error occurred during registration",
        });
      }
    }
  };

  const handleCaptchaChange = (token: string) => {
    form.setValue("captchaToken", token);
  };

  // from utils/passwordIndicator.ts
  const passwordStrength = getPasswordStrength(form.watch("password"));

  return (
    <>
      <div className="px-4 sm:px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-4 sm:px-10"
          >
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive text-center">
                {form.formState.errors.root.message}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First-name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last-name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* user-name */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country="bd"
                      value={field.value}
                      onChange={(phone) => {
                        const parsed = parsePhoneNumberFromString(phone, "BD");
                        form.setValue("phone", phone);
                        if (!parsed?.isValid()) {
                          form.setError("phone", {
                            message: "Invalid phone number",
                          });
                        } else {
                          form.clearErrors("phone");
                        }
                      }}
                      inputProps={{
                        name: field.name,
                        required: true,
                      }}
                      inputStyle={{ width: "100%" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <span
                      className={`absolute right-3 ${
                        form.formState.errors.password ? "top-1/3" : "top-1/2"
                      } cursor-pointer text-muted-foreground`}
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

              {/* confirm-password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <span
                      className={`absolute right-3 ${
                        form.formState.errors.confirmPassword
                          ? "top-1/3"
                          : "top-1/2"
                      } cursor-pointer text-muted-foreground`}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-6" />
                      ) : (
                        <Eye className="w-4 h-6" />
                      )}
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* password-strength indicator */}
            {passwordStrength.strength > 0 && (
              <div className="mt-2">
                <div className="h-2 w-full bg-gray-200 rounded">
                  <div
                    className={`h-full ${passwordStrength.color} rounded transition-all`}
                    style={{
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Strength: {passwordStrength.label}
                </p>
              </div>
            )}

            <hr />

            {/* terms & condition */}
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center gap-2">
                      <FormControl className="w-6 h-6">
                        <Input
                          type="checkbox"
                          id="terms"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <div className="text-sm font-semibold">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary ">
                          Terms
                        </Link>
                        ,{" "}
                        <Link to="/privacy-policy" className="text-primary">
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link to="/refund-policy" className="text-primary">
                          Refund Policy
                        </Link>
                      </div>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* captcha */}
            <FormField
              control={form.control}
              name="captchaToken"
              render={() => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <ReCAPTCHA
                      sitekey={ENV.SITE_KEY}
                      onChange={handleCaptchaChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
