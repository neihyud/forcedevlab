import { useState } from "react";

import * as SelectPrimitive from "@radix-ui/react-select";
import { X } from "lucide-react";

import { Text } from "@/components/ui/Text";

import { cn } from "@/lib/utils";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select as ShadcnSelect,
} from "./select";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import Spin from "@/components/ui/Spin";
import { cva } from "class-variance-authority";

const selectVariants = cva("", {
  variants: {
    size: {
      sm: "[&_span]-text-xl !h-9",
      md: "!text-base !h-10",
      lg: "[&_span]:!text-xl px-5 !h-12",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type Props = {
  value?: string | number;
  placeholder?: string;
  onChange?: (value: any) => void;
  triggerClassName?: string;
  valueClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  options: {
    label: string | number;
    value: string | number;
    disabled?: boolean;
  }[];
  id?: string;
  defaultValue?: string;
  allowClear?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
};

export const Select = (props: Props) => {
  const [value, setValue] = useState<string | undefined | null>(
    props.defaultValue || null,
  );
  const selectedOption = props.options.find((option) => option.value == value);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  const handleClear = (e: any) => {
    console.log(e);
    e.stopPropagation();
    setValue(undefined);
    props.onChange?.(undefined);
  };

  useDidUpdateEffect(() => {
    setValue(
      props.value ? props.value?.toString() : props.defaultValue || undefined,
    );
  }, [props.value]);
  return (
    <div className="relative">
      <ShadcnSelect
        value={value || ""}
        onValueChange={handleValueChange}
        disabled={props.disabled}
      >
        <SelectTrigger
          isHideIcon={(!!props.allowClear && !!value) || props.isLoading}
          id={props.id}
          className={cn(
            selectVariants({ size: props.size }),
            props.triggerClassName,
          )}
        >
          <Text
            color={
              selectedOption?.label
                ? "var(--foreground)"
                : "var(--muted-foreground)"
            }
            className={props.valueClassName}
          >
            {selectedOption?.label ?? props.placeholder}
          </Text>

          {value && props.allowClear && (
            <SelectPrimitive.Icon className="opacity-0">
              <X />
              <X size={16} />
            </SelectPrimitive.Icon>
          )}

          {props.isLoading && (
            <SelectPrimitive.Icon className="px-1">
              <Spin
                size={props.size ?? "sm"}
                className="border-[1px] text-foreground/90"
              />
            </SelectPrimitive.Icon>
          )}
        </SelectTrigger>
        <SelectContent className={cn("z-9999", props.contentClassName)}>
          {props.options.map((option) => (
            <SelectItem
              key={option.value}
              value={`${option.value}`}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
      {value && props.allowClear && !props.isLoading && (
        <SelectPrimitive.Icon
          className="absolute top-1/2 right-2.5 -translate-y-1/2 hover:bg-accent rounded-full p-[2px]"
          onClick={handleClear}
        >
          <X size={props.size === "lg" ? 20 : 16} />
        </SelectPrimitive.Icon>
      )}
    </div>
  );
};
