"use client";

import { useTranslations } from "next-intl";
import { PostDetail } from "@/components/common/PostDetail";
import { IReportAnalyst, ICategory } from "@/types/cms";
import { getStrapiImageUrl } from "@/lib/helpers/strapi";
import fallbackReport from "@/lib/assets/images/webp/fallback_report.webp";

interface ReportDetailModuleProps {
  report: IReportAnalyst;
  relatedReports: IReportAnalyst[];
  categories?: ICategory[];
}

export default function ReportDetailModule({
  report,
  relatedReports = [],
  categories = [],
}: ReportDetailModuleProps) {
  const t = useTranslations();

  // Map categories to PostDetail side navigation list format
  const categoriesList = categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug || "",
    href: `/bao-cao-phan-tich`, // Link back to base category list page
  }));

  // Map related reports to CompactPostCard related posts items format
  const relatedPosts = relatedReports.map((item) => ({
    id: item.id,
    title: item.title,
    imageSrc: getStrapiImageUrl(item, fallbackReport),
    date: item.public_at,
    categoryTitle: item.category?.title || "",
    href: `/bao-cao-phan-tich/${item.slug || item.id}`,
    readingTime: item.reading_time || undefined,
  }));

  // Setup localization keys map
  const labels = {
    home: t("Common.home"),
    categoryTitle: t("Common.categoryTitle") || "Danh mục",
    relatedTitle: t("ReportAnalytic.relatedTitle"),
    noRelated: t("ReportAnalytic.noRelated"),
    noContent: t("ReportAnalytic.noContent"),
    viewSource: t("ReportAnalytic.viewSource"),
    formTitle: t("ReportAnalytic.formTitle"),
    formSubtitle: t("ReportAnalytic.subtitle1"),
    registerNow: t("ReportAnalytic.readMore"),
  };

  return (
    <PostDetail
      title={report.title}
      category={
        report.category
          ? {
              title: report.category.title,
              slug: report.category.slug || "",
            }
          : null
      }
      publicAt={report.public_at}
      readingTime={report.reading_time}
      keyword={report.Keyword}
      imageSrc={report.image ? getStrapiImageUrl(report.image) : null}
      description={report.description}
      sourceLink={report.source_link}
      author={
        report.ticker
          ? {
              name: report.ticker,
              avatarSrc: null,
            }
          : null
      }
      categoriesList={categoriesList}
      activeCategorySlug={report.category?.slug || undefined}
      relatedPosts={relatedPosts}
      labels={labels}
    />
  );
}
