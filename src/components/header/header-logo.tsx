import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "@/assets/images/lensqr-logo.svg";

export function HeaderLogo({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <>
      <button
        className="header-menu-btn"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar menu"
      >
        <GiHamburgerMenu />
      </button>
      <Link to="/" className="header-logo">
        <Image
          src={logo}
          alt="Lendsqr Logo"
          layout="constrained"
          width={145}
          height={30}
        />
      </Link>
    </>
    // <div className="header__part-left">
    //   <button
    //     className="header__menu-btn"
    //     onClick={toggleSidebar}
    //     aria-label="Toggle sidebar menu"
    //   >
    //     <GiHamburgerMenu />
    //   </button>
    //   <Link to="/" className="header__logo">
    //     <Image
    //       src={logo}
    //       alt="Lendsqr Logo"
    //       layout="constrained"
    //       width={145}
    //       height={30}
    //     />
    //   </Link>
    // </div>
  );
}
