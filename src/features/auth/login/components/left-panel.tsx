import { Image } from "@unpic/react";

import lensqrLogo from "@/assets/images/lensqr-logo.svg";
import pabloIllustration from "@/assets/images/pablo-sign-in.svg";

export function LeftPanel() {
  return (
    <div className="login-page__hero">
      <Image
        src={lensqrLogo}
        alt="Lendsqr Logo"
        className="login-page__hero-logo"
        layout="constrained"
        width={150}
        height={40}
      />
      <Image
        src={pabloIllustration}
        alt="Login Illustration"
        className="login-page__hero-image"
        layout="constrained"
        width={600}
        height={400}
      />
    </div>
  );
}
