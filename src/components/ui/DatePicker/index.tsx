// React Hook Form – Date Input UI System
// Stack: React + TypeScript + shadcn/ui (Radix) + react-day-picker + date-fns + react-hook-form + zod
// Drop this file anywhere under your src/components and adjust import aliases accordingly.
// -----------------------------------------------------------------------------

"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";

// shadcn/ui primitives
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { DateRange } from "react-day-picker";
import { FormLabel } from "@/components/ui/Form";

// -----------------------------------------------------------------------------
// 1) Base DateField (native input type="date")
// -----------------------------------------------------------------------------

export type DateFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  ({ className, label, hint, error, ...props }, ref) => {
    return (
      <div className="grid gap-2">
        {label && (
          <label className="text-sm  text-foreground/90">{label}</label>
        )}
        <input
          ref={ref}
          type="date"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-1",
            error && "border-destructive focus-visible:ring-destructive/50",
            className,
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-[12px] text-muted-foreground">{hint}</p>
        )}
        {error && <p className="text-[12px] text-destructive">{error}</p>}
      </div>
    );
  },
);
DateField.displayName = "DateField";

// -----------------------------------------------------------------------------
// 2) DatePicker (popover + calendar)
// -----------------------------------------------------------------------------

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  min?: Date;
  max?: Date;
  formatString?: string; // e.g. "dd/MM/yyyy"
  clearable?: boolean;
  label?: string;
  hint?: string;
  error?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Chọn ngày",
  disabled,
  min,
  max,
  formatString = "dd/MM/yyyy",
  clearable = true,
  label,
  hint,
  error,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const display = value
    ? format(value, formatString, { locale: vi })
    : placeholder;

  return (
    <div className="grid ">
      {label && <FormLabel className="mb-2">{label}</FormLabel>}

      <div className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <div className="flex gap-2">
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between gap-2 px-4 py-3.5 bg-background",
                  !value && "text-muted-foreground",
                )}
                disabled={disabled}
              >
                <span className="inline-flex items-center gap-2 font-normal">
                  <CalendarIcon className="h-4 w-4" />
                  {display}
                </span>
              </Button>
            </PopoverTrigger>
            {clearable && value && (
              <span className="ml-auto inline-flex items-center hover:cursor-pointer">
                <X
                  className="size-5 opacity-70 hover:opacity-100 shrink-0 text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange?.(null);
                  }}
                />
              </span>
            )}
          </div>
          <PopoverContent className="w-auto p-0 bg-card" align="start">
            <Calendar
              mode="single"
              selected={value ?? undefined}
              onSelect={(d) => {
                onChange?.(d ?? null);
                // keep menu open only if no date chosen
                if (d) setTimeout(() => setOpen(false), 300);
              }}
              disabled={(date) => {
                if (disabled) return true;
                if (min && date < stripTime(min)) return true;
                if (max && date > stripTime(max)) return true;
                return false;
              }}
              locale={vi}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {hint && !error && (
        <p className="text-[12px] text-muted-foreground">{hint}</p>
      )}
      {error && <p className="text-[12px] text-destructive">{error}</p>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3) DateRangePicker (from/to)
// -----------------------------------------------------------------------------

export interface DateRangePickerProps {
  value?: DateRange | undefined;
  onChange?: (value: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  min?: Date;
  max?: Date;
  formatString?: string; // e.g. "dd/MM/yyyy"
  clearable?: boolean;
  label?: string;
  hint?: string;
  error?: string;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Chọn khoảng ngày",
  disabled,
  min,
  max,
  formatString = "dd/MM/yyyy",
  clearable = true,
  label,
  hint,
  error,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const text =
    value?.from && value?.to
      ? `${format(value.from, formatString, { locale: vi })} → ${format(
          value.to,
          formatString,
          { locale: vi },
        )}`
      : placeholder;

  return (
    <div className="grid ">
      {label && <FormLabel>{label}</FormLabel>}

      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex gap-2 items-center bg-red">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between gap-2 mt-2 px-3 hover:text-black bg-white",
                !value?.from || !value?.to
                  ? "text-muted-foreground"
                  : undefined,
              )}
              disabled={disabled}
            >
              <span className="inline-flex items-center gap-2 font-normal">
                <CalendarIcon className="h-4 w-4" />
                {text}
              </span>
            </Button>
          </PopoverTrigger>
          {clearable && value?.from && (
            <X
              className="size-5 opacity-70 hover:opacity-100 shrink-0 text-foreground hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(undefined);
              }}
            />
          )}
        </div>
        <PopoverContent className="w-auto p-2 bg-card" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={(range) => {
              const selectedRange = range ?? { from: undefined, to: undefined };
              if (!selectedRange?.from && !selectedRange?.to) return;
              if (
                isSameDay(
                  new Date(selectedRange?.from ?? ""),
                  new Date(selectedRange?.to ?? ""),
                )
              )
                selectedRange.to = undefined;
              onChange?.(selectedRange);
              // auto-close when full range selected
              if (selectedRange?.from && selectedRange?.to)
                setTimeout(() => {
                  setOpen(false);
                }, 300);
            }}
            numberOfMonths={2}
            locale={vi}
            disabled={(date) => {
              if (disabled) return true;
              if (min && date < stripTime(min)) return true;
              if (max && date > stripTime(max)) return true;
              return false;
            }}
          />
        </PopoverContent>
      </Popover>

      {hint && !error && (
        <span className="text-[12px] text-muted-foreground">{hint}</span>
      )}
      {error && <span className="text-[12px] text-destructive">{error}</span>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 4) RHF Adapters (Controller helpers)
// -----------------------------------------------------------------------------

type RHFDatePickerProps = Omit<
  DatePickerProps,
  "value" | "onChange" | "error"
> & {
  name: string;
};

export function RHFDatePicker({ name, ...rest }: RHFDatePickerProps) {
  const { control, formState } = useFormContext<any>();
  const err = formState.errors?.[name]?.message as string | undefined;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          value={field.value ?? null}
          onChange={field.onChange}
          error={err}
          {...rest}
        />
      )}
    />
  );
}

type RHFDateRangePickerProps = Omit<
  DateRangePickerProps,
  "value" | "onChange" | "error"
> & {
  name: string;
};

export function RHFDateRangePicker({ name, ...rest }: RHFDateRangePickerProps) {
  const { control, formState } = useFormContext<any>();
  const err = formState.errors?.[name]?.message as string | undefined;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DateRangePicker
          value={field.value}
          onChange={field.onChange}
          error={err}
          {...rest}
        />
      )}
    />
  );
}

// -----------------------------------------------------------------------------
// 5) Example usage (Form)
// -----------------------------------------------------------------------------

const FormSchema = z.object({
  date: z.date({ message: "Vui lòng chọn ngày" }),
  range: z
    .object({
      from: z.date({ message: "Chọn ngày bắt đầu" }),
      to: z.date({ message: "Chọn ngày kết thúc" }),
    })
    .refine((v) => !!v.from && !!v.to, { message: "Chọn đủ khoảng ngày" })
    .refine((v) => (v.from && v.to ? v.from <= v.to : true), {
      message: "Ngày bắt đầu không được sau ngày kết thúc",
    }),
});

export function DateFormDemo() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: undefined as unknown as Date,
      range: undefined as unknown as DateRange,
    },
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <RHFDatePicker
          name="date"
          label="Ngày"
          placeholder="dd/mm/yyyy"
          min={new Date(2000, 0, 1)}
          max={new Date(2100, 11, 31)}
          formatString="dd/MM/yyyy"
          clearable
        />

        <RHFDateRangePicker
          name="range"
          label="Khoảng ngày"
          placeholder="Chọn khoảng ngày"
          formatString="dd/MM/yyyy"
          clearable
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}

// -----------------------------------------------------------------------------
// 6) Utilities
// -----------------------------------------------------------------------------

function stripTime(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
