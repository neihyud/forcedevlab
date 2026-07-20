"use client";

import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ArrowDownLineIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const LocaleSwitcher = () => {
  const [langOpen, setLangOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="pure"
        size="pure"
        onClick={() => setLangOpen(!langOpen)}
        className="flex items-center gap-1.5 h-10 px-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all text-[#09121f] dark:text-white font-medium text-[16px] cursor-pointer"
      >
        <span>{locale === "vi" ? "🇻🇳" : "🇺🇸"}</span>
        <span className="uppercase">{locale}</span>
        <ArrowDownLineIcon className="w-5 h-5 text-[#121212] dark:text-white" />
      </Button>
      {langOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setLangOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 dark:border-slate-750 p-1 z-50">
            <Button
              variant="pure"
              size="pure"
              onClick={() => handleLanguageChange("vi")}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 text-left",
                locale === "vi"
                  ? "text-primary bg-blue-50/50 dark:bg-slate-700/50"
                  : "text-slate-700 dark:text-slate-200",
              )}
            >
              <span>🇻🇳</span> Tiếng Việt
            </Button>
            <Button
              variant="pure"
              size="pure"
              onClick={() => handleLanguageChange("en")}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 text-left",
                locale === "en"
                  ? "text-primary bg-blue-50/50 dark:bg-slate-700/50"
                  : "text-slate-700 dark:text-slate-200",
              )}
            >
              <span>🇺🇸</span> English
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
