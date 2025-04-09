import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema } from "../schemas/auth.schemas";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    setLoading(true);
    // Simulate an API call to reset the password
    console.log("Form submitted:", data);
    // Here you would typically send the data to your API
    setTimeout(() => {
      setLoading(false);
      // Reset the form after submission
      form.reset();
      // Redirect or show success message
    }, 2000);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* new-password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your new password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <span
                  className={`absolute right-3 cursor-pointer text-muted-foreground top-7`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-6" />
                  ) : (
                    <Eye className="w-4 h-6" />
                  )}
                </span>
                <FormMessage />
                <FormDescription>
                  Password must be at least 8 characters and include uppercase,
                  lowercase, number, and special character.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* new-confirm password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your new password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <span
                  className={`absolute right-3 top-1/2 ${
                    form.formState.errors.confirmPassword
                      ? "top-1/3"
                      : "top-1/2"
                  } cursor-pointer text-muted-foreground`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  );
}
