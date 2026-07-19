import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReportDetailModule from "@/modules/bao-cao-phan-tich/detail";
import {
  fetchReportBySlug,
  fetchRelatedReports,
  fetchReportCategories,
} from "@/services/cms/report-analytic";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const report = await fetchReportBySlug(slug, locale);

  if (!report) {
    return {
      title: locale === "en" ? "Report Not Found" : "Không tìm thấy báo cáo",
    };
  }

  return {
    title: report.title_seo || `${report.title} | HVS`,
    description:
      report.description_seo || report.description_mini || report.title,
    keywords: report.Keyword || "",
  };
}

export default async function ReportDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const report = await fetchReportBySlug(slug, locale);

  if (!report) {
    notFound();
  }

  // Fetch related reports and categories in parallel
  const categorySlug = report.category?.slug || "";
  const [relatedReportsRes, categoriesRes] = await Promise.all([
    fetchRelatedReports(categorySlug, report.id, locale),
    fetchReportCategories(locale),
  ]);
  const relatedReports = relatedReportsRes?.data || [];
  const categories = categoriesRes?.data || [];

  return (
    <ReportDetailModule
      report={report}
      relatedReports={relatedReports}
      categories={categories}
    />
  );
}
