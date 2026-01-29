import { Link } from "@tanstack/react-router";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { Button } from "./button";

export function NotFoundComponent() {
  return (
    <div className="error-page">
      <div className="error-page__content">
        <HiOutlineEmojiSad className="error-page__icon" />
        <div className="error-page__code">404</div>
        <h1 className="error-page__title">Page Not Found</h1>
        <p className="error-page__message">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/users">
          <Button>Back to Users</Button>
        </Link>
      </div>
    </div>
  );
}
