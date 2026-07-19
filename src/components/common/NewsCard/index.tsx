"use client";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

export type NewsCardProps = {
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  badge?: string;
  date?: string;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
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
}) => {
  return (
    <Card
      onClick={onClick}
      borderRadius="16px"
      padding="0px"
      gap={0}
      shadow="none"
      className={cn(
        "relative overflow-hidden bg-white border border-slate-100/80 transition-all duration-300 w-full max-w-[389.33px] h-[434px] shadow-[0px_4px_25px_-12px_rgba(0,0,0,0.12)]",
        onClick && "cursor-pointer hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative w-full h-[228px] overflow-hidden rounded-t-[16px] bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardContent className="flex flex-col p-4 h-[206px] gap-0">
        <div className="flex items-center justify-between h-[30px]">
          {badge ? (
            <span className="inline-flex items-center justify-center bg-[#ff9c00] rounded-[4px] py-[4px] px-[12px] font-poppins font-medium text-sm text-white whitespace-nowrap leading-[22px] h-[30px]">
              {badge}
            </span>
          ) : (
            <div className="h-[30px]" />
          )}

          {date && (
            <span className="font-poppins font-medium text-sm text-[#667085] leading-[22px]">
              {date}
            </span>
          )}
        </div>

        {title && (
          <div className="pt-3 h-[60px]">
            <h3 className="font-poppins font-bold text-[17px] leading-6 text-black uppercase text-left line-clamp-2 h-[48px]">
              {title}
            </h3>
          </div>
        )}

        {description && (
          <div className="pt-3 h-[84px]">
            <p className="font-poppins font-medium text-base leading-6 text-[#404040] text-left line-clamp-3 h-[72px]">
              {description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

NewsCard.displayName = "NewsCard";

export { NewsCard };
export default NewsCard;
