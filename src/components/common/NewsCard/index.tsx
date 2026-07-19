import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";

export type NewsCardProps = {
  /** Hero image src (URL string or next/image StaticImageData) */
  imageSrc: string | StaticImageData;
  /** Alt text for the image */
  imageAlt?: string;
  /** Badge label — e.g. "Tin cập nhập" */
  badge?: string;
  /** Date string — e.g. "16/06/2026" */
  date?: string;
  /** Card title (uppercase, bold) */
  title: string;
  /** Short description text */
  description?: string;
  /** Click handler for the card */
  onClick?: () => void;
  /** Extra classNames for the root element */
  className?: string;

  tags?: string[];
  textButton?: string;
};

/**
 * NewsCard — reusable article/news card component.
 *
 * Uses base UI `Card` component and Tailwind CSS styling.
 */
const NewsCard: React.FC<NewsCardProps> = ({
  imageSrc,
  imageAlt = "",
  badge,
  date,
  title,
  description,
  onClick,
  className,
  textButton,
  tags,
}) => {
  return (
    <Card
      onClick={onClick}
      borderRadius="16px"
      className={cn(
        "relative overflow-hidden bg-white border border-slate-100/80 transition-all duration-300",
        onClick && "cursor-pointer hover:shadow-md hover:-translate-y-1",
        className,
      )}
    >
      {/* ── Image area: 228px height, top rounded ─────────────────────── */}
      <div className="relative w-full h-[228px] overflow-hidden rounded-t-[16px] bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* ── Content area: padding 16 ──────────────────────────── */}
      <CardContent className="flex flex-col p-4 gap-0">
        {/* Row: badge + date */}
        <div className="flex items-center justify-between mb-4">
          {badge && (
            <span className="inline-flex items-center bg-secondary rounded-sm py-1 px-3 font-poppins font-medium text-sm text-white whitespace-nowrap">
              {badge}
            </span>
          )}

          {date && (
            <span className="font-poppins font-medium text-sm text-[#667085]">
              {date}
            </span>
          )}
        </div>

        {/* Title */}
        {title && (
          <div className="mb-3">
            <h3 className="font-poppins font-bold text-[17px] leading-6 text-black uppercase text-left line-clamp-2">
              {title}
            </h3>
          </div>
        )}

        {/* Description */}
        {description && (
          <div>
            <p className="font-poppins font-medium text-base leading-6 text-[#404040] text-left line-clamp-3">
              {description}
            </p>
          </div>
        )}

        {(tags || textButton) && (
          <div className="flex justify-between items-center  mt-3 ">
            <div className="flex flex-wrap  gap-2 h-fit ">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 font-medium rounded-sm text-sm bg-[#F2F4F7] text-[#344054]"
                >
                  {tag}
                </span>
              ))}
            </div>
            {textButton && (
              <Button onClick={onClick} color="secondary" variant={"text"}>
                {textButton}
                <ArrowRightIcon className="text-secondary" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

NewsCard.displayName = "NewsCard";

export { NewsCard };
export default NewsCard;
