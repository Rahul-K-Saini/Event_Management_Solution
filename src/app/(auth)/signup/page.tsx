import SignupForm from "./SignupForm";
import { ImageSection, FormSection } from "../_components/commonPage";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      <ImageSection />
      <FormSection Form={SignupForm} />
    </div>
  );
}
