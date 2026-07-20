"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui";
import mockAppMockup from "@/lib/assets/mock-images/home/app-download/app_mockup.webp";
import mockAppQr from "@/lib/assets/mock-images/home/app-download/app_qr.webp";
import mockAppLogo from "@/lib/assets/images/logo.webp";

export const AppDownloadSection: React.FC = () => {
  return (
    <section className="w-full bg-[#ffffff] pt-4 relative overflow-hidden flex flex-col justify-between">
      <Container size="xl" className="max-w-[1200px] px-4 md:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mockup Illustration */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-[600/724]">
              <Image
                src={mockAppMockup}
                alt="HVS Trading Mobile App Mockup"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column: Content and Download Badges */}
          <div className="lg:col-span-6 flex flex-col text-left space-y-6 lg:pl-6 py-6">
            {/* HVS App Logo */}
            <div className="relative w-[180px] md:w-[226px] h-[76px] md:h-[96px]">
              <Image
                src={mockAppLogo}
                alt="HVS logo"
                fill
                sizes="226px"
                className="object-contain object-left"
              />
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h3 className="text-[17px] font-semibold font-poppins text-[#0b1237] leading-[25px]">
                Đầu Tư Tinh Gọn - Thịnh Vượng Vững Chắc
              </h3>
              <p className="text-[14px] font-normal font-poppins text-[#0b1237] leading-[22px] max-w-[469px]">
                Cài đặt ứng dụng HVS Trading trên điện thoại để tham gia giao
                dịch chứng khoán mọi lúc mọi nơi với ứng dụng giao dịch mạnh mẽ.
                Mở tài khoản miễn phí của bạn ngay hôm nay!
              </p>
            </div>

            {/* Subtitle */}
            <div className="pt-2">
              <h4 className="text-[24px] font-bold font-poppins text-[#0b1237] leading-[32px] tracking-wider uppercase">
                TẢI APP NGAY TẠI:
              </h4>
            </div>

            {/* QR Code and App Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              {/* QR Code */}
              <div className="relative w-[160px] h-[160px] bg-white rounded-lg shadow-md overflow-hidden border border-slate-100 flex-shrink-0">
                <Image
                  src={mockAppQr}
                  alt="App QR Code"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              {/* Badges Column */}
              <div className="flex flex-col gap-[16px] w-full sm:w-[232px]">
                {/* AppStore Button */}
                <a
                  href="#"
                  className="w-full h-[60px] bg-[#121212] hover:bg-[#1f1f1f] border border-white/10 rounded-lg flex items-center justify-center transition-colors px-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-left w-full max-w-[160px]">
                    {/* Apple Icon */}
                    <svg
                      viewBox="0 0 384 512"
                      className="w-[24px] h-[28px] fill-white flex-shrink-0"
                    >
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 47.5-24.4 76.5 26.9 2.4 51.2-16.5 68.3-38.9z" />
                    </svg>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-poppins leading-none">
                        Download on the
                      </span>
                      <span className="block text-[18px] text-white font-semibold font-poppins leading-tight mt-0.5">
                        App Store
                      </span>
                    </div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="#"
                  className="w-full h-[60px] bg-[#121212] hover:bg-[#1f1f1f] border border-white/10 rounded-lg flex items-center justify-center transition-colors px-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-left w-full max-w-[160px]">
                    {/* Google Play Icon */}
                    <svg
                      viewBox="0 0 512 512"
                      className="w-[24px] h-[26px] fill-white flex-shrink-0"
                    >
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.4-60.1-60.1 60.1-60.1 58 33.4c13.1 7.6 21.8 19.7 21.8 33.3s-8.7 25.7-21.8 33.3zM104.6 499l220.7-126.7-60.1-60.1L104.6 499z" />
                    </svg>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-poppins leading-none">
                        GET IT ON
                      </span>
                      <span className="block text-[18px] text-white font-semibold font-poppins leading-tight mt-0.5">
                        Google Play
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
