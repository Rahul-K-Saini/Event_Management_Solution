"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { signup } from "./actions";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [state, signup_action, pending] = useActionState(signup, undefined);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const handleSuccess = () => {
      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
        variant: "default",
        duration: 2000,
      });
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 1000);
      return () => clearTimeout(timeout);
    };
  
    const handleError = () => {
      toast({
        title: "Error",
        description: state?.errors?._form,
        variant: "destructive",
        duration: 5000,
      });
    };
  
    if (state?.success) {
      handleSuccess();
    }
    else if (state?.errors?._form) {
      handleError();
    }
  }, [state,router,toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Please register for your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signup_action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              id="name"
              type="name"
              placeholder="John Singh"
              required
            />
            {state?.errors?.name?.map((error, index) => (
              <p key={index} className="text-red-500 text-sm">
                {error}
              </p>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="john@example.com"
              required
            />
            {state?.errors?.email?.map((error, index) => (
              <p key={index} className="text-red-500 text-sm">
                {error}
              </p>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              name="phone"
              id="phone"
              type="phone"
              placeholder="1234567890"
              required
            />
            {state?.errors?.phone?.map((error, index) => (
              <p key={index} className="text-red-500 text-sm">
                {error}
              </p>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
            {state?.errors?.password?.map((error, index) => (
              <p key={index} className="text-red-500 text-sm">
                {error}
              </p>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full disabled:bg-opacity-5"
            disabled={pending}
          >
            {pending ? "Submitting..." : "Sign up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto">
            <Link href="/login">Sign in</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
