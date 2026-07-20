import React from "react";
import { useTranslations } from "next-intl";
import MarginBanner from "../components/MarginBanner";
import MarginExplanation from "../components/MarginExplanation";
import MarginSummary from "../components/MarginSummary";

// Import images
import bannerBg from "@/lib/assets/images/webp/margin-trading/banner-section.webp";
import bannerHero from "@/lib/assets/images/webp/margin-trading/sold-banner.webp";
import explanationHero from "@/lib/assets/images/webp/margin-trading/sold-section1.webp";
import summaryHero from "@/lib/assets/images/webp/margin-trading/sold-section2.webp";
import { Routes } from "@/lib/enum/routes";

export default function MarginTradingModule() {
  const t = useTranslations("AdvancePayment"); // Use AdvancePayment translations

  const summaryItems = [
    t("summaryItem1"),
    t("summaryItem2"),
    t("summaryItem3"),
  ];

  return (
    <div className="w-full min-h-screen pb-16 md:pb-24">
      <MarginBanner
        title={t("bannerTitle")}
        description={t("bannerDesc")}
        buttonText1={t("btnDetail")}
        buttonText2={t("btnFee")}
        buttonLink1={Routes.TUTORIAL_ADVANCE_PAYMENT}
        buttonLink2={Routes.FEE_ADVANCE_PAYMENT}
        bgImage={bannerBg}
        heroImage={bannerHero}
      />
      <MarginExplanation
        badgeText={t("badgeService")}
        title={t("whatIsTitle")}
        desc1={t.rich("whatIsDesc1", {
          bold: (chunks) => (
            <strong className="font-bold dark:text-white">{chunks}</strong>
          ),
        })}
        desc2={t.rich("whatIsDesc2", {
          bold: (chunks) => (
            <strong className="font-bold dark:text-white">{chunks}</strong>
          ),
        })}
        image={explanationHero}
      />
      <MarginSummary
        title={t("summaryTitle")}
        subtitle={t("summarySubtitle")}
        summaryItems={summaryItems}
        image={summaryHero}
      />
    </div>
  );
}
