import { z } from "zod";

// loginFormSchema
export const loginSchema = z.object({
  username: z.string().min(1, "Username or email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  captchaToken: z.string().min(1, "Captcha verification is required"),
});

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

const passwordFieldWithConfirm = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" });

// registerFormSchema
export const registerSchema = z
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
    password: passwordField,
    confirmPassword: passwordFieldWithConfirm,
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
    captchaToken: z
      .string()
      .min(1, { message: "Please verify that you're not a robot" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// resetPasswordSchema
export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: passwordFieldWithConfirm,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
