"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRightIcon } from "@/components/icons";
import { IMenuItem } from "@/types/cms";
import { Button } from "@/components/ui/Button";

interface MegaMenuProps {
  label: string;
  onClose?: () => void;
  menuData?: IMenuItem;
}

export const MegaMenu = ({ label, onClose, menuData }: MegaMenuProps) => {
  const locale = useLocale();
  const isEn = locale === "en";
  const [activeIdx, setActiveIdx] = useState(0);

  // items = menu level 2
  const items = menuData?.children || [];

  if (items.length === 0) return null;

  const activeItem = items[activeIdx] || items[0];

  // level 3 sub-items
  const subItems = activeItem?.children || [];
  const hasSubItems = subItems.length > 0;

  // Tính top offset để right panel align với active item (giống UI cũ)
  // pt-5(20) + p-[12px](12) + header height(~46px) + activeIdx * item height(~41px)
  const subMenuTopOffset = 16 + 46 + activeIdx * 41;

  return (
    <div className="absolute top-full left-0 pt-5 opacity-0 pointer-events-none scale-95 origin-top transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 z-50">
      {/* Wrapper relative để right panel có thể absolute bên trong */}
      <div className="relative">
        {/* Left Column Panel — z-10 để đứng TRÊN right panel */}
        <div className="w-[384px] bg-white dark:bg-slate-800 rounded-[4px] shadow-2xl border border-slate-100 dark:border-slate-700 p-[12px] flex flex-col relative z-10">
          <div className="pb-3 mb-2 border-b border-[#cacaca] dark:border-slate-700">
            <span className="text-[17px] font-semibold text-[#09121f] dark:text-slate-200 uppercase tracking-wide">
              {label}
            </span>
          </div>

          <div
            className="flex flex-col gap-1"
            role="tablist"
            aria-label={label}
          >
            {items.map((item, idx) => {
              const isActive = idx === activeIdx;
              const itemLabel =
                isEn && item.title_en ? item.title_en : item.title;
              const itemHasSub = item.children && item.children.length > 0;

              return (
                <Button
                  key={idx}
                  variant="pure"
                  size="pure"
                  role="tab"
                  aria-selected={isActive}
                  id={`megamenu-tab-${idx}`}
                  aria-controls={`megamenu-panel-${idx}`}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onFocus={() => setActiveIdx(idx)}
                  onClick={() => {
                    if (!itemHasSub && onClose) {
                      window.location.href = item.link;
                      onClose();
                    }
                  }}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-[background-color,color] duration-200 cursor-pointer w-full text-left ${
                    isActive
                      ? "bg-[#1f5d97]/8 text-[#1f5d97]"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-[#09121f] dark:text-slate-200"
                  }`}
                >
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[17px] font-semibold transition-colors duration-200 ${isActive ? "text-[#1f5d97]" : "text-[#09121f] dark:text-slate-200"}`}
                      >
                        {itemLabel}
                      </span>
                      {itemHasSub && (
                        <ArrowRightIcon
                          className={`w-5 h-5 transition-[transform,opacity] duration-200 shrink-0 ${
                            isActive
                              ? "opacity-100 translate-x-0.5 text-[#1f5d97]"
                              : "opacity-40"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Right Column Panel — absolute z-0 nằm DƯỚi left panel, top offset align với active item */}
        {hasSubItems && (
          <div
            id={`megamenu-panel-${activeIdx}`}
            role="tabpanel"
            aria-labelledby={`megamenu-tab-${activeIdx}`}
            className="absolute w-[280px] bg-white dark:bg-slate-800 rounded-[4px] shadow-2xl border border-slate-100 dark:border-slate-700 p-[12px] flex flex-col transition-all duration-200 ease-out z-0"
            style={{
              left: "384px",
              top: `${subMenuTopOffset}px`,
            }}
          >
            <div className="flex flex-col gap-1 rounded-2xl overflow-hidden">
              {subItems.map((sub, sIdx) => {
                const subLabel =
                  isEn && sub.title_en ? sub.title_en : sub.title;

                return (
                  <Link
                    key={sIdx}
                    href={sub.link}
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-[#1f5d97]/10 group/sub transition-all duration-200 text-left cursor-pointer block"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[17px] font-semibold text-[#1b2451] dark:text-slate-200 group-hover/sub:text-[#1f5d97] truncate">
                        {subLabel}
                      </div>
                      <ArrowRightIcon className="w-5 h-5 opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 text-[#1f5d97] transition-all duration-200 shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
