"use client";

import { FaqSection } from "./FaqSection";
import { AddressStatsSection } from "./AddressStatsSection";
import { VisionMissionValuesSection } from "./VisionMissionValuesSection";
import { ReviewSection } from "@/modules/home/ReviewSection";
import { AboutUsHeroSection } from "./AboutUsHeroSection";
import { IReview } from "@/types/cms";
import { IStrapiBase } from "@/types/strapi";
import { IFaqSection } from "@/services/mocks/faq.mock";

interface AboutUsModuleProps {
  reviews?: (IReview & IStrapiBase)[];
  faq?: IFaqSection | null;
}

export default function AboutUsModule({
  reviews = [],
  faq = null,
}: AboutUsModuleProps) {
  const reviewItems =
    reviews?.map((rev: any) => ({
      id: rev.id,
      name: rev.name,
      rating: rev.rating,
      time: rev.time,
      verified: rev.verified,
      content: rev.content,
      avatarFallback: rev.avatarFallback,
    })) || [];

  return (
    <div className="w-full bg-[#f8f9fb] dark:bg-background select-none overflow-hidden font-poppins">
      {/* ─── HERO SECTION (Contains Breadcrumbs, Logo, Title, and Slogan Badge) ─── */}
      <AboutUsHeroSection />

      {/* ─── ADDRESS & STATS BANNER ─── */}
      <AddressStatsSection />

      {/* ─── VISION, MISSION & CORE VALUES SECTION ─── */}
      <VisionMissionValuesSection />

      {/* ─── CUSTOMER REVIEWS SECTION ─── */}
      <ReviewSection items={reviewItems} />

      {/* ─── FAQ SECTION ─── */}
      <FaqSection faq={faq} />
    </div>
  );
}
