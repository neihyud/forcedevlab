"use client";

import { IGlobalSetting, IMenuItem, IHomepage } from "@/types/cms";
import { IStrapiBase } from "@/types/strapi";
import { HeroSection } from "./HeroSection";
import NewsSection from "./NewsSection";
import ProductServiceSection from "./ProductServiceSection";
import { ReviewSection } from "./ReviewSection";
import { AppDownloadSection } from "./AppDownloadSection";
import { DecorHome } from "@/components/common/DecorHome";

interface HomeProps {
  globalSetting: (IGlobalSetting & IStrapiBase) | null;
  menus: (IMenuItem & IStrapiBase)[];
  homepage: (IHomepage & IStrapiBase) | null;
}

export default function Home(props: HomeProps) {
  const { homepage } = props;

  const heroSectionData = homepage?.page_sections.find(
    (sec) => sec.__component === "sections.hero-section",
  ) as any;

  const partnersSectionData = homepage?.page_sections.find(
    (sec) => sec.__component === "sections.partners-section",
  ) as any;

  const newsSectionData = homepage?.page_sections.find(
    (sec) => sec.__component === "sections.news-section",
  ) as any;

  const newsArticles =
    newsSectionData?.articles?.map((art: any) => ({
      id: art.id,
      imageSrc: art.image?.url || "",
      imageAlt: art.title,
      badge: art.badge,
      date: art.date,
      title: art.title,
      description: art.description,
    })) || [];

  const reviewsSectionData = homepage?.page_sections.find(
    (sec) => sec.__component === "sections.reviews-section",
  ) as any;

  const reviewItems =
    reviewsSectionData?.reviews?.map((rev: any) => ({
      id: rev.id,
      name: rev.name,
      rating: rev.rating,
      time: rev.time,
      verified: rev.verified,
      content: rev.content,
      avatarFallback: rev.avatarFallback,
    })) || [];

  return (
    <div className="w-full bg-white text-slate-100 font-sans overflow-x-hidden">
      {/* ─── 1. HERO SECTION ─── */}
      <HeroSection
        heroData={heroSectionData}
        partnersData={partnersSectionData}
      />

      <DecorHome className="block relative z-20 w-full h-auto" />
      {/* ─── 2. NEWS/UPDATES SECTION ─── */}
      <div className="-mt-[48px] relative z-10">
        <NewsSection title={newsSectionData?.title} items={newsArticles} />
      </div>

      <div className="py-7"></div>

      {/* ─── 3. PRODUCTS & SERVICES SECTION ─── */}
      <ProductServiceSection />

      {/* ─── 4. REVIEWS SECTION ─── */}
      <ReviewSection title={reviewsSectionData?.title} items={reviewItems} />

      {/* ─── 5. APP DOWNLOAD PROMO SECTION ─── */}
      <AppDownloadSection />
      <DecorHome className="block relative z-20 w-full h-auto rotate-180 -mt-[82px]" />
    </div>
  );
}
