import { Image } from "@unpic/react";
import lensqrLogo from "@/assets/images/lensqr-logo.svg";
import { LoginForm } from "./login-form";

export function FormSection() {
  return (
    <div className="form-section">
      <div className="form-section__wrapper">
        <Image
          src={lensqrLogo}
          alt="Lendsqr Logo"
          className="form-section__mobile-logo"
          layout="constrained"
          width={150}
          height={40}
        />
        <h1 className="form-section__title">Welcome!</h1>
        <p className="form-section__subtitle">Enter details to login.</p>

        <LoginForm />
      </div>
    </div>
  );
}
