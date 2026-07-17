"use client";

import * as React from "react";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";

const radioGroupItemVariants = cva(
  " focus-visible:border-primary focus-visible:ring-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square shrink-0 rounded-full border text-white shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      color: {
        default: "enabled:hover:border-primary",
        primary: "border-primary",
        secondary: "border-secondary focus-visible:border-secondary",
        success: "border-success focus-visible:border-success",
        warning: "border-warning focus-visible:border-warning",
        error: "border-destructive focus-visible:border-destructive",
        info: "border-info focus-visible:border-info",
      },
      size: {
        sm: "size-3",
        md: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
    },
  },
);

const radioGroupIndicatorVariants = cva(
  "relative flex items-center justify-center transition-all duration-300 ease-in-out",
  {
    variants: {
      size: {
        sm: "[&>div]:h-1.5 [&>div]:w-1.5",
        md: "[&>div]:h-2 [&>div]:w-2",
        lg: "[&>div]:h-2.5 [&>div]:w-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface RadioGroupItemProps
  extends
    Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, "color">,
    VariantProps<typeof radioGroupItemVariants> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

interface RadioGroupProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> {
  options?: RadioGroupItemProps[];
  className?: string;
  size?: "sm" | "md" | "lg";
  itemClassName?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
}

export function Radio({
  options,
  className,
  size,
  color,
  itemClassName,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroup className={className} {...props}>
      {options &&
        options.map((opt) => (
          <div className="flex items-center space-x-2" key={opt.value}>
            <RadioGroupItem
              id={`${opt.value}`}
              className={itemClassName}
              size={opt.size || size}
              {...opt}
              color={opt.color || color}
              value={String(opt.value ?? "")}
            />
            <Label
              htmlFor={`${opt.value}`}
              className="text-foreground text-xs font-semibold"
            >
              {opt.label}
            </Label>
          </div>
        ))}
    </RadioGroup>
  );
}

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  size,
  color,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioGroupItemVariants({ size, color }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(radioGroupIndicatorVariants({ size }))}
      >
        <div
          className={`bg-${
            color == "error" ? "destructive" : color || "primary"
          } rounded-full`}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
