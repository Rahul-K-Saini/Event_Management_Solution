import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JoinAsCompanyForm from "./join-as-company-Form";

export default function JoinAsCompany() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="space-y-4">
          <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Join as Company
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Register your company for our event management platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JoinAsCompanyForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            By registering, you agree to our{" "}
            <a
              href="/terms"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
