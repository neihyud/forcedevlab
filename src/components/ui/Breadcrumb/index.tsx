import { Link } from "@/i18n/routing";
import React from "react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  title: string | React.ReactNode;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  separatorClassName?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "/",
  className,
  itemClassName,
  activeClassName,
  separatorClassName,
}) => {
  return (
    <nav
      className={cn(
        "flex items-center flex-wrap gap-2 text-sm font-poppins",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  "hover:text-[#f5a623] transition-colors duration-200 font-medium",
                  itemClassName,
                )}
              >
                {item.title}
              </Link>
            ) : (
              <span
                className={cn(
                  "font-normal",
                  isLast ? activeClassName : itemClassName,
                )}
              >
                {item.title}
              </span>
            )}

            {!isLast && (
              <span
                className={cn(
                  "text-gray-400 select-none flex items-center justify-center font-medium",
                  separatorClassName,
                )}
              >
                {separator}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
