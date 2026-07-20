import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { IGlobalSetting } from "@/types/cms";
import { TikTokIcon } from "@/components/icons";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import logoImg from "@/lib/assets/images/logo.webp";
import footerMap from "@/lib/assets/mock-images/footer/footer_map.webp";
import footerCert1 from "@/lib/assets/mock-images/footer/footer_cert1.webp";
import footerCert2 from "@/lib/assets/mock-images/footer/footer_cert2.webp";
import footerBg from "@/lib/assets/mock-images/footer/footer_bg.svg";

interface FooterProps {
  globalSetting?: IGlobalSetting | null;
}

export const Footer: React.FC<FooterProps> = async ({ globalSetting }) => {
  const t = await getTranslations("Footer");

  const slogan =
    globalSetting?.slogan || "LÀM ÍT HƠN AN TOÀN HƠN LỢI NHUẬN NHIỀU HƠN";
  const address =
    globalSetting?.address ||
    "Tầng 4, Trung tâm Thương mại Dịch vụ Cống Vị, số 2 Liễu Giai, Phường Ngọc Hà, TP Hà Nội.";
  const phone = globalSetting?.hotline || "(+84-24) 38869999";
  const fax = globalSetting?.fax || "(+84-24) 36888886";
  const email = globalSetting?.email || "info@hvsvn.com";
  const workingTime =
    globalSetting?.workingTime || "08:00 – 17:00 (Thứ 2 – Thứ 6)";

  const facebookUrl =
    globalSetting?.socialMedia?.find((s) => s.socialNetwork === "Facebook")
      ?.description || "#";
  const instagramUrl =
    globalSetting?.socialMedia?.find((s) => s.socialNetwork === "Instagram")
      ?.description || "#";
  const tiktokUrl =
    globalSetting?.socialMedia?.find((s) => s.socialNetwork === "TikTok")
      ?.description || "#";
  const youtubeUrl =
    globalSetting?.socialMedia?.find((s) => s.socialNetwork === "Youtube")
      ?.description || "#";

  return (
    <footer className="w-full bg-navy-dark text-white pt-[20px] pb-6 relative overflow-hidden select-none">
      {/* Background Image from Figma */}
      <Image
        src={footerBg}
        alt="Footer Background"
        fill
        className="object-cover -z-10 pointer-events-none"
        priority
      />
      <div className="max-w-[1200px] w-full px-4 md:px-8 relative z-10 mx-auto">
        {/* ─── ROW 1: TOP BAR ─── */}
        <div className="flex flex-col xl-footer:flex-row justify-between items-center gap-6 pb-5 border-b border-white/20">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center gap-4 text-center xl-footer:flex-row xl-footer:text-left xl-footer:items-center">
            <div className="relative w-[87px] h-[37px] flex-shrink-0">
              <Image
                src={logoImg}
                alt="HVS Logo"
                fill
                sizes="87px"
                className="object-contain"
              />
            </div>
            <span className="text-white font-medium text-xs sm:text-sm xl-footer:text-[16px] leading-[24px] tracking-[0.15px] font-poppins uppercase text-center xl-footer:text-left">
              {slogan}
            </span>
          </div>

          <div className="flex items-center gap-[12px]">
            <span className="text-white font-medium text-sm md:text-base font-poppins">
              {t("followUs")}
            </span>
            <div className="flex items-center gap-[16px]">
              <a
                href={facebookUrl}
                className="text-white hover:text-brand-gold transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="size-[20px]" />
              </a>
              <a
                href={instagramUrl}
                className="text-white hover:text-brand-gold transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="size-[20px]" />
              </a>
              <a
                href={tiktokUrl}
                className="text-white hover:text-brand-gold transition-colors"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTokIcon className="size-[20px] fill-current [&>path]:fill-current" />
              </a>
              <a
                href={youtubeUrl}
                className="text-white hover:text-brand-gold transition-colors"
                aria-label="Youtube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="size-[20px]" />
              </a>
            </div>
          </div>
        </div>

        {/* ─── ROW 2: MIDDLE SECTION ─── */}
        <div className="grid grid-cols-1 xl-footer:grid-cols-12 gap-8 py-8 border-b border-white/20">
          {/* Column 1: Về chúng tôi */}
          <div className="xl-footer:col-span-4 flex flex-col items-center xl-footer:items-start text-center xl-footer:text-left space-y-4">
            <div className="relative pb-2 inline-block">
              <h3 className="text-base xl-footer:text-[17px] font-semibold font-poppins text-white uppercase leading-[25px]">
                {t("aboutUs")}
              </h3>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 xl-footer:left-0 xl-footer:translate-x-0 w-[68px] h-[4px] bg-brand-orange rounded-sm" />
            </div>

            <ul className="space-y-3 font-poppins text-sm md:text-base text-white">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-brand-gold transition-colors"
                >
                  {t("introduce")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-gold transition-colors"
                >
                  {t("newsHvs")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-gold transition-colors"
                >
                  {t("shareholder")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Khác */}
          <div className="xl-footer:col-span-4 flex flex-col items-center xl-footer:items-start text-center xl-footer:text-left xl-footer:pt-[33px]">
            <ul className="space-y-3 font-poppins text-sm md:text-base text-white">
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-gold transition-colors"
                >
                  {t("career")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-gold transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-gold transition-colors"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Map placeholder */}
          <div className="xl-footer:col-span-4 flex justify-center xl-footer:justify-end items-start">
            <div className="relative w-full max-w-[357px] aspect-[357/157] rounded-2xl overflow-hidden border border-brand-orange/30 shadow-md">
              <Image
                src={footerMap}
                alt="HVS Location Map"
                fill
                sizes="(max-width: 768px) 100vw, 357px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ─── ROW 3: BOTTOM SECTION ─── */}
        <div className="flex flex-col xl-footer:flex-row justify-between items-center gap-6 py-6 text-center xl-footer:text-left">
          {/* Address Details */}
          <div className="space-y-1.5 font-poppins text-xs sm:text-sm text-white max-w-none xl-footer:max-w-[850px] leading-relaxed">
            <p>
              {t("headquarters")}: {address}
            </p>
            <p>
              {t("phone")}: {phone}
            </p>
            <p>
              {t("fax")}: {fax}
            </p>
            <p>
              {t("email")}: {email}
            </p>
            <p>
              {t("workingTime")}: {workingTime}
            </p>
          </div>

          {/* Certifications Badges */}
          <div className="flex items-center justify-center xl-footer:justify-start gap-4">
            <div className="relative w-[156px] h-[56px] bg-white rounded-[12px] overflow-hidden flex items-center justify-center p-1 shadow-sm">
              <Image
                src={footerCert1}
                alt="Bộ Công Thương Đăng Ký"
                fill
                sizes="156px"
                className="object-contain p-1"
              />
            </div>
            <div className="relative w-[69px] h-[56px] overflow-hidden flex items-center justify-center">
              <Image
                src={footerCert2}
                alt="Certification badge 2"
                fill
                sizes="69px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
