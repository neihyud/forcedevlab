import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { TextSize, TextSizeStyle } from "@/lib/enum";

const tagVariants = cva(
  "inline-flex items-center justify-center whitespace-normal break-words text-white px-2 py-[2px] w-fit",
  {
    variants: {
      weight: {
        400: "font-normal",
        500: "font-medium",
        600: "font-semibold",
        700: "font-bold",
      },
      shape: {
        round: "rounded-full",
        square: "rounded",
      },
    },
    defaultVariants: {
      weight: 400,
      shape: "round",
    },
  },
);

type TagProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tagVariants> & {
    size?: TextSize;
  };

export const Tag = ({
  className,
  size = TextSize.SMALL,
  weight,
  shape,
  color,
  children,
  ...props
}: TagProps) => {
  return (
    <div
      className={cn(tagVariants({ weight, shape }), className)}
      {...props}
      style={{
        backgroundColor: color,
        fontSize: TextSizeStyle[size].fontSize,
        lineHeight: TextSizeStyle[size].lineHeight,
      }}
    >
      {children}
    </div>
  );
};
