"use client";

import { useLocale } from "next-intl";
import { ArrowDownLineIcon, RemixSearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/lib/enum/routes";
import { IGlobalSetting, IMenuItem } from "@/types/cms";
import Link from "next/link";
import Image from "next/image";
import HeaderScrollWrapper from "./HeaderScrollWrapper";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MegaMenu } from "./MegaMenu";
import logo from "@/lib/assets/images/logo.webp";

interface HeaderProps {
  menus?: IMenuItem[];
  globalSetting?: IGlobalSetting | null;
}

export const Header = ({ menus }: HeaderProps) => {
  const locale = useLocale();
  const isEn = locale === "en";

  // Dynamic Top Nav Items from CMS
  const topNavItems = (() => {
    if (!menus || menus.length === 0) {
      return [
        {
          label: isEn ? "Services" : "Dịch vụ",
          href: isEn ? "/en/services" : "/dich-vu",
          hasDropdown: true,
        },
        {
          label: isEn ? "Guides" : "Hướng dẫn",
          href: isEn ? "/en/guides" : "/huong-dan",
          hasDropdown: true,
        },
        {
          label: isEn ? "Reports" : "Báo cáo phân tích",
          href: isEn ? "/en/reports" : "/bao-cao",
          hasDropdown: true,
        },
        {
          label: isEn ? "Knowledge" : "Kiến thức",
          href: isEn ? "/en/knowledge" : "/kien-thuc",
          hasDropdown: true,
        },
        {
          label: isEn ? "Ecosystem" : "Hệ sinh thái",
          href: isEn ? "/en/ecosystem" : "/he-sinh-thai",
          hasDropdown: true,
        },
        {
          label: isEn ? "Wealth" : "Ủy thác đầu tư",
          href: isEn ? "/en/wealth" : "/uy-thac",
          hasDropdown: false,
        },
      ];
    }
    return menus.map((item) => ({
      label: isEn && item.title_en ? item.title_en : item.title,
      href: item.link,
      hasDropdown: item.children && item.children.length > 0,
    }));
  })();

  // Bottom Nav Items based on Figma Node 101:18316
  const bottomNavItems = [
    {
      label: isEn ? "Price Board" : "Bảng giá",
      href: isEn ? "/en/price-board" : "/bang-gia",
    },
    {
      label: isEn ? "Fee Schedule" : "Biểu phí",
      href: isEn ? "/en/fee-schedule" : "/bieu-fee",
    },
    {
      label: isEn ? "FAQ" : "Câu hỏi thường gặp",
      href: isEn ? "/en/faq" : "/faq",
    },
    {
      label: isEn ? "Stock Info" : "Thông tin cổ phiếu",
      href: isEn ? "/en/stock-info" : "/thong-tin-co-phieu",
    },
  ];

  return (
    <>
      <HeaderScrollWrapper>
        <div className="w-full flex flex-col select-none">
          {/* ─── ROW 1: PRIMARY HEADER (WHITE BACKGROUND - Node 101:18315) ─── */}
          <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-[1920px] mx-auto px-6 h-20 flex items-center justify-between">
              {/* Left Group: Logo + Top Menu (gap-4 is 16px) */}
              <div className="flex items-center gap-4">
                {/* Logo */}
                <Link href={Routes.HOME} className="flex items-center shrink-0">
                  <Image
                    src={logo}
                    alt="HVS Logo"
                    width={112}
                    height={55}
                    priority
                    className="object-contain"
                  />
                </Link>

                {/* Desktop Top Menu (gap-2 is 8px) */}
                <nav className="hidden lg:flex items-center gap-2">
                  {topNavItems.map((item, idx) => (
                    <div key={idx} className="relative group py-2">
                      <Link
                        href={item.href}
                        className="flex items-center gap-1 px-2 py-2 text-[17px] font-bold text-[#09121f] dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-all duration-200 cursor-pointer uppercase tracking-wide whitespace-nowrap"
                      >
                        {item.label}
                        {item.hasDropdown && (
                          <ArrowDownLineIcon className="w-5 h-5 text-[#121212] dark:text-slate-400 opacity-80 transition-transform duration-250 group-hover:rotate-180" />
                        )}
                      </Link>
                      {item.hasDropdown && (
                        <MegaMenu
                          label={item.label}
                          menuData={menus?.find(
                            (m) => (isEn ? m.title_en : m.title) === item.label,
                          )}
                        />
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Right Side Actions - Spacing gap-3 matching Figma 12px margin */}
              <div className="flex items-center gap-3">
                {/* Mở tài khoản CTA */}
                <Button
                  asChild
                  variant="outline"
                  className="hidden sm:inline-flex border-[#0b1237] text-[#0b1237] hover:bg-[#0b1237] hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white font-bold rounded-lg px-[16px] py-[9px] w-[140px] h-[40px] transition-all cursor-pointer text-sm justify-center items-center whitespace-nowrap"
                >
                  <Link href={isEn ? "/en/register" : "/register"}>
                    {isEn ? "Open Account" : "Mở tài khoản"}
                  </Link>
                </Button>

                <LocaleSwitcher />

                {/* Mode toggle */}
                {/* <div className="h-10 aspect-square flex items-center justify-center shrink-0">
                  <ModeToggle />
                </div> */}
              </div>
            </div>
          </div>

          {/* ─── ROW 2: SECONDARY NAV (DARK NAVY BACKGROUND - Node 101:18316) ─── */}
          <div className="w-full bg-[#1b2451] text-white hidden lg:block transition-colors duration-300">
            <div className="max-w-[1920px] mx-auto px-6 h-[52px] flex items-center justify-between">
              {/* Secondary Links */}
              <div className="flex items-center gap-8">
                {bottomNavItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="text-[16px] font-medium text-white hover:text-orange-400 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Search Trigger */}
              <button className="flex items-center gap-2 text-white hover:text-orange-400 text-sm font-medium transition-colors duration-200 cursor-pointer">
                <RemixSearchIcon className="size-5" />
                <span className="text-[14px]">
                  {isEn ? "Search" : "Tìm kiếm"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </HeaderScrollWrapper>

      {/* Spacing for fixed header (Row 1 is 80px, Row 2 is 52px = 132px on desktop) */}
      <div className="h-20 lg:h-33 w-full" />
    </>
  );
};
