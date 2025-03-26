import type React from "react";
import { useState } from "react";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { primaryLogo } from "@/lib/images/importImage";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Define the form schema with Zod
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers and underscores",
      }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
      message: "Please enter a valid phone number",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
    termsAccepted: z.boolean(), // Changed from z.literal(true) to z.boolean()
    captchaToken: z
      .string()
      .min(1, { message: "Please verify that you're not a robot" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Type for our form data
type FormData = z.infer<typeof formSchema>;

function Registration() {
  const navigate = useNavigate();
  // Initial form state
  const initialFormState: FormData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    captchaToken: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle captcha completion
  const handleCaptchaChange = (token: string | null) => {
    setFormData({
      ...formData,
      captchaToken: token || "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = formSchema.parse(formData);

      // Prepare data to send to the server (exclude termsAccepted and captchaToken)
      const { termsAccepted, captchaToken, ...dataToSend } = formData;

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted successfully:", dataToSend);
      setIsSuccess(true);
      setFormData(initialFormState);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        setErrors({ form: "An unexpected error occurred" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-primary",
    ];

    return {
      strength,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "",
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  //   console.log(formData);

  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 relative overflow-hidden mb-2">
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

        <div className="px-4 sm:px-10">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">
                Registration successful!
              </h3>
              <div className="mt-3 text-sm text-gray-500">
                <p>Your account has been created successfully.</p>
                <p>Check your email for confirmation.</p>
              </div>
              <div className="mt-6">
                <Button onClick={() => setIsSuccess(false)}>
                  Register another account
                </Button>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errors.form && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {errors.form}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              <hr />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* First Name */}
                <div className="relative">
                  <Label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-3 pl-10 border ${
                        errors.firstName
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors duration-200`}
                      placeholder="John"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="relative">
                  <Label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-3 pl-10 border ${
                        errors.lastName
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors duration-200`}
                      placeholder="Doe"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="relative">
                <Label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-3 pl-10 border ${
                      errors.username
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors duration-200`}
                    placeholder="johndoe"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">@</span>
                  </div>
                </div>
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-3 pl-10 border ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors duration-200`}
                    placeholder="john.doe@example.com"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="relative">
                <Label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone number
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <PhoneInput
                    country={"bd"} // Set default country
                    value={formData.phone}
                    onChange={(phone, countryData) => {
                      const parsedNumber = parsePhoneNumberFromString(
                        phone,
                        countryData?.countryCode?.toUpperCase()
                      );

                      if (parsedNumber?.isValid()) {
                        setFormData({ ...formData, phone });
                      }

                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        phone:
                          parsedNumber && parsedNumber.isValid()
                            ? ""
                            : "Invalid phone number",
                      }));
                    }}
                    inputProps={{
                      name: "phone",
                      required: true,
                      className: `appearance-none block w-full px-3 py-3 pl-12 border ${
                        errors.phone
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-primary/50 focus:border-primary"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors duration-200`,
                    }}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* password */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password */}
                  <div className="relative">
                    <Label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-3 pl-10 pr-10 border ${
                          errors.password
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors duration-200`}
                        placeholder="••••••••"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <Label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </Label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-3 pl-10 pr-10 border ${
                          errors.confirmPassword
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors duration-200`}
                        placeholder="••••••••"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-gray-500">
                        Password strength:
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{
                          color:
                            passwordStrength.strength >= 4
                              ? "#10B981"
                              : passwordStrength.strength >= 3
                              ? "#3B82F6"
                              : passwordStrength.strength >= 2
                              ? "#F59E0B"
                              : "#EF4444",
                        }}
                      >
                        {passwordStrength.label}
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300 ease-in-out`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <hr />
              {/* Terms and Conditions */}
              <div className="flex items-center justify-center space-x-2">
                <Input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 my-auto"
                  checked={formData.termsAccepted} // Correctly bind the checkbox state
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      termsAccepted: e.target.checked,
                    })
                  } // Update state on change
                />

                <Label
                  htmlFor="terms"
                  className="flex items-center cursor-pointer text-sm space-x-1"
                >
                  <p className="text-sm">
                    I agree to the{" "}
                    <Link
                      to="https://affpilot.com/terms/"
                      target="_blank"
                      className="text-primary"
                    >
                      Terms & Conditions,
                    </Link>{" "}
                    <Link
                      to="https://affpilot.com/privacy-policy/"
                      target="_blank"
                      className="text-primary"
                    >
                      Privacy Policy,
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="https://affpilot.com/refund-policy/"
                      target="_blank"
                      className="text-primary"
                    >
                      Refund Policy.
                    </Link>
                  </p>
                </Label>
              </div>

              {/* reCAPTCHA */}
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

              <div>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    formData.termsAccepted === false ||
                    formData.captchaToken === ""
                  }
                  className={`w-full${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <p
                  className="font-medium text-primary hover:text-primary/50 underline inline-block"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </p>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Registration;
