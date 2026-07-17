"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MappedMenuItem {
  key: string;
  label: string;
  children?: { key: string; label: string }[];
}

// Mobile Menu Item Component
export const MobileMenuItem = ({
  item,
  onClose,
}: {
  item: MappedMenuItem;
  onClose: () => void;
}) => {
  const hasSubTabs = item.children && item.children.length > 0;
  const [openSubmenu, setOpenSubmenu] = useState(false);

  return (
    <div key={item.key} className="space-y-0">
      {hasSubTabs ? (
        <button
          onClick={() => setOpenSubmenu(!openSubmenu)}
          className="w-full flex items-center justify-between px-4 py-3.5 text-white font-semibold hover:bg-white/15 rounded-lg transition-all duration-200 group"
        >
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            {item.label}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              openSubmenu ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <Link
          href={`${item.key}`}
          onClick={onClose}
          className="block px-4 py-3.5 text-white font-semibold hover:bg-white/15 hover:translate-x-1 rounded-lg transition-all duration-200"
        >
          {item.label}
        </Link>
      )}

      {hasSubTabs && openSubmenu && (
        <div className="pl-4 space-y-1 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {item.children?.map((subTab) => (
            <Link
              key={subTab.key}
              href={`${subTab.key}`}
              onClick={onClose}
              className="block px-4 py-2.5 text-blue-100 font-medium hover:bg-white/15 hover:text-white hover:translate-x-1 rounded-lg transition-all duration-200 text-sm"
            >
              {subTab.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
