import React from "react";

/**
 * Props for the HeroBadge component.
 */
interface HeroBadgeProps {
  /**
   * The text to display inside the badge.
   * Supports custom inline formatting:
   * - `{text}` renders text in blue color (`#136ecb`).
   * - `[text]` renders text in gold/yellow color (`#ffbd00`).
   *
   * @default "LÀM ÍT HƠN {AN TOÀN HƠN} [LỢI NHUẬN NHIỀU HƠN]"
   */
  text?: string;
  /**
   * Additional Tailwind/CSS class names to style the badge container.
   */
  className?: string;
}

/**
 * HeroBadge is a stylized badge component typically used in hero sections.
 * It features a backdrop blur effect and supports simple markdown-like syntax
 * to color specific words or phrases.
 *
 * Syntax formatting in `text`:
 * - `{blue text}` -> Renders text in blue (`#136ecb`)
 * - `[gold text]` -> Renders text in gold (`#ffbd00`)
 *
 * @example
 * ```tsx
 * <HeroBadge text="LÀM ÍT HƠN {AN TOÀN HƠN} [LỢI NHUẬN NHIỀU HƠN]" />
 * ```
 */
export const HeroBadge: React.FC<HeroBadgeProps> = ({
  text,
  className = "",
}) => {
  const defaultText = "LÀM ÍT HƠN {AN TOÀN HƠN} [LỢI NHUẬN NHIỀU HƠN]";
  const content = text || defaultText;

  // Regex to match parts: {blue} or [gold] or plain text
  const parts = content.split(/(\{.*?\}|\[.*?\])/g);

  return (
    <div
      className={`rounded-lg bg-white/10 backdrop-blur-[6px] py-2 px-6 h-10 flex items-center ${className}`}
    >
      <p className="text-white whitespace-nowrap font-roboto font-medium text-base leading-6 tracking-[0.15px]">
        {parts.map((part, index) => {
          if (part.startsWith("{") && part.endsWith("}")) {
            return (
              <span key={index} className="text-[#136ecb]">
                {part.slice(1, -1)}
              </span>
            );
          }
          if (part.startsWith("[") && part.endsWith("]")) {
            return (
              <span key={index} className="text-[#ffbd00]">
                {part.slice(1, -1)}
              </span>
            );
          }
          return part;
        })}
      </p>
    </div>
  );
};

HeroBadge.displayName = "HeroBadge";
export default HeroBadge;
