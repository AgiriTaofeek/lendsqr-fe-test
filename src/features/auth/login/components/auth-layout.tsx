import { HeroSection } from "@/features/auth/login/components/hero-section";
import { FormSection } from "@/features/auth/login/components/form-section";

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <HeroSection />
      <FormSection />
    </div>
  );
}
