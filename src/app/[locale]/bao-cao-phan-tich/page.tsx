import React from "react";
import { Metadata } from "next";
import AnalysisReportModule from "@/modules/bao-cao-phan-tich";
import { getSeoMetadata } from "@/lib/utils/seo";
import { fetchGlobalSetting } from "@/services/cms/global";
import {
  fetchReportAnalysts,
  fetchReportCategories,
} from "@/services/cms/report-analytic";

import { IGlobalSetting, IReportAnalyst, ICategory } from "@/types/cms";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getSeoMetadata({
    path: "/bao-cao-phan-tich",
    locale,
    fallbackTitle: "Báo cáo phân tích",
    fallbackDescription:
      "Đăng ký nhận báo cáo phân tích hàng ngày và các nhận định chuyên sâu từ đội ngũ chuyên gia HVS.",
  });
}

export default async function AnalysisReportPage({ params }: PageProps) {
  const { locale } = await params;
  let globalSetting: IGlobalSetting | null = null;
  let reports: IReportAnalyst[] = [];
  let categories: ICategory[] = [];

  try {
    const [globalSettingRes, reportsRes, categoriesRes] = await Promise.all([
      fetchGlobalSetting(),
      fetchReportAnalysts(locale),
      fetchReportCategories(locale),
    ]);
    globalSetting = globalSettingRes?.data || null;
    reports = reportsRes?.data || [];
    categories = categoriesRes?.data || [];
  } catch (error) {
    console.error("Failed to fetch analysis report page SSR data:", error);
  }

  return (
    <AnalysisReportModule
      globalSetting={globalSetting}
      reports={reports}
      categories={categories}
    />
  );
}
