"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import bgReview from "@/components/images/section-review/bg-review.png";
import markDecor from "@/lib/assets/mock-images/home/review/mark.webp";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  type CarouselApi,
  Input,
} from "@/components/ui";
import Rate from "@/components/ui/Rate";

export interface Review {
  id: number;
  name: string;
  rating: number; // Out of 5
  time: string;
  verified: boolean;
  content: string;
  avatarFallback: string;
}

// ─── SUB-COMPONENT: WRITE REVIEW FORM ─────────────────────────────────────────
interface WriteReviewFormProps {
  newReviewText: string;
  setNewReviewText: (text: string) => void;
  newRating: number;
  setNewRating: (rating: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const WriteReviewForm: React.FC<WriteReviewFormProps> = ({
  newReviewText,
  setNewReviewText,
  newRating,
  setNewRating,
  onSubmit,
}) => {
  return (
    <div className="mb-8 text-left">
      <h3 className="text-display-xs font-bold font-poppins text-brand-gold mb-3 leading-8">
        Viết đánh giá
      </h3>
      <div className="bg-navy-card border border-[#5099ff]/20 rounded-2xl p-4 flex flex-col justify-between">
        {/* Input field */}
        <Input
          type="text"
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          placeholder="Nhập nội dung"
          className="bg-transparent border-none shadow-none ring-0 hover:ring-0 focus-visible:ring-0 rounded-none outline-none text-base font-medium font-poppins text-white placeholder-slate-400 p-0"
        />

        {/* Actions row */}
        <div className="flex items-center justify-between mt-3 md:mt-0">
          {/* Stars Selection using Rate Component */}
          <Rate value={newRating} onChange={setNewRating} size={20} />

          {/* Confirm Button using Button Component */}
          <Button
            onClick={onSubmit}
            className="bg-brand-gold hover:brightness-110 text-brand-navy font-bold font-poppins text-xs leading-none py-1.5 px-4 rounded-md transition-colors cursor-pointer flex items-center justify-center h-[32px]"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

// ─── SUB-COMPONENT: REVIEW CARD ───────────────────────────────────────────────
interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="w-full bg-navy-card border border-[#5099ff]/20 rounded-lg p-4 text-left flex flex-col justify-between h-[166.71px] shadow-lg">
      <div>
        {/* Avatar & Info Row */}
        <div className="flex items-center justify-between mb-4 h-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-[#979797] bg-[#032c57] flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
              {review.avatarFallback}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium font-heebo text-sm leading-[21px] text-white">
                {review.name}
              </span>
              <span className="w-1 h-1 rounded-full bg-white shrink-0" />
              <span className="text-sm font-heebo leading-[21px] text-white">
                {review.time}
              </span>
            </div>
          </div>

          {/* Stars using Rate Component */}
          <Rate value={review.rating} readOnly size={24} />
        </div>

        {/* Content */}
        <p className="text-sm font-poppins font-medium text-white leading-[21px] line-clamp-2">
          {review.content}
        </p>
      </div>
    </div>
  );
};

interface ReviewSectionProps {
  title?: string;
  items?: Review[];
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const ReviewSection: React.FC<ReviewSectionProps> = ({
  title,
  items = [],
}) => {
  const [reviews, setReviews] = useState<Review[]>(items);
  const [newReviewText, setNewReviewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [api, setApi] = useState<CarouselApi>();

  // Đồng bộ hóa khi items thay đổi từ CMS
  useEffect(() => {
    setReviews(items);
  }, [items]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      name: "Khách hàng HVS",
      rating: newRating,
      time: "Hôm nay",
      verified: true,
      content: newReviewText,
      avatarFallback: "KH",
    };

    setReviews([newReview, ...reviews]);
    setNewReviewText("");
    setNewRating(5);
    api?.scrollTo(0); // Reset slider to show the newest review
  };

  return (
    <section className="py-2 relative overflow-hidden px-4 md:px-8">
      <div className="mx-auto bg-[#001026] text-white rounded-[20px] pt-[68px] pb-12 px-6 md:px-15 lg:px-30 xl:px-15 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-100">
          <Image
            src={bgReview}
            alt="Review background"
            placeholder="blur"
            fill
            sizes="100vw"
            priority
            className="object-fill"
          />
        </div>

        <div className="relative z-10 mx-auto p-0 max-w-300 w-full">
          {/* Title Container with Decor Image */}
          <div className="mb-8 text-left relative">
            <div className="w-10 h-1 bg-brand-orange rounded-sm mb-4" />
            <h2 className="text-2xl md:text-3xl lg:text-display-sm uppercase font-bold font-poppins text-white leading-tight">
              {title || "Đánh giá dịch vụ"}
            </h2>
            {/* Decor image: absolute, right side, centered on h2 */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[141px] h-[141px] pointer-events-none">
              <Image
                src={markDecor}
                alt="Decoration decor"
                width={141}
                height={141}
                priority
              />
            </div>
          </div>

          {/* Write Review Form Component */}
          <WriteReviewForm
            newReviewText={newReviewText}
            setNewReviewText={setNewReviewText}
            newRating={newRating}
            setNewRating={setNewRating}
            onSubmit={handleSubmitReview}
          />

          {/* Reviews Slider Header */}
          <div className="flex items-center justify-between mb-4 text-left">
            <h3 className="text-display-xs font-normal font-heebo text-white leading-[36px]">
              Nhận xét từ {reviews.length} đánh giá
            </h3>
          </div>

          {/* Reviews Slider Cards & Navigation using common Carousel */}
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            {/* Slides + nav buttons in a relative wrapper so top-1/2 is scoped to slides only */}
            <div className="relative">
              {/* Left navigation arrow */}
              <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-[#5099ff]/20 rounded-full flex items-center justify-center text-white transition-all z-20 cursor-pointer shadow-lg">
                <ChevronLeft className="size-5" />
              </CarouselPrevious>

              {/* Slide content container */}
              <CarouselContent className="-ml-4">
                {reviews.map((rev) => (
                  <CarouselItem
                    key={rev.id}
                    className="basis-full md:basis-1/2 pl-4"
                  >
                    <ReviewCard review={rev} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Right navigation arrow */}
              <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-[#5099ff]/20 rounded-full flex items-center justify-center text-white transition-all z-20 cursor-pointer shadow-lg">
                <ChevronRight className="size-5" />
              </CarouselNext>
            </div>
          </Carousel>

          {/* Dots Indicator — standalone, outside Carousel context */}
          <CarouselDots
            api={api}
            className="w-full flex justify-center items-center gap-5.25 mt-8 h-6.5"
            renderDot={(isActive) =>
              isActive ? (
                <div className="w-6.5 h-6.5 bg-[#d9d9d9] rounded-full flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-[#075994] rounded-full" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 bg-white/40 hover:bg-white/60 rounded-full" />
              )
            }
          />
        </div>
      </div>
    </section>
  );
};
