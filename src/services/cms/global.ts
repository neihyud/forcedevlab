import {
  IGlobalSetting,
  IMenuItem,
  IHomepage,
  IArticle,
  IReview,
  IPageSeo,
} from "@/types/cms";
import { cmsFetch } from "./client";
import {
  IStrapiSingleResponse,
  IStrapiCollectionResponse,
} from "@/types/strapi";

import { mockGlobalSetting } from "@/services/mocks/global-setting.mock";
import { mockMenus } from "@/services/mocks/menus.mock";
import {
  mockHomepage,
  mockReviewsSection,
} from "@/services/mocks/homepage.mock";
import { mockNews } from "@/services/mocks/news.mock";
import { mockSupportData } from "@/services/mocks/support.mock";
import { mockFaqSection } from "@/services/mocks/faq.mock";

let strapiBaseUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:1337";

if (strapiBaseUrl && !/^https?:\/\//i.test(strapiBaseUrl)) {
  strapiBaseUrl = `https://${strapiBaseUrl}`;
}

const cleanBaseUrl = strapiBaseUrl.replace(/\/+$/, "");

/**
 * Fetch the global site settings (single type).
 * Populates all relations including logo, favicon, and socialMedia.
 */
export async function fetchGlobalSetting(): Promise<
  IStrapiSingleResponse<IGlobalSetting>
> {
  try {
    return await cmsFetch<IStrapiSingleResponse<IGlobalSetting>>(
      "/api/global-setting",
      {
        params: { populate: "*" },
        revalidate: 86400,
        tags: ["cms-global-setting"],
      },
    );
  } catch (error) {
    console.error(
      "Failed to fetch global settings, falling back to mock data:",
      error,
    );
    return mockGlobalSetting;
  }
}

/**
 * Fetch the top-level menus with nested children (2 levels deep).
 * Only returns menus that have no parent (root-level).
 */
export async function fetchMenus(): Promise<
  IStrapiCollectionResponse<IMenuItem>
> {
  try {
    return await cmsFetch<IStrapiCollectionResponse<IMenuItem>>(
      "/api/header-menu",
      {
        revalidate: 86400,
        tags: ["cms-menus"],
      },
    );
  } catch (error) {
    console.error("Failed to fetch menus, falling back to mock data:", error);
    return mockMenus;
  }
}

export async function fetchHomepage(): Promise<
  IStrapiSingleResponse<IHomepage>
> {
  return mockHomepage;
}

export async function fetchNews(): Promise<
  IStrapiCollectionResponse<IArticle>
> {
  return mockNews;
}

export async function fetchReviews(): Promise<
  IStrapiCollectionResponse<IReview>
> {
  return {
    data: mockReviewsSection.reviews,
    meta: {},
  };
}

export async function fetchSupportData() {
  return {
    data: mockSupportData,
  };
}

export async function fetchFaq() {
  return {
    data: mockFaqSection,
  };
}
/**
 * Fetch specific Page SEO by path and locale.
 */
export async function fetchPageSeo(
  path: string,
  locale: string,
): Promise<IStrapiCollectionResponse<IPageSeo>> {
  try {
    return await cmsFetch<IStrapiCollectionResponse<IPageSeo>>(
      "/api/page-seos",
      {
        params: {
          filters: {
            path: {
              $eq: path,
            },
          },
          locale: locale,
          populate: "image",
        },
        revalidate: 86400,
        tags: [`cms-page-seo-${path}-${locale}`],
      },
    );
  } catch (error) {
    console.error(`Failed to fetch page SEO for path ${path}:`, error);
    return { data: [], meta: {} };
  }
}
