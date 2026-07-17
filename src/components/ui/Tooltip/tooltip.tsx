"use client";

import * as React from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const tooltipVariants = cva("", {
  variants: {
    color: {
      default: "bg-white fill-white text-foreground",
      primary: "bg-primary text-primary-foreground fill-primary",
      secondary: "bg-secondary text-secondary-foreground fill-secondary",
      success: "bg-success text-success-foreground fill-success",
      warning: "bg-warning text-warning-foreground fill-warning",
      info: "bg-info text-info-foreground fill-info",
      error: "bg-destructive text-destructive-foreground fill-destructive",
    },
  },
  defaultVariants: {
    color: "default",
  },
});
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  color,
  allowArrow,
  arrowClassName,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
  VariantProps<typeof tooltipVariants> & {
    allowArrow?: boolean;
    arrowClassName?: string;
  }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "animate-in fade-in-0  zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit max-w-[200px] origin-(--radix-tooltip-content-transform-origin) rounded-md  px-3 py-1.5 text-xs  shadow-[var(--box-shadow)]",
          tooltipVariants({ color }),
          className,
        )}
        {...props}
      >
        {children}
        {!!allowArrow && (
          <TooltipPrimitive.Arrow
            className={cn(
              "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] ",
              tooltipVariants({ color }),

              arrowClassName,
            )}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
