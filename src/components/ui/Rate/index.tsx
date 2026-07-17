"use client";

import React, { useState } from "react";

import Flex from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { StarIcon } from "@/components/icons";

type Props = {
  value?: number;
  defaultValue?: number;
  size?: number;
  showInfo?: boolean;
  infoSize?: string;
  disabled?: boolean;
  readOnly?: boolean;
  infoWeight?: number;
  onChange?: (v: number) => void;
  className?: string;
  infoClassname?: string;
};

const Rate = ({
  value,
  defaultValue = 0,
  size = 24,
  showInfo = false,
  infoSize = "small",
  infoWeight = 700,
  disabled,
  readOnly,
  className,
  infoClassname,
  onChange,
}: Props) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const isInteractive = !disabled && !readOnly;

  const handleClick = (v: number) => {
    if (!isInteractive) return;
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  };

  return (
    <Flex align="center" gap={8} className="group/rate relative">
      <Flex align="center" gap={4} className={cn("relative", className)}>
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            data-index={i}
            data-active={i <= currentValue}
            style={{ width: size, height: size }}
            className={cn(
              "relative transition-all duration-150 ease-in-out text-border star-glow",
              isInteractive
                ? "hover:text-[oklch(0.75_0.1457_70.3)] group-hover/rate:text-[oklch(0.75_0.1457_70.3)] [&:hover~button]:text-border"
                : readOnly
                  ? "cursor-default"
                  : "cursor-not-allowed opacity-50",
              "data-[active=true]:text-[oklch(0.75_0.1457_70.3)]",
            )}
            onClick={() => handleClick(i)}
            tabIndex={readOnly ? -1 : 0}
          >
            <StarIcon
              fill="currentColor"
              stroke="currentColor"
              props={{
                style: { width: "100%", height: "100%" },
              }}
            />
          </button>
        ))}
      </Flex>

      {showInfo && (
        <Text
          size={infoSize as any}
          weight={infoWeight as any}
          className={cn("pt-0.5", infoClassname)}
        >
          {currentValue}
        </Text>
      )}
    </Flex>
  );
};

export default Rate;
