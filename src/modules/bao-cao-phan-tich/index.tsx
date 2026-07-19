"use client";

import { NewsCard } from "@/components/common/NewsCard";
import {
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  SearchIcon,
} from "@/components/icons";
import { Button } from "@/components/ui";
import { Container } from "@/components/ui/Container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import bannerReport from "@/lib/assets/images/webp/banner_report.webp";
import fallbackReport from "@/lib/assets/images/webp/fallback_report.webp";
import fallbackReportFuture from "@/lib/assets/images/webp/fallback_report_future.webp";
import { getStrapiImageUrl } from "@/lib/helpers/strapi";
import { ICategory, IGlobalSetting, IReportAnalyst } from "@/types/cms";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import ReportRegisterForm from "./ReportRegisterForm";

interface AnalysisReportModuleProps {
  globalSetting: IGlobalSetting | null;
  reports: IReportAnalyst[];
  categories?: ICategory[];
}

export default function AnalysisReportModule({
  reports = [],
  categories = [],
}: AnalysisReportModuleProps) {
  const t = useTranslations("ReportAnalytic");

  const [activeTab, setActiveTab] = useState(
    categories && categories.length > 0 && categories[0].slug
      ? categories[0].slug
      : "strategy",
  );

  // Tab definitions dynamically mapped from CMS category data
  const tabs =
    categories && categories.length > 0
      ? categories.map((cat) => ({
          id: cat.slug || "strategy",
          label: cat.title,
        }))
      : [
          { id: "strategy", label: t("tabStrategy") },
          { id: "macro", label: t("tabMacro") },
          { id: "business", label: t("tabBusiness") },
          { id: "commodity", label: t("tabCommodity") },
          { id: "market", label: t("tabMarket") },
          { id: "expert", label: t("tabExpert") },
        ];

  // Filter reports by active category tab
  const currentReports = reports.filter(
    (item) => item.category?.slug === activeTab,
  );

  // Identify featured report in active category (default to first item if none is explicitly featured)
  const featured =
    currentReports.find((item) => item.isFeatured) || currentReports[0];

  // Non-featured reports inside active category (max 3 items)
  const categoryReports = currentReports;

  return (
    <div className="w-full  dark:bg-gray-900 min-h-screen">
      {/* ── SECTION 1: Banner Header + Form ────────────────────────────────────── */}
      <div className="relative w-full py-12 md:py-20 text-white overflow-hidden shadow-md">
        {/* Background Image */}
        <Image
          src={bannerReport}
          alt="Banner Report Background"
          fill
          priority
          className="object-cover select-none pointer-events-none "
        />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left side: Information */}
            <div className="lg:col-span-6 flex flex-col gap-4 text-left">
              <h1 className="text-3xl md:text-[32px]  font-bold tracking-tight uppercase leading-tight ">
                {t("title1")} <br />
                {t("title2")}
              </h1>
              <p className="text-base text-white opacity-80">
                <span>{t("subtitle1")}</span> <br />
                <span>{t("subtitle2")}</span>
              </p>

              {/* Feature bullets */}
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full text-orange-50 shrink-0 bg-white/10">
                    <ClockIcon className="size-5" />
                  </div>
                  <span className="text-sm font-medium ">{t("bullet1")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full text-orange-50 shrink-0 bg-white/10">
                    <CalendarIcon className="size-5" />
                  </div>
                  <span className="text-sm font-medium ">{t("bullet2")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full text-orange-50 shrink-0 bg-white/10">
                    <SearchIcon className="size-5" />
                  </div>
                  <span className="text-sm font-medium ">{t("bullet3")}</span>
                </div>
              </div>
            </div>

            {/* Right side: Registration Form */}
            <div className="lg:col-span-6 w-full">
              <ReportRegisterForm />
            </div>
          </div>
        </Container>
      </div>

      {/* ── SECTION 2: Category Tabs ─────────────────────────────────────────── */}
      <div className="w-full ">
        <Container>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="flex items-center overflow-hidden  w-full justify-start py-4 h-auto bg-transparent p-0 border-none gap-7">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="py-4 text-[17px] max-w-60 leading-[25px] font-bold! text-blue-13 dark:text-gray-400 cursor-pointer data-[state=active]:text-secondary  data-[state=active]:border-b-[3px] data-[state=active]:before:bg-secondary"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Container>
      </div>

      {/* ── SECTION 3: Content Body (Featured & Grid) ─────────────────────────── */}
      <div className="w-full py-12 md:py-16">
        <Container className="space-y-12">
          {/* ── Sub-section 3.1: Featured Report ── */}
          {featured && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold uppercase text-left">
                {t("featuredTitle")}
              </h2>

              <div className="grid grid-cols-1 min-h-[380px] lg:grid-cols-12 bg-white dark:bg-gray-800 rounded-[16px]  overflow-hidden  items-stretch">
                {/* Text side */}
                <div className="lg:col-span-6 p-6 md:p-8 lg:p-12 flex flex-col justify-between items-start text-left space-y-6">
                  <div className="space-y-4">
                    <span className="inline-flex items-center bg-orange-50 rounded-sm py-1 px-3 font-poppins text-sm text-white tracking-wider">
                      {t("badgeFeatured")}
                    </span>
                    <h3 className="text-lg font-bold text-blue-13 dark:text-white leading-tight uppercase">
                      {featured.title}
                    </h3>
                    <p className="text-sm text-[#475467] dark:text-gray-300 leading-relaxed font-medium line-clamp-4">
                      {featured.description}
                    </p>
                  </div>

                  <Button variant="container" color="secondary" className="p-6">
                    {t("readMore")}
                  </Button>
                </div>

                {/* Graphic/Image side with premium fallback visual background */}
                <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-0 overflow-hidden">
                  <Image
                    src={getStrapiImageUrl(featured, fallbackReportFuture)}
                    alt="Featured Report Graphic"
                    fill
                    priority
                    className="object-cover object-center brightness-[0.95]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Sub-section 3.2: Daily Reports Grid ── */}
          <div className="space-y-8 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-13 dark:text-white uppercase text-left">
                {t("dailyTitle")}
              </h2>

              <Button variant="text" color="secondary">
                {t("viewAll")}
                <ArrowRightIcon className="size-4 text-secondary" />
              </Button>
            </div>

            {/* NewsCard Grid */}
            {categoryReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categoryReports.map((report) => (
                  <NewsCard
                    key={report.id}
                    imageSrc={getStrapiImageUrl(report, fallbackReport)}
                    imageAlt={report.title}
                    badge={report.category?.title}
                    date={report.public_at}
                    title={report.title}
                    description={report.description_mini}
                    onClick={() => console.log(`Clicked report ${report.id}`)}
                    className="border-none rounded-2xl shadow-300"
                    textButton={t("readMore")}
                    tags={
                      report.Keyword
                        ? report.Keyword.split(",").map((tag) => tag.trim())
                        : []
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500 dark:text-gray-400 font-medium">
                No reports found in this category.
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
