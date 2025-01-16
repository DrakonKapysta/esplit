import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  label?: string;
  labelStyles?: ClassValue;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, labelStyles, className, children, ...props }, ref) => {
    return (
      <>
        {label && <label className={cn("", labelStyles)}>{label}</label>}
        <select className={cn("p-2 rounded", className)} ref={ref} {...props}>
          {children}
        </select>
      </>
    );
  }
);
