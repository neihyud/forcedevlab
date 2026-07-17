"use client";

import { ArrowDownIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import * as React from "react";

import { DayPicker } from "react-day-picker";
import { vi } from "react-day-picker/locale";
import "react-day-picker/style.css";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      locale={vi}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      timeZone="Asia/Ho_Chi_Minh"
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        // // month: 'flex flex-col gap-4',
        month_caption: "text-sm text-center",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "absolute top-4 right-0 px-4 flex items-center justify-between w-full",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        button_previous: "left-1 top-0",
        button_next: "right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell: "text-text-1 rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 data-[selected=true]:bg-primary data-[selected=true]:[&_button]:text-white data-[selected=true]:rounded-full cursor-pointer",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md data-[selected=true]:[&_button]:bg-primary data-[selected=true]:[&_button]:text-primary-foreground data-[selected=true]:[&_button]:rounded-full"
            : "[&:has([aria-selected])]:rounded-full",
        ),
        day_button: cn(
          buttonVariants({ variant: "text" }),
          "size-8 p-0 font-normal aria-selected:opacity-100 aria-selected:text-white",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        PreviousMonthButton: ({ className, ...props }: any) => (
          <ArrowDownIcon
            className={cn("size-4 rotate-90", className)}
            {...(props as any)}
          />
        ),
        NextMonthButton: ({ className, ...props }: any) => (
          <ArrowDownIcon
            className={cn("size-4 -rotate-90", className)}
            {...(props as any)}
          />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
