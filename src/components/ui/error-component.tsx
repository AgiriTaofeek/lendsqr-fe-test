import { useRouter } from "@tanstack/react-router";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from "./button";

export function ErrorComponent({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="error-page">
      <div className="error-page__content">
        <HiOutlineExclamationCircle className="error-page__icon" />
        <h1 className="error-page__title">Something went wrong</h1>
        <p className="error-page__message">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <Button onClick={() => router.invalidate()}>Try Again</Button>
      </div>
    </div>
  );
}
