import React from "react";

import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    justify: {
      "flex-start": "justify-start",
      "flex-end": "justify-end",
      center: "justify-center",
      "space-between": "justify-between",
      "space-around": "justify-around",
      "space-evenly": "justify-evenly",
    },
    align: {
      "flex-start": "items-start",
      "flex-end": "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    direction: "row",
    justify: "flex-start",
    align: "stretch",
    wrap: "nowrap",
  },
});

type FlexProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof flexVariants> & {
    children: React.ReactNode;
    vertical?: boolean;
    flex?: number;
    gap?: number;
  };

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction,
      justify,
      align,
      wrap,
      // gap = 0,
      vertical,
      // flex,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          flexVariants({
            direction: vertical ? "column" : direction,
            justify,
            align,
            wrap,
          }),
          className,
        )}
        {...props}
        // style={{
        //   flex: flex ?? "unset",
        //   gap: isNumber(gap) ? `${gap}px` : gap,
        //   ...props.style,
        // }}
      >
        {children}
      </div>
    );
  },
);

Flex.displayName = "Flex";

export default Flex;
