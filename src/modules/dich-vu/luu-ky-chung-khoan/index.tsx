import React from "react";
import { useTranslations } from "next-intl";
import MarginBanner from "../components/MarginBanner";
import MarginExplanation from "../components/MarginExplanation";
import MarginSummary from "../components/MarginSummary";

// Import images
import bannerBg from "@/lib/assets/images/webp/margin-trading/banner-section.webp";
import bannerHero from "@/lib/assets/images/webp/margin-trading/depository-banner.webp";
import explanationHero from "@/lib/assets/images/webp/margin-trading/depository-section1.webp";
import summaryHero from "@/lib/assets/images/webp/margin-trading/depository-section2.webp";
import { Routes } from "@/lib/enum/routes";

export default function SecuritiesDepositoryModule() {
  const t = useTranslations("SecuritiesDepository");

  const summaryGroups = [
    {
      title: t("bannerTitle"),
      items: [t("summaryItem1"), t("summaryItem2"), t("summaryItem3")],
    },
    {
      title: t("summaryTitle2"),
      items: [
        t("summary2Item1"),
        t("summary2Item2"),
        t("summary2Item3"),
        t("summary2Item4"),
        t("summary2Item5"),
        t("summary2Item6"),
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen pb-16 md:pb-24 ">
      <MarginBanner
        title={t("bannerTitle")}
        description={t("bannerDesc")}
        buttonText1={t("btnDetail")}
        buttonText2={t("btnFee")}
        buttonLink1={Routes.TUTORIAL_SECURITIES_DEPOSITORY}
        buttonLink2={Routes.FEE_SECURITIES_DEPOSITORY}
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
        image={explanationHero}
      />
      <MarginSummary
        title={t("summaryTitle")}
        subtitle={t("summarySubtitle")}
        summaryGroups={summaryGroups}
        image={summaryHero}
        variant="list"
      />
    </div>
  );
}
