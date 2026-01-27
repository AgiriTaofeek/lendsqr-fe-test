import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rightElement?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, rightElement, ...props }, ref) => {
    return (
      <div className={classNames("form__group", containerClassName)}>
        <input
          ref={ref}
          className={classNames("form__input", className)}
          {...props}
        />
        {rightElement}
      </div>
    );
  },
);

Input.displayName = "Input";
