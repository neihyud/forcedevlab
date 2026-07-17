"use client";

import * as React from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  icon?: React.ReactNode;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:ring-ring/50 focus-visible:ring-none flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md px-4 py-2 text-left text-sm font-medium transition-all outline-none focus-visible:border-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        {icon ? (
          icon
        ) : (
          <ArrowDownIcon className="text-text-2 pointer-events-none size-4 translate-y-0.5 cursor-pointer transition-transform duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

// Example
{
  /* <Accordion
  type="multiple"
  className="w-full overflow-hidden rounded-b-2xl"
  value={activeKey}
  onValueChange={(value) => {
    setSearchParam([{ key: "active", value }]);
    setActiveKey(value);
  }}
>
  {items.map((item) => (
    <AccordionItem key={item.key} value={item.key}>
      <AccordionTrigger>{item.label}</AccordionTrigger>
      <AccordionContent className="pb-0">{item.children}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>; */
}
