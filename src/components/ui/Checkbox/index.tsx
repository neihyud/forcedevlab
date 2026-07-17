"use client";

import * as React from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type VariantProps, cva } from "class-variance-authority";
import Flex from "@/components/ui/Flex";
import { cn } from "@/lib/utils";
import { CheckBig } from "@/components/icons";
import { Label } from "@/components/ui/Label";

const checkboxVariants = cva(
  "peer  dark:bg-input/30 data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:ring-none shrink-0 cursor-pointer rounded-[4px] border-2 shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-white relative transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        default: "border-border hover:border-primary",
        primary: "border-primary",
        secondary:
          "border-secondary data-[state=checked]:bg-secondary data-[state=checked]:border-secondary  focus-visible:border-primary",
        success:
          "border-success data-[state=checked]:bg-success data-[state=checked]:border-success  focus-visible:border-primary",
        warning:
          "border-warning data-[state=checked]:bg-warning data-[state=checked]:border-warning  focus-visible:border-primary",
        error:
          "border-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive  focus-visible:border-primary",
        info: "border-info data-[state=checked]:bg-info data-[state=checked]:border-info  focus-visible:border-primary",
      },
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        "3xl": "size-10",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

interface CheckboxProps
  extends
    Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "color">,
    VariantProps<typeof checkboxVariants> {
  label?: string | React.ReactNode;
  labelClassName?: string;
  containerClassName?: string;
}

function Checkbox({
  className,
  size,
  variant,
  containerClassName,
  labelClassName,
  label,
  ...props
}: CheckboxProps) {
  const id = React.useId();

  const [ripples, setRipples] = React.useState<
    { x: number; y: number; id: number }[]
  >([]);

  const rippleRef = React.useRef<HTMLButtonElement>(null);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = rippleRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  console.log("ripples", ripples);

  return (
    <Flex
      align="center"
      gap={8}
      className={cn("cursor-pointer", containerClassName ?? "")}
    >
      <CheckboxPrimitive.Root
        ref={rippleRef}
        onClick={createRipple}
        data-slot="checkbox"
        className={cn(checkboxVariants({ size, variant }), className)}
        {...props}
        id={props.id ?? id}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex h-fit w-fit items-center justify-center text-current transition-none m-auto"
        >
          <CheckBig
            className={cn("size-4 [&_path]:stroke-white", {
              "size-3": size === "sm",
              "size-4": size === "md",
              "size-5": size === "lg",
              "size-6": size === "3xl",
            })}
          />
        </CheckboxPrimitive.Indicator>
        {/* Ripple layer */}
        <span className="absolute -inset-2 rounded-full overflow-hidden pointer-events-none">
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute block h-10 w-10 rounded-full bg-primary/30 animate-ripple"
              style={{
                left: ripple.x - 20,
                top: ripple.y - 20,
              }}
            />
          ))}
        </span>
      </CheckboxPrimitive.Root>
      {!!label && (
        <Label
          htmlFor={props.id ?? id}
          className={cn("cursor-pointer", labelClassName ?? "")}
        >
          {label}
        </Label>
      )}
    </Flex>
  );
}

export { Checkbox };
