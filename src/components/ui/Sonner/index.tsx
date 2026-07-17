"use client";

import { cva } from "class-variance-authority";
import { Toaster as Sonner, ToasterProps } from "sonner";

const toasterVariants = cva("toaster group", {
  variants: {
    theme: {
      light: "bg-white text-gray-900 border-gray-200",
      dark: "bg-gray-900 text-gray-100 border-gray-800",
    },
  },
  defaultVariants: {
    theme: "light",
  },
});

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      duration={3000}
      className={toasterVariants()}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
