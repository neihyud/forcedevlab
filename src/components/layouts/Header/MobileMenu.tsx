"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { MobileMenuItem } from "./MobileMenuItem";
import { PhoneIcon, BellIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { Routes } from "@/lib/enum/routes";
import { useRouter } from "next/navigation";

interface MappedMenuItem {
  key: string;
  label: string;
  children?: { key: string; label: string }[];
}

interface MobileMenuProps {
  menuItems: MappedMenuItem[];
  hotline: string;
}

export const MobileMenu = ({ menuItems, hotline }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button - Premium Style */}
      <button
        onClick={toggleMenu}
        className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-secondary hover:bg-secondary/20 transition-all duration-200 active:bg-secondary/30"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-300" />
        ) : (
          <Menu className="h-6 w-6 transition-transform duration-300" />
        )}
      </button>

      {/* Mobile Navigation - Premium Design */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/20 bg-gradient-to-b from-primary/98 to-primary/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 sm:px-6 py-6 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
            {menuItems.map((item) => (
              <MobileMenuItem key={item.key} item={item} onClose={closeMenu} />
            ))}

            {/* Mobile Action Buttons */}
            <div className="pt-6 border-t border-white/20 space-y-3 mt-4">
              <a href={`tel:${hotline.replace(/\s+/g, "")}`} className="block">
                <Button className="w-full flex gap-2 bg-white text-primary font-semibold hover:bg-blue-50 transition-all duration-200 py-3 rounded-lg shadow-md">
                  <PhoneIcon className="[&_path]:stroke-primary size-5" />
                  <span>{hotline}</span>
                </Button>
              </a>
              <Button
                onClick={() => {
                  router.push(Routes.BOOKING);
                  closeMenu();
                }}
                className="w-full flex gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg transition-all duration-200 py-3 rounded-lg"
              >
                <BellIcon className="size-5" />
                <span>Book now</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
