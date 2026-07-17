"use client";

import { cn } from "@/lib/utils/index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavLink = ({
  className,
  isActive: propIsActive,
  isTextBlack,
  ...props
}: React.ComponentProps<typeof Link> & {
  isActive?: boolean;
  isTextBlack?: boolean;
}) => {
  const pathname = usePathname();

  // Compute active state based on route path
  const hrefStr =
    typeof props.href === "string" ? props.href : props.href.pathname || "";
  const firstSegment = `/${pathname.split("/")[1]}`;
  const currentActive = firstSegment === "/" ? "/" : firstSegment;
  const isActive =
    propIsActive !== undefined ? propIsActive : currentActive === hrefStr;

  return (
    <Link
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center font-semibold transition-colors duration-300 pb-1 min-w-15",
        // Underline animation - sophisticated modern look with more spacing
        "after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-0 after:-translate-x-1/2 after:origin-center after:bg-secondary after:transition-all after:duration-500 after:ease-out rounded-sm",
        // Hover state - smooth expand from center
        "hover:after:w-full hover:after:left-1/2 hover:after:-translate-x-1/2 hover:text-secondary/90",
        // Active state vs Normal/Transparent states
        isActive
          ? "text-secondary/100 after:w-full after:left-1/2 after:-translate-x-1/2 after:bg-secondary"
          : "text-neutral-800 dark:text-neutral-200 group-[.header-transparent]:text-white group-[.header-transparent]:hover:text-secondary/90",
        className,
      )}
    >
      {props.children}
    </Link>
  );
};
