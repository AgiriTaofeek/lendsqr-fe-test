import { Image } from "@unpic/react";

import lensqrLogo from "@/assets/images/lensqr-logo.svg";
import pabloIllustration from "@/assets/images/pablo-sign-in.svg";

export function HeroSection() {
  return (
    <div className="hero-section">
      <Image
        src={lensqrLogo}
        alt="Lendsqr Logo"
        className="hero-section__logo"
        layout="constrained"
        width={150}
        height={40}
      />
      <Image
        src={pabloIllustration}
        alt="Login Illustration"
        className="hero-section__image"
        layout="constrained"
        width={600}
        height={400}
      />
    </div>
  );
}
