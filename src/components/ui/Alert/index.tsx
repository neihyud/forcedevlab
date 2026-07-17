import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CheckBig, CheckCircleIcon, CheckIcon } from "@/components/icons";
import {
  CircleAlert,
  CircleAlertIcon,
  CircleXIcon,
  EraserIcon,
  InfoIcon,
} from "lucide-react";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        success:
          "text-success-foreground bg-success [&>svg]:text-current *:data-[slot=alert-description]:success-foreground/90",
        warning:
          "text-warning-foreground bg-warning [&>svg]:text-current *:data-[slot=alert-description]:warning-foreground/90",
        info: "text-info-foreground bg-info [&>svg]:text-current *:data-[slot=alert-description]:info-foreground/90",
        secondary:
          "text-secondary-foreground bg-secondary [&>svg]:text-current *:data-[slot=alert-description]:secondary-foreground/90",
        primary:
          "text-primary-foreground bg-primary [&>svg]:text-current *:data-[slot=alert-description]:primary-foreground/90",
        error:
          "text-destructive-foreground bg-destructive [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  children,
  icon,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    icon?: React.ReactNode;
  }) {
  const Icon = () => {
    if ((!icon && !variant) || icon === null) return;

    if (icon) {
      return icon;
    }
    if (variant === "info") {
      return <InfoIcon />;
    } else if (variant === "error") {
      return <CircleXIcon />;
    } else if (variant === "warning") {
      return <CircleAlertIcon />;
    } else if (variant === "success") {
      return <CheckCircleIcon />;
    }

    return <CheckCircleIcon />;
  };

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon />
      {children}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
