import LoginForm from "./LoginForm";
import { ImageSection, FormSection } from "../_components/commonPage";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <ImageSection />
      <FormSection Form={LoginForm} />
    </div>
  );
}
