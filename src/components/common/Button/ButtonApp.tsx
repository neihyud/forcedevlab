import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonAppProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  color?: string;
  fullWidth?: boolean;
  background?: string;
  withOuterLayer?: boolean;
  backgroundLayer?: string;
}

export const ButtonApp = React.forwardRef<HTMLButtonElement, ButtonAppProps>(
  (
    {
      text,
      icon,
      color = "#0F2451",
      background = "linear-gradient(90deg, #FF9C00 0%, #FFBD00 100%)",
      fullWidth = false,
      withOuterLayer = false,
      backgroundLayer = "linear-gradient(90deg, rgba(255, 156, 0, 0.3) 0%, rgba(255, 156, 0, 0) 100%)",
      className,
      ...props
    },
    ref,
  ) => {
    const buttonElement = (
      <button
        ref={ref}
        className={cn(
          "flex flex-row justify-center items-center px-4 py-[27px] h-[64px] rounded-lg select-none w-full",
          "text-[17px] leading-6.25 font-bold transition-all duration-200",
          "hover:brightness-105 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        )}
        style={{
          color: color,
          background: background,
        }}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          <span>{text}</span>
          {icon && (
            <span className="flex items-center justify-center shrink-0">
              {icon}
            </span>
          )}
        </span>
      </button>
    );

    if (withOuterLayer) {
      return (
        <div
          className={cn(
            "flex flex-col items-start p-1 h-[72px] rounded-lg shrink-0 justify-center",
            fullWidth ? "w-full" : "",
            className,
          )}
          style={{
            background: backgroundLayer,
            boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.25)",
          }}
        >
          {buttonElement}
        </div>
      );
    }

    return (
      <div
        className={cn(
          "shrink-0",
          fullWidth ? "w-full" : "w-[274px]",
          className,
        )}
      >
        {buttonElement}
      </div>
    );
  },
);

ButtonApp.displayName = "ButtonApp";

export default ButtonApp;
