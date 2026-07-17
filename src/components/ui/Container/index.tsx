"use client";

import React from "react";

import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("w-full h-full mx-auto p-4 max-w-full", {
  variants: {
    size: {
      medium: "xl:max-w-[calc(1200px+4rem)]",
      large: "xl:max-w-[calc(1366px+4rem)]",
      xl: "xl:max-w-[calc(1536px+4rem)]",
      "2xl": "xl:max-w-[calc(1700px+4rem)]",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface ContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Container.displayName = "Container";

export default Container;
