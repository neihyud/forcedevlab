"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Globe } from "lucide-react";

export function LangToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ];

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group border border-secondary/60 hover:border-secondary/80"
        aria-label="Select language"
      >
        <div className="text-secondary flex items-center justify-center gap-0.5">
          <Globe size={18} />
          <span className="text-[10px] font-bold uppercase">{locale}</span>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-40 rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden z-[1000] backdrop-blur-sm"
          >
            <div className="p-1">
              {languages.map((lang, index) => {
                const isActive = locale === lang.code;

                return (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay when dropdown is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
