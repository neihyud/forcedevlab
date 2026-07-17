import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const colVariants = cva("", {
  variants: {
    span: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
      13: "col-span-13",
      14: "col-span-14",
      15: "col-span-15",
      16: "col-span-16",
      17: "col-span-17",
      18: "col-span-18",
      19: "col-span-19",
      20: "col-span-20",
      21: "col-span-21",
      22: "col-span-22",
      23: "col-span-23",
      24: "col-span-24",
    },
    rowSpan: {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
      5: "row-span-5",
      6: "row-span-6",
      7: "row-span-7",
      8: "row-span-8",
      9: "row-span-9",
      10: "row-span-10",
      11: "row-span-11",
      12: "row-span-12",
      13: "row-span-13",
      14: "row-span-14",
      15: "row-span-15",
      16: "row-span-16",
      17: "row-span-17",
      18: "row-span-18",
      19: "row-span-19",
      20: "row-span-20",
      21: "row-span-21",
      22: "row-span-22",
      23: "row-span-23",
      24: "row-span-24",
    },
    offset: {
      1: "col-start-2",
      2: "col-start-3",
      3: "col-start-4",
      4: "col-start-5",
      5: "col-start-6",
      6: "col-start-7",
      7: "col-start-8",
      8: "col-start-9",
      9: "col-start-10",
      10: "col-start-11",
      11: "col-start-12",
      12: "col-start-13",
      13: "col-start-14",
      14: "col-start-15",
      15: "col-start-16",
      16: "col-start-17",
      17: "col-start-18",
      18: "col-start-19",
      19: "col-start-20",
      20: "col-start-21",
      21: "col-start-22",
      22: "col-start-23",
      23: "col-start-24",
      24: "col-start-25",
    },
    rowOffset: {
      1: "row-start-2",
      2: "row-start-3",
      3: "row-start-4",
      4: "row-start-5",
      5: "row-start-6",
      6: "row-start-7",
      7: "row-start-8",
      8: "row-start-9",
      9: "row-start-10",
      10: "row-start-11",
      11: "row-start-12",
      12: "row-start-13",
      13: "row-start-14",
      14: "row-start-15",
      15: "row-start-16",
      16: "row-start-17",
      17: "row-start-18",
      18: "row-start-19",
      19: "row-start-20",
      20: "row-start-21",
      21: "row-start-22",
      22: "row-start-23",
      23: "row-start-24",
      24: "row-start-25",
    },
    order: {
      1: "order-1",
      2: "order-2",
      3: "order-3",
      4: "order-4",
      5: "order-5",
      6: "order-6",
      7: "order-7",
      8: "order-8",
      9: "order-9",
      10: "order-10",
      11: "order-11",
      12: "order-12",
    },
  },
  defaultVariants: {
    span: 24,
  },
});

export type ColProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof colVariants>;

const Col = React.forwardRef<HTMLDivElement, ColProps>(
  ({ className, span, offset, order, rowOffset, rowSpan, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          colVariants({ span, offset, order, rowOffset, rowSpan }),
          className,
        )}
        {...props}
      />
    );
  },
);

Col.displayName = "Col";

export { Col };
