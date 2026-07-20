"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Container, Button } from "@/components/ui";
import { AccentTitle } from "@/components/common/AccentTitle";
import { NewsCard } from "@/components/common/NewsCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StaticImageData } from "next/image";

export interface NewsItem {
  id: string | number;
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  badge?: string;
  date?: string;
  title: string;
  description?: string;
}

interface NewsSectionProps {
  items?: NewsItem[];
  title?: string;
  onCardClick?: (item: NewsItem) => void;
}

type NavArrowProps = {
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
};

// Cả 2 nút đều là nền trắng (bg-white), mũi tên xanh đậm, shadow nhẹ
const NavArrow: React.FC<NavArrowProps> = ({
  direction,
  onClick,
  disabled,
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    variant="text"
    aria-label={direction === "left" ? "Trước" : "Sau"}
    className={`w-12 h-12 rounded-full border border-slate-100/80 bg-white text-[#0b1237] flex items-center justify-center shrink-0 transition-all duration-200 z-10 p-0
      ${
        disabled
          ? "opacity-30 cursor-default shadow-none"
          : "cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:bg-slate-50 active:scale-95"
      }`}
  >
    {direction === "left" ? (
      <ChevronLeft className="size-5" strokeWidth={2.5} />
    ) : (
      <ChevronRight className="size-5" strokeWidth={2.5} />
    )}
  </Button>
);

export const NewsSection: React.FC<NewsSectionProps> = ({
  items = [],
  title,
  onCardClick,
}) => {
  const displayItems = items;
  const displayTitle = title || "bảng tin cập nhật";

  // Cấu hình Embla Carousel trượt 1 card một lần
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full bg-white">
      <Container size="medium" className="px-4">
        {/* ── Title row: removed "Xem tất cả" link ───────────────────────── */}
        <div className="flex items-end justify-between mb-8">
          <AccentTitle title={displayTitle} />
        </div>

        {/* ── Slider Wrapper ─────────────────────────────────────────────── */}
        <div className="relative w-full">
          {/* Left Arrow: Absolute positioned outside */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20">
            <NavArrow direction="left" onClick={scrollPrev} />
          </div>

          {/* Embla Viewport */}
          <div
            className="overflow-hidden w-full py-4 -my-4 px-4 -mx-4"
            ref={emblaRef}
          >
            <div className="flex gap-4">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] min-w-0"
                >
                  <NewsCard
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt}
                    badge={item.badge}
                    date={item.date}
                    title={item.title}
                    description={item.description}
                    onClick={() => onCardClick?.(item)}
                    className="h-full border border-slate-100/80 hover:-translate-y-1 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow: Absolute positioned outside */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20">
            <NavArrow direction="right" onClick={scrollNext} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsSection;
