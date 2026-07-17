"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, VariantProps } from "class-variance-authority";
const sliderVariants = cva("", {
  variants: {
    color: {
      default: "bg-accent text-accent-foreground",
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

function Slider({
  className,
  defaultValue,
  value,
  color,
  min = 0,
  max = 100,
  ...props
}: VariantProps<typeof sliderVariants> &
  React.ComponentProps<typeof SliderPrimitive.Root> & {
    tooltip?: {
      formatter?: (value: number) => string;
    };
  }) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      minStepsBetweenThumbs={1}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-30 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col ",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-accent data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5 ",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full ",
            sliderVariants({ color }),
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (value, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "bg-primary ring-ring/50 block size-4 shrink-0 rounded-full border-3 border-white shadow-sm transition-[color,box-shadow] hover:border-4 focus-visible:border-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
            sliderVariants({ color }),
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
