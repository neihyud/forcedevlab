"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type InputProps = Omit<React.ComponentProps<"input">, "prefix"> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  containerClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, containerClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex w-full text-black items-center",
          containerClassName,
        )}
      >
        {prefix && (
          <div className="pointer-events-none absolute left-3 flex items-center">
            {prefix}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            "file:text-black/80  selection:bg-primary/50 ring-border   hover:ring-primary   flex  w-full min-w-0 rounded-full bg-background px-3 py-3.5 text-base shadow-xs ring transition-[color,box-shadow] outline-none selection:text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-muted-foreground",
            "focus-visible:ring-primary focus-visible:border-none focus-visible:ring",
            "aria-invalid:ring-destructive/20 aria-invalid:border-destructive transition-all duration-300 ease-in-out o",
            prefix && "pl-9",
            suffix && "pr-9",
            className,
          )}
          {...props}
        />

        {suffix && (
          <div className="pointer-events-none absolute right-3 flex items-center">
            {suffix}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
