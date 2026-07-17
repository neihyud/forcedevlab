import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const textVariants = cva("text-foreground break-normal text-sm font-normal", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight ",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-medium tracking-tight",
      h5: "scroll-m-20 text-lg font-medium tracking-tight",
      h6: "scroll-m-20 text-base font-medium tracking-tight",
      subtitle: "text-sm font-medium",
      body: "text-sm leading-7",
      small: "text-xs leading-5",
    },
    textAlign: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    weight: {
      100: "font-light",
      400: "font-normal",
      500: "font-medium",
      600: "font-semibold",
      700: "font-bold",
    },
    size: {
      "x-small": "text-xs leading-5",
      small: "text-sm leading-[22px]",
      base: "text-base leading-7", //16
      medium: "text-[17px] leading-[25px]",
      "x-medium": "text-lg leading-[28px]",
      large: "text-2xl leading-8",
      "x-large": "text-[28px] leading-[36px]",
      "2x-large": "text-3xl leading-[44px]",
      "3x-large": "text-[40px] leading-[56px]",
    },
  },
  defaultVariants: {
    textAlign: "left",
  },
});

type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    as?: "h1" | "h2" | "h3" | "p" | "span";
    ellipsis?: number;
    allowControlEllipsis?: boolean;
    containerClassName?: string;
  };

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      variant,
      textAlign,
      weight,
      color,
      size,
      as = "span",
      children,
      ellipsis,
      allowControlEllipsis,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    const Comp = as;
    const [isExpanded, setIsExpanded] = React.useState(false);
    const textRef = React.useRef<HTMLElement>(null);
    const [isEllipsisActive, setIsEllipsisActive] = React.useState(false);

    React.useEffect(() => {
      if (textRef.current && ellipsis) {
        setIsEllipsisActive(
          textRef.current.scrollHeight > textRef.current.clientHeight,
        );
      }
    }, [children, ellipsis]);

    const styleEllipsis: React.CSSProperties =
      !isExpanded && ellipsis
        ? {
            display: "-webkit-box",
            WebkitLineClamp: ellipsis,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }
        : {};

    if (allowControlEllipsis) {
      return (
        <div className={cn(containerClassName, "relative inline")}>
          <Comp
            ref={(el) => {
              textRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
            className={cn(
              textVariants({ variant, textAlign, weight, size }),
              className,
            )}
            {...props}
            style={{
              ...styleEllipsis,
              ...(color ? { color } : {}),
              ...(props.style ?? {}),
            }}
          >
            {children}
          </Comp>
          {isEllipsisActive && (
            <Button
              variant={"text"}
              onClick={() => setIsExpanded((prev) => !prev)}
              className="ml-1 h-fit p-0 text-xs hover:bg-transparent"
            >
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </Button>
          )}
        </div>
      );
    }

    return (
      <Comp
        ref={(el) => {
          textRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        className={cn(
          textVariants({ variant, textAlign, weight, size }),
          className,
        )}
        {...props}
        style={{
          ...styleEllipsis,
          ...(color && { color }),
          ...(props.style ?? {}),
        }}
      >
        {children}
      </Comp>
    );
  },
);

Text.displayName = "Text";

export { Text, textVariants };
