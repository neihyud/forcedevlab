export enum TextSize {
  LARGE = "large",
  X_MEDIUM = "x-medium",
  MEDIUM = "medium",
  SMALL = "small",
  X_SMALL = "x-small",
  X_LARGE = "x-large",
}

export const TextSizeStyle: Record<
  TextSize,
  {
    fontSize: string;
    lineHeight: string;
  }
> = {
  large: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
  },
  "x-medium": {
    fontSize: "1.25rem",
    lineHeight: "1.875rem",
  },
  medium: {
    fontSize: "17px",
    lineHeight: "25px",
  },
  small: {
    fontSize: "14px",
    lineHeight: "22px",
  },
  "x-small": {
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
  },
  "x-large": {
    fontSize: "2.25rem",
    lineHeight: "2rem",
  },
};
