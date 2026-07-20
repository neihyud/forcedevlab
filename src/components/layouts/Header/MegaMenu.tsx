"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRightIcon } from "@/components/icons";
import { getMenuDataMapByLocale } from "./menuData";
import { Button } from "@/components/ui/Button";

interface MegaMenuProps {
  label: string;
  onClose?: () => void;
}

export const MegaMenu = ({ label, onClose }: MegaMenuProps) => {
  const locale = useLocale();
  const t = useTranslations("MegaMenu");
  const { translatedMap } = getMenuDataMapByLocale(locale);
  const items = translatedMap[label] || [];
  const [activeIdx, setActiveIdx] = useState(0);

  if (items.length === 0) return null;

  const activeItem = items[activeIdx] || items[0];
  const subMenuTopOffset = 20 + 12 + 37 + activeIdx * 62;

  return (
    <div className="absolute top-full left-0 pt-5 opacity-0 pointer-events-none scale-95 origin-top transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 z-50">
      <div className="relative w-3xl min-h-82.25">
        {/* Left Column Panel */}
        <div className="w-[384px] bg-white dark:bg-slate-800 rounded-[4px] shadow-2xl border border-slate-100 dark:border-slate-700 p-[12px] flex flex-col relative z-10">
          <div className="pb-3 mb-2 border-b border-[#cacaca] dark:border-slate-700">
            <span className="text-[17px] font-semibold text-[#09121f] dark:text-slate-200 uppercase tracking-wide">
              {label}
            </span>
          </div>

          {/* Categories - Semantic Buttons for A11y */}
          <div
            className="flex flex-col gap-1"
            role="tablist"
            aria-label={label}
          >
            {items.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeIdx;
              const itemLabel = t(`${item.id}.label`);
              const itemDesc = t(`${item.id}.desc`);

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
                  className={`flex items-center gap-3 p-1 rounded-lg transition-[background-color,color] duration-200 cursor-pointer w-full text-left ${
                    isActive
                      ? "bg-[#1f5d97]/8 text-[#1f5d97]"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-[#09121f] dark:text-slate-200"
                  }`}
                >
                  {/* Icon Container */}
                  <div
                    className={`p-[6px] rounded-[4px] transition-colors duration-200 ${
                      isActive ? "bg-[#1f5d97]/8" : "bg-[#1f5d97]/5"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors duration-200 ${
                        isActive
                          ? "text-[#1f5d97]"
                          : "text-[#09121f] dark:text-slate-300"
                      }`}
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[17px] font-semibold transition-colors duration-200 ${
                          isActive
                            ? "text-[#1f5d97]"
                            : "text-[#09121f] dark:text-slate-200"
                        }`}
                      >
                        {itemLabel}
                      </span>
                      <ArrowRightIcon
                        className={`w-5 h-5 transition-[transform,opacity] duration-200 shrink-0 ${
                          isActive
                            ? "opacity-100 translate-x-0.5 text-[#1f5d97]"
                            : "opacity-0"
                        }`}
                      />
                    </div>
                    <div className="text-[12px] text-[#474747] dark:text-slate-400 truncate mt-0.5">
                      {itemDesc}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Right Column Panel */}
        <div
          id={`megamenu-panel-${activeIdx}`}
          role="tabpanel"
          aria-labelledby={`megamenu-tab-${activeIdx}`}
          className="absolute w-[384px] bg-white dark:bg-slate-800 rounded-[4px] shadow-2xl border border-slate-100 dark:border-slate-700 p-[12px] flex flex-col transition-all duration-250 ease-out z-0"
          style={{
            left: "384px",
            top: `${subMenuTopOffset}px`,
          }}
        >
          {/* Sub-items */}
          <div className="flex flex-col gap-1">
            {activeItem.subItems.map((sub, idx) => {
              const subLabel = t(`${sub.id}.label`);
              const subDesc = t(`${sub.id}.desc`);

              return (
                <Link
                  key={idx}
                  href={sub.href}
                  onClick={onClose}
                  className="p-1.5 rounded-xl hover:bg-[#1f5d97]/10 group/sub transition-all duration-200 text-left cursor-pointer block"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[17px] font-semibold text-[#1b2451] dark:text-slate-200 group-hover/sub:text-[#1f5d97] truncate">
                      {subLabel}
                    </div>
                    <ArrowRightIcon className="w-5 h-5 opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 text-[#1f5d97] transition-all duration-200 shrink-0" />
                  </div>
                  <div className="text-[12px] text-[#474747] dark:text-slate-400 group-hover/sub:text-slate-600 dark:group-hover/sub:text-slate-300 truncate mt-0.5">
                    {subDesc}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
