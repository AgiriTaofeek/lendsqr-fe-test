import { Image } from "@unpic/react";
import lensqrLogo from "@/assets/images/lensqr-logo.svg";
import { LoginForm } from "./login-form";

export function RightPanel() {
  return (
    <div className="login-page__content">
      <div className="login-page__form-wrapper">
        <Image
          src={lensqrLogo}
          alt="Lendsqr Logo"
          className="login-page__mobile-logo"
          layout="constrained"
          width={150}
          height={40}
        />
        <h1 className="login-page__title">Welcome!</h1>
        <p className="login-page__subtitle">Enter details to login.</p>

        <LoginForm />
      </div>
    </div>
  );
}
