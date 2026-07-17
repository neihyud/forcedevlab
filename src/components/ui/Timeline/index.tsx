"use client";

import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import Flex from "@/components/ui/Flex";
import { cn } from "@/lib/utils";

const timelineVariants = cva("flex flex-col relative", {
  variants: {
    size: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Timeline component props interface
 * @interface TimelineProps
 * @extends {React.HTMLAttributes<HTMLOListElement>}
 * @extends {VariantProps<typeof timelineVariants>}
 */
interface TimelineProps
  extends
    React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof timelineVariants> {
  /** Size of the timeline icons */
  iconsize?: "sm" | "md" | "lg";
}

/**
 * Timeline component for displaying a vertical list of events or items
 * @component
 */
const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, iconsize, size, children, ...props }, ref) => {
    const items = React.Children.toArray(children);

    if (items.length === 0) {
      return <TimelineEmpty />;
    }

    return (
      <ol
        ref={ref}
        aria-label="Timeline"
        className={cn(
          timelineVariants({ size }),
          "relative min-h-[600px] w-full",
          className,
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (
            React.isValidElement(child) &&
            typeof child.type !== "string" &&
            "displayName" in child.type &&
            child.type.displayName === "TimelineItem"
          ) {
            return React.cloneElement(child, {
              iconsize,
              showConnector: index !== items.length - 1,
            } as React.ComponentProps<typeof TimelineItem>);
          }
          return child;
        })}
      </ol>
    );
  },
);
Timeline.displayName = "Timeline";

/**
 * TimelineItem component props interface
 * @interface TimelineItemProps
 * @extends {Omit<HTMLMotionProps<"li">, "ref">}
 */
interface TimelineItemProps extends Omit<
  React.HTMLAttributes<HTMLLIElement>,
  "ref"
> {
  /** Date string for the timeline item */
  date?: string;
  /** Title of the timeline item */
  title?: string;
  /** Description text */
  description?: string;
  /** Custom icon element */
  icon?: React.ReactNode;
  /** Color theme for the icon */
  iconColor?: string;
  /** Current status of the item */
  status?: "completed" | "in-progress" | "pending";
  /** Color theme for the connector line */
  connectorColor?: string;
  /** Custom class name for the connector line */
  connectorClassName?: string;
  /** Whether to show the connector line */
  showConnector?: boolean;
  /** Size of the icon */
  iconsize?: "sm" | "md" | "lg";
  /** Custom class name for the content */
  contentClassName?: string;
  /** Loading state */
  iconClassName?: string;
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      className,
      date,
      title,
      description,
      icon,
      iconColor,
      status = "completed",
      connectorColor,
      showConnector = true,
      iconsize,
      children,
      connectorClassName,
      contentClassName,
      iconClassName,
      ...props
    },
    ref,
  ) => {
    const commonClassName = cn(
      "relative w-full mb-8 last:mb-0 pl-8",
      className,
    );

    const { style, ...filteredProps } = props;
    if (children) {
      return (
        <li ref={ref} className={commonClassName} {...filteredProps}>
          {/* Timeline dot and connector */}
          <div
            className={cn(
              "bg-border-color absolute left-0 flex h-full w-0.5 flex-col items-center justify-center",
              connectorClassName,
            )}
          >
            {!!icon && (
              <Flex
                align={"center"}
                justify={"center"}
                vertical={true}
                className={cn(
                  "absolute top-1/2 z-10 h-fit w-fit -translate-y-1/2 rounded-full border-4 border-white",
                  iconClassName,
                )}
              >
                {icon}
              </Flex>
            )}
          </div>
          <TimelineContent className={contentClassName}>
            {children}
          </TimelineContent>
        </li>
      );
    }

    const content = (
      <div
        className="grid grid-cols-[1fr_auto_1fr] items-start gap-4"
        {...(status === "in-progress" ? { "aria-current": "step" } : {})}
      >
        {/* Timeline dot and connector */}
        <div className="flex flex-col items-center">
          {showConnector && <div className="bg-border mt-2 h-16 w-0.5" />}
        </div>

        {/* Content */}
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>{title}</TimelineTitle>
          </TimelineHeader>
          <TimelineDescription>{description}</TimelineDescription>
        </TimelineContent>
      </div>
    );

    // Filter out Framer Motion specific props

    return (
      <li ref={ref} className={commonClassName} {...filteredProps}>
        {content}
      </li>
    );
  },
);
TimelineItem.displayName = "TimelineItem";

interface TimelineTimeProps extends React.HTMLAttributes<HTMLTimeElement> {
  /** Date string, Date object, or timestamp */
  date?: string | Date | number;
  /** Optional format for displaying the date */
  format?: Intl.DateTimeFormatOptions;
}

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    status?: "completed" | "in-progress" | "pending";
    color?: "primary" | "secondary" | "muted" | "accent";
  }
>(({ className, status = "completed", color, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-0.5",
      {
        "bg-primary": color === "primary" || (!color && status === "completed"),
        "bg-muted": color === "muted" || (!color && status === "pending"),
        "bg-secondary": color === "secondary",
        "bg-accent": color === "accent",
        "from-primary to-muted bg-gradient-to-b":
          !color && status === "in-progress",
      },
      className,
    )}
    {...props}
  />
));
TimelineConnector.displayName = "TimelineConnector";

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4", className)}
    {...props}
  />
));
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-secondary-foreground leading-none font-semibold tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground max-w-sm text-sm", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 pl-2", className)}
    {...props}
  />
));
TimelineContent.displayName = "TimelineContent";

const TimelineEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center p-8 text-center",
      className,
    )}
    {...props}
  >
    <p className="text-muted-foreground text-sm">
      {children || "No timeline items to display"}
    </p>
  </div>
));
TimelineEmpty.displayName = "TimelineEmpty";

export {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineEmpty,
  TimelineHeader,
  TimelineItem,
  TimelineTitle,
};
