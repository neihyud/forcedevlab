import React from "react";
import Image from "next/image";
import bgAboutHero from "@/lib/assets/mock-images/home/hero/bg-about-hero.webp";
import aboutUsHeroLogo from "@/lib/assets/mock-images/about-us/about-us-hero-logo.webp";
import { AboutContainer } from "./AboutContainer";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const AboutUsHeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#090f2b] flex flex-col min-h-[560px] md:min-h-[640px]">
      {/* Full-section background image */}
      <Image
        src={bgAboutHero}
        alt=""
        fill
        priority
        quality={90}
        className="object-cover object-center pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Radial glow glow ring element */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      {/* ── Breadcrumb: full-width, top of section (y:0 in Figma) ── */}
      <div className="relative z-10 w-full h-[56px] py-[15px] px-6 text-sm text-white/80 select-none flex items-center">
        <Breadcrumb
          items={[{ title: "Trang chủ", href: "/" }, { title: "Giới thiệu" }]}
          separator="/"
          itemClassName="text-white font-bold text-base leading-5"
          activeClassName="text-white font-normal text-base leading-[26px]"
          separatorClassName="text-[#bdbdbd] text-[10px] tracking-[0.015em]"
        />
      </div>

      <AboutContainer className="flex-1 flex flex-col items-center pt-[104px] pb-[40px]">
        {/* Hero Inner — matches Figma node 337-3079: centered, logo + h1, gap 48px */}
        <div className="flex flex-col items-center text-center w-full gap-12">
          {/* Logo — 236×100px, centered */}
          <Image
            src={aboutUsHeroLogo}
            alt="HVS Logo"
            width={236}
            height={100}
            priority
            className="object-contain filter brightness-110"
          />

          {/* H1 — Inter Bold 52px, lineHeight 80px, centered */}
          <h1 className="w-full uppercase font-inter font-bold text-[52px] leading-20 text-white text-center tracking-wide">
            Đối tác tài chính tin cậy của bạn
          </h1>
        </div>

        {/* Slogan badge — Figma node 342-2809, y:528, 196px below hero-inner */}
        <div className="flex items-center justify-center bg-white/10 rounded-lg py-2 px-6 mt-[196px]">
          <p className="font-medium text-base leading-6 tracking-[0.15px] whitespace-nowrap text-white">
            LÀM ÍT HƠN <span className="text-[#136ecb]">AN TOÀN HƠN</span>{" "}
            <span className="text-[#ffbd00]">LỢI NHUẬN NHIỀU HƠN</span>
          </p>
        </div>
      </AboutContainer>
    </section>
  );
};
