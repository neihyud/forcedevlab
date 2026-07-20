"use client";

import { cn } from "@/lib/utils";
import React from "react";

type AccentTitleProps = {
  /** The label text to display */
  title: string;
  /** Optional extra classNames on the wrapper */
  className?: string;
  /** Optional extra classNames on the title text */
  titleClassName?: string;
  /** Override accent bar color (default class: bg-[#ff9500]) */
  accentClassName?: string;
  /** Override title text color (default class: text-[#0b1237]) */
  titleColorClass?: string;
};

/**
 * AccentTitle — reusable section/card header component.
 *
 * Figma node: 328:5017 "Container" inside "Title Container"
 *
 * Layout:
 *  - 4×40px orange rectangle (::after/accent bar)
 *  - 32px Bold Poppins title in #0b1237 (Blue Zodiac)
 */
const AccentTitle: React.FC<AccentTitleProps> = ({
  title,
  className,
  titleClassName,
  accentClassName = "bg-[#ff9500]",
  titleColorClass = "text-[#0b1237]",
}) => {
  return (
    <div className={cn("flex flex-col text-left", className)}>
      {/* Accent bar — 4px tall × 40px wide, 12px spacing below */}
      <div
        aria-hidden="true"
        className={cn("w-10 h-1 rounded-sm mb-3", accentClassName)}
      />

      {/* Section label — Poppins Bold 32px */}
      <h2
        className={cn(
          "font-bold font-poppins text-[32px] leading-[48px] uppercase",
          titleColorClass,
          titleClassName,
        )}
      >
        {title}
      </h2>
    </div>
  );
};

AccentTitle.displayName = "AccentTitle";

export { AccentTitle };
export default AccentTitle;
