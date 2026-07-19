import { ModeToggle } from "@/components/common/ModeToggle";
import { LangToggle } from "@/components/common/LangToggle";
import { BellIcon, PhoneIcon } from "@/components/icons";
import { MENU_ITEMS } from "@/components/layouts/contants";
import { NavLink } from "@/components/layouts/Header/NavLink";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/lib/enum/routes";
import { getStrapiMediaUrl } from "@/lib/helpers/strapi";
import { IGlobalSetting, IMenuItem } from "@/types/cms";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import HeaderScrollWrapper from "./HeaderScrollWrapper";
import { MobileMenu } from "./MobileMenu";

import { useLocale } from "next-intl";

interface HeaderProps {
  menus?: IMenuItem[];
  globalSetting?: IGlobalSetting | null;
}

export const CmsHeader = ({ menus, globalSetting }: HeaderProps) => {
  const locale = useLocale();
  const hotline = globalSetting?.hotline || "0451210238";
  const logoUrl = globalSetting?.logo
    ? getStrapiMediaUrl(globalSetting.logo.url)
    : "/logo_header_v3.png";

  const menuItems = (() => {
    if (!menus || menus.length === 0) {
      return MENU_ITEMS;
    }
    return menus
      .filter((item) => item.active === "ACTIVE")
      .map((item) => ({
        key: item.link,
        label: locale === "en" && item.title_en ? item.title_en : item.title,
        children:
          item.child
            ?.filter((subItem) => subItem.active === "ACTIVE")
            .map((subItem) => ({
              key: subItem.link,
              label:
                locale === "en" && subItem.title_en
                  ? subItem.title_en
                  : subItem.title,
            })) || [],
      }));
  })();

  return (
    <>
      {/* Header */}
      <HeaderScrollWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Premium Design */}
            <div className="flex items-center gap-3 shrink-0 group">
              <Link
                href={Routes.HOME}
                aria-label="Trở về trang chủ"
                className="flex items-center gap-3 shrink-0 group"
              >
                <div className="relative transition-all duration-300 group-hover:scale-110">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-50 transition-opacity duration-300 group-hover:opacity-0" />
                  <img
                    src={logoUrl}
                    alt={globalSetting?.siteName || "Logo"}
                    className="relative h-18 object-contain rounded-full bg-white/10 p-1"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => {
                const hasSubTabs = item.children && item.children.length > 0;

                if (hasSubTabs) {
                  return (
                    <div key={item.key} className="relative group">
                      <NavLink href={`${item.key}`}>
                        <span className="flex items-center gap-1">
                          {item.label}
                          <ChevronDown
                            size={14}
                            className="opacity-60 transition-transform duration-300 group-hover:rotate-180"
                          />
                        </span>
                      </NavLink>

                      {/* CSS hover-based Dropdown */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none scale-95 origin-top transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 z-[1000]">
                        <div className="w-max rounded-xl bg-white dark:bg-neutral-900 shadow-2xl border border-blue-100 dark:border-neutral-800 p-2">
                          <div className="py-1 min-w-max">
                            {item.children?.map((subTab) => (
                              <Link
                                key={subTab.key}
                                href={`${subTab.key}`}
                                className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 dark:hover:from-neutral-800 dark:hover:to-neutral-700 dark:hover:text-white transition-all duration-200 whitespace-nowrap rounded-lg hover:translate-x-1"
                              >
                                {subTab.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink key={item.key} href={`${item.key}`}>
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Actions - Premium Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 group">
                <Button
                  asChild
                  className="rounded-lg hover:scale-105 active:scale-95 transition-transform duration-300"
                >
                  <a href={`tel:${hotline.replace(/\s+/g, "")}`}>
                    <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <PhoneIcon className="[&_path]:stroke-white size-5" />
                    </span>
                    <span>{hotline}</span>
                  </a>
                </Button>
              </div>

              <div className="group flex-1">
                <Link
                  href={Routes.BOOKING}
                  className="w-full hidden lg:flex flex-1 gap-2 items-center font-semibold hover:shadow-2xl transition-all duration-300 active:scale-95 hover:scale-105 px-4 py-1.5 text-sm sm:text-base rounded-lg group bg-gradient-to-r from-orange-500 to-red-500 text-white"
                >
                  <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <BellIcon className="size-5" />
                  </span>
                  <span>Book now</span>
                </Link>
              </div>

              <div className="h-10 aspect-square flex items-center justify-center shrink-0">
                <LangToggle />
              </div>

              <div className="h-10 aspect-square flex items-center justify-center shrink-0">
                <ModeToggle />
              </div>

              <MobileMenu menuItems={menuItems} hotline={hotline} />
            </div>
          </div>
        </div>
      </HeaderScrollWrapper>

      {/* Spacing for fixed header */}
      <div className="h-20" />
    </>
  );
};
