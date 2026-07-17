import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Text } from "@/components/ui/Text";
import { BREAKPOINT, useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export type RoundedTabItem = {
  label: string | React.ReactNode;
  value: string;
};

export type RoundedTabProps = {
  items: RoundedTabItem[];
  activeItem?: string;
  defaultActiveItem?: string;
  onChange?: (item: string) => void;
  children?: React.ReactNode;
} & React.ComponentProps<typeof TabsPrimitive.Root>;

const RoundedTab = ({
  items,
  activeItem,
  defaultActiveItem,
  onChange,
  children,
  ...props
}: RoundedTabProps) => {
  const matchesMobile = useMediaQuery(`(max-width: ${BREAKPOINT.MOBILE}px)`);

  return (
    <Tabs
      value={activeItem}
      defaultValue={activeItem ?? defaultActiveItem}
      onValueChange={(item: string) => onChange?.(item)}
      {...props}
      className={cn(
        "w-full items-start overflow-x-auto md:items-center",
        props.className,
      )}
    >
      <TabsList className="h-12 gap-2 rounded-[100px] bg-transparent sm:bg-white md:gap-0.5">
        {items.map((item, index) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={cn(
              `rounded-tab-item data-[state=active]:before:bg-primary  relative mx-0 h-10 cursor-pointer overflow-hidden rounded-none border-none bg-primary/20 px-4 py-[9px] font-normal transition-all duration-300 ease-in-out before:absolute before:top-1/2 before:left-1/2 before:z-[0] before:block before:h-4 before:w-4 before:-translate-1/2 before:rounded-full before:bg-transparent before:content-[''] first:!rounded-l-full last:!rounded-r-full data-[state=active]:bg-transparent data-[state=active]:font-normal data-[state=active]:text-primary-foreground data-[state=active]:before:h-[110%] data-[state=active]:before:w-[110%] data-[state=active]:before:rounded-none`,
              matchesMobile && "rounded-full !px-2",
            )}
          >
            <Text
              size={"small"}
              weight={400}
              color="inherit"
              className="relative z-[1]"
            >
              {item.label}
            </Text>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default RoundedTab;
