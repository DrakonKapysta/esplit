import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ClassValue } from "clsx";
import React, { ComponentPropsWithoutRef } from "react";

interface SidebarLinkProps extends ComponentPropsWithoutRef<"a"> {
  path: string;
  text: string;
  icon?: React.ReactNode;
  activeStyles?: ClassValue;
}

export const SidebarLink = React.forwardRef<
  HTMLAnchorElement,
  SidebarLinkProps
>(({ path, text, icon, className, activeStyles, ...props }, ref) => {
  const ariaLabel = `Link to ${text}`;
  return (
    <Link
      {...props}
      ref={ref}
      className={cn(
        "p-2 flex gap-2 items-center truncate w-full rounded",
        className
      )}
      activeProps={{
        className: cn("bg-slate-300", activeStyles),
      }}
      aria-label={ariaLabel}
      to={path}
      title={text}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
});
SidebarLink.displayName = "SidebarLink";
