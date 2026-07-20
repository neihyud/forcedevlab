import React from "react";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import Image from "@/components/ui/Image";
import marginSection1 from "@/lib/assets/images/webp/margin-trading/margin-section-1.webp";

export default function MarginExplanation() {
  const t = useTranslations("MarginTrading");

  return (
    <div className="w-full bg-white dark:bg-gray-800 py-12 md:py-17">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Image Placeholder (Fallback BG) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[1.6/1] w-full rounded-3xl overflow-hidden   flex flex-col items-center justify-center p-6 text-center group">
              <Image
                src={marginSection1}
                alt="Section 1 Margin Trading Background"
                fill
                priority
                quality={100}
                className="object-cover  select-none pointer-events-none "
              />
            </div>
          </div>

          {/* Right Column: Content Description */}
          <div className="lg:col-span-6 text-left space-y-4 order-1 lg:order-2">
            <span className="inline-flex items-center bg-[#F5A624] rounded-full py-1.5 px-4 font-bold text-xs text-white uppercase tracking-widest">
              {t("badgeService")}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-blue-24 dark:text-white leading-tight uppercase">
              {t("whatIsTitle")}
            </h2>
            <div className="space-y-4 mt-8 text-sm md:text-base text-[#404040] dark:text-gray-300 leading-relaxed ">
              <p>
                {t.rich("whatIsDesc1", {
                  bold: (chunks) => (
                    <strong className="font-bold  dark:text-white">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
              <p>
                {t.rich("whatIsDesc2", {
                  bold: (chunks) => (
                    <strong className="font-bold  dark:text-white">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
