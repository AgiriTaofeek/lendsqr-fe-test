import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary"; // Expandable for 'secondary', 'outline', etc.
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", isLoading, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={classNames("btn", `btn--${variant}`, className)}
        disabled={isLoading || disabled}
        style={{ opacity: isLoading ? 0.7 : 1, ...props.style }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
