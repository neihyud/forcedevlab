import { Metadata } from "next";
import { fetchGlobalSetting, fetchPageSeo } from "@/services/cms/global";
import { getStrapiMediaUrl } from "@/lib/helpers/strapi";

interface SeoHelperOptions {
  path: string;
  locale: string;
  fallbackTitle: string;
  fallbackDescription?: string;
}

export async function getSeoMetadata({
  path,
  locale,
  fallbackTitle,
  fallbackDescription,
}: SeoHelperOptions): Promise<Metadata> {
  let siteName = "HVS Website";
  let baseDescription = "";
  let baseLogoUrl = "";

  // 1. Fetch Global Settings for base fallback values
  try {
    const globalSettingRes = await fetchGlobalSetting();
    const globalSetting = globalSettingRes?.data;
    if (globalSetting) {
      siteName = globalSetting.siteName || siteName;
      baseDescription = globalSetting.siteDescription || baseDescription;
      if (globalSetting.logo) {
        baseLogoUrl = getStrapiMediaUrl(globalSetting.logo.url);
      }
    }
  } catch (error) {
    console.error("SEO Helper: Failed to fetch global settings:", error);
  }

  // 2. Fetch specific Page SEO configuration
  try {
    const pageSeoRes = await fetchPageSeo(path, locale);
    // Find active page SEO
    const pageSeo = pageSeoRes?.data?.find((seo) => seo.active !== "INACTIVE");

    if (pageSeo) {
      const title = pageSeo.title;
      const description = pageSeo.description || baseDescription;
      const keywords = pageSeo.keywords
        ? pageSeo.keywords.split(",").map((k) => k.trim())
        : [];
      const imageUrl = pageSeo.image
        ? getStrapiMediaUrl(pageSeo.image.url)
        : baseLogoUrl;

      return {
        title: `${title} | ${siteName}`,
        description,
        keywords,
        openGraph: {
          title: `${title} | ${siteName}`,
          description,
          images: imageUrl ? [{ url: imageUrl }] : [],
        },
        twitter: {
          card: "summary_large_image",
          title: `${title} | ${siteName}`,
          description,
          images: imageUrl ? [imageUrl] : [],
        },
      };
    }
  } catch (error) {
    console.error(
      `SEO Helper: Failed to fetch Page SEO for path ${path}:`,
      error,
    );
  }

  // 3. Fallback logic if Page SEO doesn't exist
  const title = `${fallbackTitle} | ${siteName}`;
  const description = fallbackDescription || baseDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: baseLogoUrl ? [{ url: baseLogoUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: baseLogoUrl ? [baseLogoUrl] : [],
    },
  };
}
