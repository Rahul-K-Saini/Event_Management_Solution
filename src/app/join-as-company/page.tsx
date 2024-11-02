import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function JoinAsCompany() {
  return (
    <div className="flex justify-center items-center min-h-screen  bg-gradient-to-br from-purple-500 to-pink-500 p-4">
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
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Company Information Section */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-semibold ">
                  Company Information
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="16" height="16" x="4" y="4" rx="2" />
                        <path d="M9 18v-6" />
                        <path d="M15 18v-6" />
                        <path d="M5 8h14" />
                        <path d="M4 12h16" />
                      </svg>
                      Company Name *
                    </label>
                    <Input
                      name="companyName"
                      placeholder="Acme Inc."
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Website *
                    </label>
                    <Input
                      name="website"
                      placeholder="https://www.example.com"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="contact@example.com"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      Phone *
                    </label>
                    <Input
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      Company Description
                    </label>
                    <Textarea
                      name="description"
                      placeholder="Tell us about your company..."
                      className="mt-1 resize-none"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-semibold ">
                  Social Media Presence
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="relative">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      LinkedIn
                    </label>
                    <Input
                      name="linkedin"
                      placeholder="https://www.linkedin.com/company/..."
                      className="mt-1"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                      Twitter
                    </label>
                    <Input
                      name="twitter"
                      placeholder="https://twitter.com/..."
                      className="mt-1"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      Facebook
                    </label>
                    <Input
                      name="facebook"
                      placeholder="https://www.facebook.com/..."
                      className="mt-1"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      Instagram
                    </label>
                    <Input
                      name="instagram"
                      placeholder="https://www.instagram.com/..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg text-lg font-semibold transition-all duration-200 hover:shadow-lg"
            >
              Submit Registration
            </Button>
          </form>
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
