"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useActionState } from "react";
import { login } from "./actions";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  const { toast } = useToast();
  const [state, login_action, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [resetStep, setResetStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [forgetPasswordErrors, setForgetPasswordErrors] = useState<
    string | null
  >(null);

  const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Invalid Email address" });

  const updatePasswordSchema = z.object({
    email: z.string().email(),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(72, { message: "Password is too long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
  });

  const handleForgetPassword = () => {
    setIsModalOpen(true);
  };

  const handleSendOTP = async () => {
    try {
      const validatedEmail = emailSchema.parse(email);

      const response = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: validatedEmail }),
      });

      const res = await response.json();

      if (!res.error) {
        const token = res.token;
        localStorage.setItem("tokenForOTP", token);
        toast({
          title: "Success",
          variant: "default",
          description: "OTP sent successfully !",
        });
      }

      if (res.error) {
        return toast({
          title: "Error",
          variant: "destructive",
          description: res.error,
        });
      }

      setResetStep(2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return toast({
          title: "Invalid Email",
          variant: "destructive",
          description: error.errors[0].message,
        });
      }
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const token = localStorage.getItem("tokenForOTP");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, token }),
      });

      const res = await response.json();

      if (!res.success) {
        throw new Error(res.message);
      }

      setResetStep(3);
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "Failed to verify OTP",
      });
    }
  };

  const handleResetPassword = async () => {
    try {
      const result = updatePasswordSchema.safeParse({
        email,
        newPassword,
      });

      if (!result.success) {
        setForgetPasswordErrors(result.error.errors[0].message);
        return;
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Password do not match!");
      }

      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const res = await response.json();

      if (res.error) {
        throw new Error(res.error);
      }
      setIsModalOpen(false);
      setResetStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");

      toast({
        title: "Success",
        variant: "default",
        description: "Password reset successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    }
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {resetStep === 1 && (
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <Button onClick={handleSendOTP} className="w-full">
                  Send OTP
                </Button>
              </div>
            )}
            {resetStep === 2 && (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
                <Button onClick={handleVerifyOTP} className="w-full">
                  Verify OTP
                </Button>
              </div>
            )}
            {resetStep === 3 && (
              <div className="space-y-2">
                {forgetPasswordErrors && (
                  <div className="text-red-500 text-sm mb-2">
                    {forgetPasswordErrors}
                  </div>
                )}
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <Button onClick={handleResetPassword} className="w-full">
                  Reset Password
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Please sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login_action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="button"
              variant="link"
              className="text-sm p-0 h-auto"
              onClick={handleForgetPassword}
            >
              Forgot password?
            </Button>

            <Button
              type="submit"
              className="w-full disabled:bg-opacity-5"
              disabled={pending}
            >
              {pending ? "Submitting..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
