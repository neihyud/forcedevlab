"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PlayBtnHome } from "@/components/icons";
import { Button } from "@/components/ui";
import { HeroBadge } from "@/components/common/HeroBadge";
import collaboratory from "@/lib/assets/mock-images/home/hero/collaboratory.webp";
import analysis from "@/lib/assets/mock-images/home/hero/analysis.webp";

import { IHeroSectionComponent, IPartnersSectionComponent } from "@/types/cms";

interface HeroSectionProps {
  heroData?: IHeroSectionComponent;
  partnersData?: IPartnersSectionComponent;
}

export const HeroSection = ({ heroData, partnersData }: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#090f2b] min-h-[920px]">
      {heroData?.heroBackground?.url && (
        <Image
          src={heroData.heroBackground.url}
          alt={heroData.heroBackground.alternativeText || ""}
          fill
          priority
          quality={90}
          className="object-cover object-center pointer-events-none select-none"
          aria-hidden="true"
        />
      )}

      <div
        className="absolute left-0 right-0 bottom-[-0.5px] h-10 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 34, 83, 0) 0%, #002253 100%)",
        }}
      />

      <div className="relative w-full max-w-[1920px] mx-auto px-[68px] pt-[68px] pb-[32px]">
        <div className="relative min-h-[820px]">
          <div className="absolute overflow-visible left-[736px] top-[56px] w-[1086px] h-[756px]">
            <div className="absolute inset-0 pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_50%_50%,rgba(217,217,217,0.09)_0%,transparent_68%)]" />

            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <Image
                src={analysis}
                alt="Investment Analysis"
                fill
                priority
                className="object-contain"
              />
              <HeroBadge
                text={heroData?.badgeText}
                className="absolute left-1/2 top-[82%] -translate-x-1/2 -translate-y-1/2"
              />
            </div>

            {!isPlaying && (
              <Button
                onClick={() => setIsPlaying(true)}
                variant="text"
                className="absolute z-20 cursor-pointer hover:scale-105 active:scale-95 transition-all left-1/2 top-[40%] -translate-x-1/2 w-14 h-14 p-0 border-none outline-none flex items-center justify-center"
                aria-label="Play Video"
              >
                <PlayBtnHome className="size-14" />
              </Button>
            )}

            {isPlaying && (
              <div className="absolute z-25 overflow-hidden shadow-2xl left-[21.36%] top-[17.2%] w-[61.5%] h-[49.87%] rounded-[5%] bg-black border border-white/10">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(false);
                  }}
                  variant="text"
                  className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer p-0"
                >
                  ✕
                </Button>
                <video
                  src={heroData?.videoUrl || ""}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="relative z-10 flex flex-col w-[55.94%] min-h-[820px]">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="text-white font-bold  text-[72px] uppercase leading-[1.3]">
                  {heroData?.title || "Đầu Tư Tinh Gọn"}
                </h1>

                <h2 className="font-bold bg-clip-text text-transparent text-[72px] uppercase leading-[1.3] bg-gradient-to-r from-[#f5c842] to-[#f58733]">
                  {heroData?.subtitle || "Thịnh Vượng Vững Chắc"}
                </h2>
              </div>

              <div className="flex flex-col mt-6 max-w-[510px] gap-10">
                <p className="font-medium font-plus-jakarta text-[18px] leading-[1.6] text-[#e6e6e6]">
                  {heroData?.description}
                </p>

                {/* ── CTA Button ─────────────────────────────────────────── */}
                <div className="w-[300px] h-18 flex items-start justify-center p-0">
                  <div
                    className="w-[300px]  rounded-lg p-1 flex flex-col items-start justify-start"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255, 156, 0, 0.3) 0%, rgba(255, 156, 0, 0) 100%)",
                      filter:
                        "drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.25))",
                    }}
                  >
                    <a
                      href={heroData?.ctaLink || "#"}
                      className="w-[292px] h-[64px] rounded-lg flex flex-row items-center justify-center gap-0 border-none outline-none cursor-pointer transition-all hover:brightness-105 active:scale-[0.98] select-none text-decoration-none"
                      style={{
                        background:
                          "linear-gradient(90deg, #FF9C00 0%, #FFBD00 100%)",
                        padding: "27px 16px",
                      }}
                    >
                      <span className=" font-bold text-[17px] text-[#0b1237] leading-[26px] tracking-0 uppercase text-center flex items-center justify-center w-[127px] h-[26px]">
                        {heroData?.ctaText}
                      </span>
                      <ArrowRight
                        className="w-[25px] h-[25px] text-[#0b1237] shrink-0"
                        strokeWidth={2}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[500px] mt-4 flex flex-col">
              <div className="px-3 flex items-center py-2">
                <p className="text-white font-medium text-base">
                  {partnersData?.title}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full">
                {partnersData?.partners?.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex items-center justify-center h-16 relative"
                  >
                    <Image
                      src={partner.logo?.url}
                      alt={partner.name || "Partner Logo"}
                      className="object-contain max-h-16 w-auto"
                      width={partner.logo?.width || 167}
                      height={partner.logo?.height || 64}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboratory image: Positioned using percentages relative to the column */}
            <div className="absolute pointer-events-none select-none left-[37.4%] top-[49.6%] w-[49.1%] h-[26.8%]">
              <Image
                src={collaboratory}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
