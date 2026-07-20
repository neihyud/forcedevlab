import React from "react";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import marginTradingRightSide from "@/lib/assets/images/webp/margin-trading/margin-section-2.webp";
import Image from "@/components/ui/Image";

export default function MarginSummary() {
  const t = useTranslations("MarginTrading");

  const summaryItems = [
    t("summaryItem1"),
    t("summaryItem2"),
    t("summaryItem3"),
    t("summaryItem4"),
    t("summaryItem5"),
  ];

  return (
    <div className="w-full ">
      <Container>
        <div
          className=" dark:bg-gray-800 rounded-3xl p-6 md:p-12 "
          style={{
            background:
              "linear-gradient(272.05deg, rgba(233, 238, 255, 0.6) 2.84%, rgba(15, 98, 254, 0.05) 22%, rgba(233, 238, 255, 0.6)100%)",
            boxShadow: "0px 2px 4px -2px #1118270F, 0px 4px 8px -2px #1118271A",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 ">
            {/* Left Column: Summary Lists */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-24 dark:text-white uppercase leading-tight">
                  {t("summaryTitle")}
                </h2>
                <p className="text-md md:text-base text-grey-25 ">
                  {t("summarySubtitle")}
                </p>
              </div>

              {/* List bars matching mockup style */}
              <div className="space-y-5">
                {summaryItems.map((text, i) => (
                  <div
                    key={i}
                    className="bg-white flex items-center px-6 dark:bg-gray-900 border border-[#E4E7EC] dark:border-gray-700 border-l-4 border-l-secondary rounded-lg  h-18 text-sm md:text-base font-semibold text-[#0D1B2E] dark:text-gray-200 hover:translate-x-1 transition-all duration-300"
                    style={{
                      boxShadow: "0px 2px 8px 0px #0000001F",
                    }}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Graphic Placeholder (Fallback BG) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[1/1.1] w-full rounded-3xl overflow-hidden bg-gradient-to-br flex flex-col items-center justify-center p-6 text-center shadow-lg group">
                <Image
                  src={marginTradingRightSide}
                  alt="Margin Trading Right Side"
                  fill
                  priority
                  quality={100}
                  className="object-cover  select-none pointer-events-none "
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
