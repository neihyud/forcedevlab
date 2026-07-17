import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const rowVariants = cva("grid", {
  variants: {
    align: {
      top: "items-start",
      middle: "items-center",
      bottom: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      spaceAround: "justify-around",
      spaceBetween: "justify-between",
      spaceEvenly: "justify-evenly",
    },
    gutter: {
      none: "",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
      24: "grid-cols-24",
    },
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
      7: "grid-rows-7",
      8: "grid-rows-8",
      9: "grid-rows-9",
      10: "grid-rows-10",
      11: "grid-rows-11",
      12: "grid-rows-12",
      24: "grid-rows-24",
    },
  },
  defaultVariants: {
    align: "top",
    justify: "start",
    gutter: "none",
    cols: 12,
  },
});

export type RowProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<VariantProps<typeof rowVariants>, "gutter"> & {
    wrap?: boolean;
    gutter?: [number, number] | VariantProps<typeof rowVariants>["gutter"];
  };

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  (
    { className, align, justify, gutter, cols, wrap = true, rows, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          rowVariants({
            align,
            justify,
            gutter: gutter as VariantProps<typeof rowVariants>["gutter"],
            cols,
            rows,
          }),
          !wrap && "flex-nowrap",
          className,
        )}
        {...props}
        style={{
          ...props.style,
          ...(Array.isArray(gutter)
            ? {
                rowGap: gutter[1],
                columnGap: gutter[0],
              }
            : {}),
        }}
      />
    );
  },
);

Row.displayName = "Row";

export { Row };
