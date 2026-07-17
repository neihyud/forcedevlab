import * as React from "react";
import { cn } from "@/lib/utils";
import Flex from "@/components/ui/Flex";
import { cva } from "class-variance-authority";

const cardVariants = cva("relative overflow-hidden transition-shadow", {
  variants: {
    variant: {
      default: "",
      linear: "",
      borderLinear: "border-2 border-transparent",
    },
    type: {
      default: "",
      success: "",
      purple: "",
    },
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    type: "default",
    shadow: "sm",
  },
});

type Props = React.PropsWithChildren & {
  variant?: "default" | "linear" | "borderLinear";
  type?: "default" | "success" | "purple";
  height?: string;
  width?: string;
  padding?: string;
  borderRadius?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  background?: string;
  gap?: number;
  className?: string;
  classNameWrapper?: string;
  ref?: React.RefObject<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      variant = "default",
      type = "default",
      children,
      height,
      width,
      padding,
      borderRadius = "1.5rem",
      background,
      shadow,
      gap,
      style,
      className,
      classNameWrapper,
      ...props
    },
    ref,
  ) => {
    const backgroundLinear = React.useMemo(() => {
      if (variant === "default") {
        return {
          wrapper: background ?? "var(--card)",
          inner: "transparent",
        };
      }

      switch (type) {
        case "success":
          return {
            wrapper:
              variant === "borderLinear"
                ? "linear-gradient(white, white) padding-box, var(--gradient-primary) border-box"
                : "transparent",
            inner:
              variant === "borderLinear"
                ? "transparent"
                : "var(--gradient-border)",
          };
        case "purple":
          return {
            wrapper:
              variant === "borderLinear"
                ? "linear-gradient(white, white) padding-box, var(--gradient-accent) border-box"
                : "transparent",
            inner:
              variant === "borderLinear"
                ? "transparent"
                : "var(--gradient-accent)",
          };
        default:
          return {
            wrapper:
              variant === "borderLinear"
                ? "linear-gradient(white, white) padding-box, var(--gradient-border) border-box"
                : "transparent",
            inner:
              variant === "borderLinear"
                ? "transparent"
                : "var(--gradient-primary)",
          };
      }
    }, [variant, type, background]);

    return (
      <div
        ref={ref}
        data-slot="card"
        {...props}
        style={{
          ...style,
          height,
          width,
          borderRadius,
          background: backgroundLinear.wrapper,
        }}
        className={cn(cardVariants({ variant, type, shadow }), className)}
      >
        <Flex
          vertical
          className={cn(
            `h-full w-full rounded-[calc(${borderRadius}-2px)]`,
            classNameWrapper,
          )}
          style={{
            padding,
            background: backgroundLinear.inner,
            gap,
          }}
        >
          {children}
        </Flex>
      </div>
    );
  },
);

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start  has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};

Card.displayName = "Card";

export default Card;
