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
import { useResetPasswordMutation } from "@/redux/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema } from "../schemas/auth.schemas";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({
  code,
  setIsSuccess,
}: {
  code: string | null;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    // Simulate an API call to reset the password
    if (!code) return;

    try {
      const response = await resetPassword({
        code,
        new_password: data.new_password,
      }).unwrap();
      if (response.status === "success") {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* new-password */}
          <FormField
            control={form.control}
            name="new_password"
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
            name="confirm_password"
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
                    form.formState.errors.confirm_password
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
          <Button
            type="submit"
            className="w-full"
            disabled={loading || isLoading}
          >
            {loading || isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  );
}
