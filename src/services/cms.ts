import { buildStrapiQuery } from "@/lib/helpers/strapi";
import {
  IGlobalSetting,
  IMenuItem,
  IHomepage,
  IArticle,
  IReview,
} from "@/types/cms";
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
    const query = buildStrapiQuery({ populate: "*" });
    const url = `${cleanBaseUrl}/api/global-setting?${query}`;

    const res = await fetch(url, {
      next: {
        revalidate: 86400,
        tags: ["cms-global-setting"],
      },
    });

    if (!res.ok) {
      console.warn(
        `CMS Fetch global settings returned status: ${res.status}. Falling back to mock data.`,
      );
      return mockGlobalSetting;
    }

    return await res.json();
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
    const query = buildStrapiQuery({
      filters: {
        parent: {
          id: {
            $null: true,
          },
        },
      },
      populate: {
        child: {
          populate: "child",
        },
      },
    });
    const url = `${cleanBaseUrl}/api/menus?${query}`;

    const res = await fetch(url, {
      next: {
        revalidate: 86400,
        tags: ["cms-menus"],
      },
    });

    if (!res.ok) {
      console.warn(
        `CMS Fetch menus returned status: ${res.status}. Falling back to mock data.`,
      );
      return mockMenus;
    }

    return await res.json();
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
