import React from "react";

import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const listVariants = cva("w-full rounded-lg", {
  variants: {
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const listItemVariants = cva("px-4 py-4", {
  variants: {
    size: {
      default: "",
      sm: "py-2",
      lg: "py-4",
    },
    bordered: {
      true: "border-t border-solid border-[#E0E0E0] ",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    bordered: false,
  },
});

export interface ListProps
  extends
    React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {
  dataSource?: any[];
  renderItem?: (item: any, index: number) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  itemClassName?: string;
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      size,
      dataSource = [],
      renderItem,
      header,
      footer,
      children,
      bordered = false,
      itemClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <ul
        ref={ref}
        className={cn(listVariants({ size, className }))}
        {...props}
      >
        {header && (
          <li className="border-bƒ border-gray-200 px-4 py-3">{header}</li>
        )}
        {dataSource.length > 0
          ? dataSource.map((item, index) => (
              <li
                key={index}
                className={cn(
                  listItemVariants({
                    size,
                    bordered,
                    className: itemClassName,
                  }),
                )}
              >
                {renderItem?.(item, index)}
              </li>
            ))
          : children}
        {footer && (
          <li className="border-t border-gray-200 px-4 py-3">{footer}</li>
        )}
      </ul>
    );
  },
);

List.displayName = "List";
export { List, listVariants, listItemVariants };
