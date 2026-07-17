import { useAppRouter } from "@/hooks/useAppRouter";
import Link from "next/link";
import React from "react";

export type BreadcrumbItem = {
  title: string | React.ReactNode;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: Props) => {
  const router = useAppRouter();

  const handleClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <nav className="pb-2">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {!!item.href ? (
            <Link
              className="text-text-2 hover:bg-[rgba(0, 0, 0, 0.05)] hover:text-text-2 mx-0.5 cursor-pointer rounded-sm text-sm whitespace-pre-line transition-all duration-300 ease-in-out"
              href={item.href}
              onClick={() => handleClick(item.href)}
            >
              {item.title}
            </Link>
          ) : (
            <span
              className="text-text-1 mx-0.5 cursor-pointer rounded-sm text-sm whitespace-pre-line transition-all duration-300 ease-in-out"
              onClick={() => handleClick(item.href)}
            >
              {item.title}
            </span>
          )}

          {index < items.length - 1 && (
            <span className="text-text-2 text-sm">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
