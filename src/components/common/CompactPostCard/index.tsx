import fallbackReport from "@/lib/assets/images/webp/fallback_report.webp";
import { getStrapiImageUrl } from "@/lib/helpers/strapi";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { Link } from "@/i18n/routing";
import React from "react";

export type CompactPostCardProps = {
  /** Optional link destination */
  href?: string;
  /** Hero image src (URL string or next/image StaticImageData) */
  imageSrc: string | StaticImageData;
  /** Alt text for the image */
  imageAlt?: string;
  /** Badge label — e.g. "Báo cáo chiến lược" */
  badge?: string;
  /** Date string — e.g. "16/06/2026" */
  date?: string;
  /** Card title */
  title: string;
  /** Click handler for the card */
  onClick?: () => void;
  /** Extra classNames for the root element */
  className?: string;
  /** Layout orientation */
  layout?: "horizontal" | "vertical";
  /** Optional reading time string */
  readingTime?: string;
};

const CompactPostCard = React.memo(
  ({
    href,
    imageSrc,
    imageAlt = "",
    badge,
    date,
    title,
    onClick,
    className,
    layout = "vertical",
    readingTime,
  }: CompactPostCardProps) => {
    const isHorizontal = layout === "horizontal";
    const t = useTranslations("Common");

    const content = (
      <div className="flex gap-3 text-left w-full">
        <div className="relative aspect-[4/3] w-[80px] shrink-0 rounded overflow-hidden ">
          <Image
            src={getStrapiImageUrl(imageSrc, fallbackReport)}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-1 flex flex-col justify-between h-full">
          <h4 className="text-sm font-bold text-blue-24 dark:text-gray-100 group-hover:text-secondary line-clamp-2 transition-colors leading-snug">
            {title}
          </h4>
          <div className="text-xs text-[#667085] dark:text-gray-400">
            <span>{date}</span>
            {readingTime && (
              <span>
                {" "}
                • {readingTime} {t("timeReading")}
              </span>
            )}
          </div>
        </div>
      </div>
    );

    const containerClasses = cn(
      "group bg-[#F9FAFB] block rounded-md py-3.5 px-3 border border-[#E4E7EC] cursor-pointer",
      !isHorizontal && "space-y-2",
      className,
    );

    if (href) {
      return (
        <Link href={href} className={containerClasses} onClick={onClick}>
          {content}
        </Link>
      );
    }

    return (
      <div className={containerClasses} onClick={onClick}>
        {content}
      </div>
    );
  },
);

CompactPostCard.displayName = "CompactPostCard";

export { CompactPostCard };
export default CompactPostCard;
