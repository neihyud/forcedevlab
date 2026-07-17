import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Spin from "@/components/ui/Spin";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        container: "",
        outline: "border bg-transparent hover:brightness-115",
        text: "bg-transparent",
        link: "bg-transparent hover:opacity-75 cursor-pointer",
        dashed: "border border-dashed bg-transparent",
        filled: "hover:brightness-90",
      },
      color: {
        default:
          "bg-transparent text-foreground hover:text-primary hover:border-primary",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/80 border-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-secondary",
        success:
          "bg-success text-success-foreground hover:bg-success/80 border-success",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/80 border-warning",
        info: "bg-info text-info-foreground hover:bg-info/80 border-info",
        error:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-destructive",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3 text-sm",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4  text-md",
        xLg: "h-14  px-8 has-[>svg]:px-6 text-lg",
        icon: "size-9",
      },
      cursor: {
        default: "cursor-default",
        pointer: "cursor-pointer",
        disabled: "cursor-not-allowed",
      },
    },
    compoundVariants: [
      // 1. Container
      {
        variant: "container",
        color: "default",
        class:
          "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground",
      },
      {
        variant: "container",
        color: "error",
        class: "bg-destructive text-destructive-foreground",
      },
      // 2. outline
      {
        variant: "outline",
        color: "primary",
        class: "text-primary bg-transparent hover:bg-primary/2",
      },
      {
        variant: "outline",
        color: "secondary",
        class: "text-secondary bg-transparent hover:bg-secondary/2",
      },
      {
        variant: "outline",
        color: "success",
        class: "text-success bg-transparent hover:bg-success/2",
      },
      {
        variant: "outline",
        color: "warning",
        class: "text-warning bg-transparent hover:bg-warning/2",
      },
      {
        variant: "outline",
        color: "info",
        class: "text-info bg-transparent hover:bg-info/2",
      },
      {
        variant: "outline",
        color: "error",
        class: "text-destructive bg-transparent hover:bg-destructive/2",
      },
      // 3. Dashed
      {
        variant: "dashed",
        color: "primary",
        class: "text-primary  bg-transparent hover:bg-primary/10",
      },
      {
        variant: "dashed",
        color: "secondary",
        class: "text-secondary  bg-transparent hover:bg-secondary/10",
      },
      {
        variant: "dashed",
        color: "success",
        class: "text-success  bg-transparent hover:bg-success/10",
      },
      {
        variant: "dashed",
        color: "warning",
        class: "text-warning  bg-transparent hover:bg-warning/10",
      },
      {
        variant: "dashed",
        color: "info",
        class: "text-info  bg-transparent hover:bg-info/10",
      },
      {
        variant: "dashed",
        color: "error",
        class: "text-destructive  bg-transparent hover:bg-destructive/10",
      },
      // 4. Text
      {
        variant: "text",
        color: "primary",
        class: "text-primary bg-transparent hover:bg-primary/10",
      },
      {
        variant: "text",
        color: "secondary",
        class: "text-secondary bg-transparent hover:bg-secondary/10",
      },
      {
        variant: "text",
        color: "success",
        class: "text-success bg-transparent hover:bg-success/10",
      },
      {
        variant: "text",
        color: "warning",
        class: "text-warning bg-transparent hover:bg-warning/10",
      },
      {
        variant: "text",
        color: "info",
        class: "text-info bg-transparent hover:bg-info/10",
      },
      {
        variant: "text",
        color: "error",
        class: "text-destructive bg-transparent hover:bg-destructive/10",
      },
      {
        variant: "text",
        color: "default",
        class: "hover:bg-primary/10 bg-transparent",
      },
      // 5. filled
      {
        variant: "filled",
        color: "primary",
        class: "bg-primary/60 text-primary-foreground",
      },
      {
        variant: "filled",
        color: "secondary",
        class: "bg-secondary/60 text-secondary-foreground ",
      },
      {
        variant: "filled",
        color: "success",
        class: "bg-success/60 text-success-foreground ",
      },
      {
        variant: "filled",
        color: "warning",
        class: "bg-warning/60 text-warning-foreground ",
      },
      {
        variant: "filled",
        color: "info",
        class: "bg-info/60 text-info-foreground ",
      },
      {
        variant: "filled",
        color: "error",
        class: "bg-destructive/60 text-destructive-foreground ",
      },
      {
        variant: "filled",
        color: "default",
        class: "bg-accent",
      },

      // 6. Link
      {
        variant: "link",
        color: "primary",
        class: "text-primary bg-transparent hover:bg-transparent",
      },
      {
        variant: "link",
        color: "secondary",
        class: "text-secondary bg-transparent hover:bg-transparent",
      },
      {
        variant: "link",
        color: "success",
        class: "text-success bg-transparent hover:bg-transparent",
      },
      {
        variant: "link",
        color: "warning",
        class: "text-warning bg-transparent hover:bg-transparent",
      },
      {
        variant: "link",
        color: "info",
        class: "text-info bg-transparent hover:bg-transparent",
      },
      {
        variant: "link",
        color: "error",
        class: "text-destructive bg-transparent hover:bg-transparent",
      },
    ],
    defaultVariants: {
      variant: "container",
      color: "default",
      size: "default",
    },
  },
);

const loadingConainerVariants = cva("", {
  variants: {
    size: {
      default: "mr-2",
      sm: "mr-2",
      lg: "mr-2",
      xLg: "mr-4",
      icon: "mr-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const loadingVariants = cva("", {
  variants: {
    variant: {
      container: "text-primary-foreground",
      link: "text-primary",
      filled: "text-primary",
      dashed: "text-primary",
      primary: "text-primary",
      outline: "text-primary",
      text: "text-primary",
    },
    size: {
      default: "size-5",
      sm: "size-5",
      lg: "size-6",
      xLg: "size-8",
      icon: "size-5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  color,
  cursor,
  loading,
  disabled,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            cursor: props.onClick ? "pointer" : (cursor ?? "default"),
          }),
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {props.children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          color,
          size,
          cursor: props.onClick ? "pointer" : (cursor ?? "default"),
        }),
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Spin
          containerClassName={loadingConainerVariants({ size })}
          className={loadingVariants({ variant, size })}
        />
      )}
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
