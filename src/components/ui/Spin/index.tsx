import { ReactNode, memo } from "react";
import { LoaderIcon } from "lucide-react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinVariants = cva(
  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  inline-block animate-spin rounded-full align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
  {
    variants: {
      size: {
        sm: "h-[14px] w-[14px]",
        md: "h-5 w-5",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      color: {
        primary: "text-[var(--primary)]",
        secondary: "text-[var(--secondary)]",
        white: "text-white",
      },
    },
    defaultVariants: {
      size: "md",
      color: "primary",
    },
  },
);

export interface SpinProps extends VariantProps<typeof spinVariants> {
  className?: string;
  spinning?: boolean;
  children?: ReactNode;
  containerClassName?: string;
  type?: "gear" | "circle";
}

const Spin = ({
  className,
  size,
  color,
  spinning = false,
  children,
  containerClassName,
  type = "circle",
}: SpinProps) => {
  if (!spinning && !!children) {
    return <>{children}</>;
  }

  const spinner =
    type === "gear" ? (
      <LoaderIcon
        className={cn(spinVariants({ size, color }), className)}
        aria-label="loading"
      />
    ) : (
      <div
        className={cn(
          "border-2 border-solid border-current border-r-transparent ",
          spinVariants({ size, color }),
          className,
        )}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );

  return (
    <div className={cn("relative", containerClassName)}>
      {children && (
        <div className="pointer-events-none opacity-50">{children}</div>
      )}
      {spinner}
    </div>
  );
};

export default memo(Spin);
