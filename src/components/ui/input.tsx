import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React, { useId } from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  labelStyles?: ClassValue;
  errorStyles?: ClassValue;
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, labelStyles, errorMessage, errorStyles, ...props },
    ref
  ) => {
    const id = useId();
    return (
      <>
        {label && (
          <label className={cn("", labelStyles)} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          className={cn("mb-4 rounded p-1 border border-slate-800", className)}
          {...props}
          ref={ref}
        />
        {!!errorMessage && (
          <span className={cn("text-red-500 mb-2", errorStyles)}>
            {errorMessage}
          </span>
        )}
      </>
    );
  }
);
