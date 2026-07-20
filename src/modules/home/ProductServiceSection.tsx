"use client";

import React from "react";
import { Container, Button } from "@/components/ui";
import { AccentTitle } from "@/components/common/AccentTitle";

import Image, { StaticImageData } from "next/image";
import mockTuVanSo from "@/lib/assets/mock-images/home/producs/tu_van_so.webp";
import mockDaoTao from "@/lib/assets/mock-images/home/producs/dao_tao.webp";
import mockNews1 from "@/lib/assets/mock-images/home/news/news-1.webp";

interface ServiceCardProps {
  className?: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  secondaryBtnClassName?: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  className = "",
  badge,
  title,
  subtitle,
  description,
  onPrimaryClick,
  onSecondaryClick,
  secondaryBtnClassName = "",
  imageSrc,
  imageAlt,
}) => {
  return (
    <div
      className={`rounded-2xl p-7 pb-0 h-[564px] flex flex-col justify-start overflow-hidden transition-all text-left relative ${className}`}
    >
      {/* Top content wrapper: exactly 233px height */}
      <div className="flex flex-col justify-between h-[233px] flex-shrink-0">
        {/* Header: Title & Badge */}
        <div className="flex items-center justify-between">
          <AccentTitle
            title={title}
            titleColorClass="text-inherit"
            titleClassName="text-2xl leading-8"
          />
          <span className="bg-brand-gold text-[#111111] font-poppins font-semibold text-xs py-2 px-4 rounded-full">
            {badge}
          </span>
        </div>

        {/* Content: Subtitle & Description */}
        <div className="space-y-1">
          <p className="font-poppins font-bold text-sm text-brand-gold leading-[22px]">
            {subtitle}
          </p>
          <p className="font-poppins font-normal text-sm leading-[22px] line-clamp-3 opacity-80">
            {description}
          </p>
        </div>

        {/* Button Row */}
        <div className="flex gap-4 w-full">
          <Button
            onClick={onPrimaryClick}
            variant="text"
            className="flex-1  h-[49px] bg-brand-gold text-[#111111] hover:text-[#111111] font-poppins font-semibold text-md py-3 rounded-lg hover:brightness-110 hover:bg-brand-gold active:scale-95 transition-all text-center border-none outline-none cursor-pointer"
          >
            Trải nghiệm ngay
          </Button>
          <Button
            onClick={onSecondaryClick}
            variant="text"
            className={`flex-1  h-[49px] font-poppins font-semibold text-md py-3 rounded-lg active:scale-95 transition-all text-center border-none outline-none cursor-pointer ${secondaryBtnClassName}`}
          >
            Tìm hiểu thêm
          </Button>
        </div>
      </div>

      {/* Graphic/Image Area — Height 314px, Margin Top 20px (Figma gap) */}
      <div className="relative w-full h-[314px] mt-5 flex-shrink-0 rounded-t-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 536px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
};

export const ProductServiceSection: React.FC = () => {
  return (
    <section className="w-full bg-white pb-24 text-slate-900">
      <Container size="medium" className="px-4">
        {/* ── Title ─────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <AccentTitle title="SẢN PHẨM & DỊCH VỤ" />
        </div>
        {/* ── Grid Cards: Row 1 — Gap 16px (Figma: 16px) ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Card 1: Tư vấn số */}
          <ServiceCard
            className="bg-brand-navy text-white hover:shadow-xl"
            title="Tư vấn số"
            badge="HỆ SINH THÁI TƯ VẤN SỐ"
            subtitle="Cung cấp dịch vụ Tư vấn đầu tư chứng khoán"
            description="Hệ sinh thái Tư vấn số được phát triển bởi Công ty cổ phần Chứng khoán HVS Việt Nam với mục đích cung cấp đầy đủ tiện ích cho Khách hàng."
            secondaryBtnClassName="bg-white/[0.08] text-white hover:text-white hover:bg-white/20"
            imageSrc={mockTuVanSo}
            imageAlt="Tư vấn số"
          />

          {/* Card 2: Đào tạo */}
          <ServiceCard
            className="bg-white text-brand-navy border border-slate-100/80 shadow-sm hover:shadow-md"
            title="Đào tạo"
            badge="TÀI CHÍNH SỐ"
            subtitle="Nền tảng hỗ trợ người dùng trong hành trình đầu tư"
            description="Được phát triển bởi Công ty cổ phần Chứng khoán HVS Việt Nam nhằm hỗ trợ nhà đầu tư trong suốt quá trình tham gia thị trường chứng khoán, từ học kiến thức, theo dõi thông tin đến quản lý và ra quyết định đầu tư."
            secondaryBtnClassName="bg-brand-navy text-white hover:text-white hover:bg-brand-navy/90"
            imageSrc={mockDaoTao}
            imageAlt="Đào tạo tài chính số"
          />
        </div>
        {/* ── Card 3: Ủy thác quản lý tài sản — Height 415px ──────────────── */}
        <div className="bg-brand-navy text-white rounded-2xl p-7 min-h-[415px] hover:shadow-xl transition-all text-left flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <AccentTitle
                title="ỦY THÁC TRỌN NIỀM TIN CÙNG HVS - ỦY THÁC QUẢN LÝ TÀI SẢN"
                titleColorClass="text-white"
                titleClassName="text-2xl leading-8"
              />

              <div className="space-y-2">
                <p className="font-poppins font-bold text-sm text-brand-gold">
                  Dịch vụ đa dạng để tối ưu hóa danh mục đầu tư của bạn
                </p>
                <p className="font-poppins font-normal text-sm leading-6 text-slate-300">
                  HVS – ỦY THÁC QUẢN LÝ TÀI SẢN là nền tảng phục vụ nhu cầu giao
                  dịch cổ phiếu với các thao tác đơn giản
                </p>
              </div>

              {/* CTAs stacked vertically as specified in Figma node bounds */}
              <div className="flex flex-col gap-4 w-full">
                <Button
                  variant="text"
                  className="w-full h-[49px] bg-brand-gold text-[#111111] hover:text-[#111111] font-poppins font-semibold text-md py-3 rounded-lg hover:brightness-110 hover:bg-brand-gold active:scale-95 transition-all text-center border-none outline-none cursor-pointer"
                >
                  Trải nghiệm ngay
                </Button>
                <Button
                  variant="text"
                  className="w-full h-[49px] bg-white/[0.08] text-white hover:text-white hover:bg-white/20 font-poppins font-semibold text-md py-3 rounded-lg active:scale-95 transition-all text-center border-none outline-none cursor-pointer"
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>

            {/* Right Image/Mockup — Overlapping 3D layout matching Figma */}
            <div className="lg:col-span-6 relative w-full max-w-[562px] aspect-[562/359] flex-shrink-0">
              {/* Background Box (Main Container): w 502, h 310, x 0, y 49 */}
              <div className="absolute left-0 top-[13.65%] w-[89.32%] h-[86.35%] rounded-2xl bg-[#3b496c]/40 border border-[#3b496c]/20" />

              {/* Image Box (image 14): w 538, h 339, x 24, y 0 */}
              <div className="absolute left-[4.27%] top-0 w-[95.73%] h-[94.43%] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={mockNews1}
                  alt="Ủy thác quản lý tài sản"
                  fill
                  sizes="(max-width: 1024px) 100vw, 538px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductServiceSection;
