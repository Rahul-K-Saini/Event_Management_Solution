"use client";
import {
  MailIcon,
  BuildingIcon,
  GlobeIcon,
  PhoneIcon,
  MessageIcon,
  LinkedInIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  PasswordIcon,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect } from "react";
import { signup } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function JoinAsCompanyForm() {
  const [state, join_as_company_action, pending] = useActionState(
    signup,
    undefined
  );
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const handleSuccess = () => {
      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
        variant: "default",
        duration: 3000,
      });
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 2000);
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
    } else if (state?.errors?._form) {
      handleError();
    }
  }, [state, router, toast]);

  return (
    <form action={join_as_company_action} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <CompanyInformationSection errors={state?.errors} />
        <SocialMediaSection errors={state?.errors} />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg text-lg font-semibold transition-all duration-200 hover:shadow-lg"
      >
        {pending ? "Submitting" : "Submit Registration"}
      </Button>
    </form>
  );
}

const CompanyInformationSection = ({
  errors,
}: {
  errors?: Record<string, string[]>;
}) => (
  <div className="space-y-4 md:col-span-2">
    <h3 className="text-lg font-semibold">Company Information</h3>
    <div className="space-y-4">
      <FormField
        icon={<BuildingIcon />}
        label="Company Name *"
        name="name"
        placeholder="Acme Inc."
        type="text"
        required={true}
        isTextarea={false}
        error={errors?.name?.[0]}
      />
      <FormField
        icon={<PasswordIcon />}
        label="Password"
        name="password"
        placeholder="********"
        type="password"
        required={true}
        isTextarea={false}
        error={errors?.password?.[0]}
      />
      <FormField
        icon={<GlobeIcon />}
        label="Website *"
        name="website"
        placeholder="https://www.example.com"
        type="text"
        required={true}
        isTextarea={false}
        error={errors?.website?.[0]}
      />
      <FormField
        icon={<MailIcon />}
        label="Email *"
        name="email"
        type="email"
        placeholder="contact@example.com"
        required={true}
        isTextarea={false}
        error={errors?.email?.[0]}
      />
      <FormField
        icon={<PhoneIcon />}
        label="Phone *"
        name="phone"
        placeholder="+1 (555) 123-4567"
        type="tel"
        required={true}
        isTextarea={false}
        error={errors?.phone?.[0]}
      />
      <FormField
        icon={<MessageIcon />}
        label="Company Description"
        name="description"
        type="text"
        isTextarea={true}
        placeholder="Tell us about your company..."
        required={false}
        error={errors?.description?.[0]}
      />
    </div>
  </div>
);

const SocialMediaSection = ({
  errors,
}: {
  errors?: Record<string, string[]>;
}) => (
  <div className="space-y-4 md:col-span-2">
    <h3 className="text-lg font-semibold">Social Media Presence</h3>
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        icon={<LinkedInIcon />}
        label="LinkedIn"
        name="linkedin"
        placeholder="https://www.linkedin.com/company/..."
        type="url"
        required={false}
        isTextarea={false}
        error={errors?.linkedin?.[0]}
      />
      <FormField
        icon={<TwitterIcon />}
        label="Twitter"
        name="twitter"
        placeholder="https://twitter.com/..."
        type="url"
        required={false}
        isTextarea={false}
        error={errors?.twitter?.[0]}
      />
      <FormField
        icon={<FacebookIcon />}
        label="Facebook"
        name="facebook"
        placeholder="https://www.facebook.com/..."
        type="url"
        required={false}
        isTextarea={false}
        error={errors?.facebook?.[0]}
      />
      <FormField
        icon={<InstagramIcon />}
        label="Instagram"
        name="instagram"
        placeholder="https://www.instagram.com/..."
        type="url"
        required={false}
        isTextarea={false}
        error={errors?.instagram?.[0]}
      />
    </div>
  </div>
);

const FormField = ({
  icon,
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  isTextarea = false,
  error,
}: {
  icon: React.ReactElement;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
  isTextarea: boolean;
  error?: string;
}) => (
  <div className="relative">
    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
      {icon}
      {label}
    </label>
    {isTextarea ? (
      <Textarea
        name={name}
        placeholder={placeholder}
        className="mt-1 resize-none"
        rows={4}
      />
    ) : (
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1"
        required={required}
      />
    )}
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);
