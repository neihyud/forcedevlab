"use client";

import * as React from "react";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Text } from "@/components/ui/Text";
const progressVariants = cva("", {
  variants: {
    color: {
      default: "bg-foreground/80 ",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-success text-success-foreground",
      warning: "bg-warning text-warning-foreground",
      info: "bg-info text-info-foreground",
      error: "bg-destructive text-destructive-foreground",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
function Progress({
  className,
  value,
  color,
  classWrapper,
  indicatorClassName,
  text,
  indicatorStyle,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants> & {
    indicatorClassName?: string;
    indicatorStyle?: React.CSSProperties;
    text?: string;
    classWrapper?: string;
  }) {
  return (
    <div className={`gap-2 flex w-full items-center ${classWrapper}`}>
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          `bg-muted relative h-2 w-full overflow-hidden rounded-full`,
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "bg-warning h-full w-full flex-1 transition-all",
            progressVariants({ color }),
            indicatorClassName,
          )}
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`,
            ...(indicatorStyle ?? {}),
          }}
        />
      </ProgressPrimitive.Root>
      {text && <Text>{text}</Text>}
    </div>
  );
}

export { Progress };
