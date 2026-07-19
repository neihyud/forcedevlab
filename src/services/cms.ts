import { buildStrapiQuery } from "@/lib/helpers/strapi";
import { IGlobalSetting, IMenuItem, IPageSeo } from "@/types/cms";
import {
  IStrapiSingleResponse,
  IStrapiCollectionResponse,
} from "@/types/strapi";

let strapiBaseUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:1337";

if (strapiBaseUrl && !/^https?:\/\//i.test(strapiBaseUrl)) {
  strapiBaseUrl = `https://${strapiBaseUrl}`;
}

const cleanBaseUrl = strapiBaseUrl.replace(/\/+$/, "");

const mockGlobalSetting: IStrapiSingleResponse<IGlobalSetting> = {
  data: {
    id: 1,
    documentId: "global-setting-doc",
    createdAt: "2026-07-14T00:00:00.000Z",
    updatedAt: "2026-07-14T00:00:00.000Z",
    siteName: "HVS Video App",
    siteDescription: "Hệ thống Quản lý Video chuyên nghiệp",
    email: "contact@hvs.com",
    hotline: "0123456789",
    address: "Hà Nội, Việt Nam",
    googleAnalyticsId: "UA-123456-1",
    workingHours: "08:00 – 17:00 (Thứ 2 – Thứ 6)",
    fax: "Fax: (+84-24) 36888886",
    logo: null,
    favicon: null,
    socialMedia: [
      {
        id: 1,
        socialNetwork: "Facebook",
        title: "Facebook",
        description: "https://facebook.com",
      },
      {
        id: 2,
        socialNetwork: "Twitter",
        title: "Twitter",
        description: "https://twitter.com",
      },
    ],
  },
  meta: {},
};

const mockMenus: IStrapiCollectionResponse<IMenuItem> = {
  data: [
    {
      id: 1,
      documentId: "menu-home",
      createdAt: "2026-07-14T00:00:00.000Z",
      updatedAt: "2026-07-14T00:00:00.000Z",
      title: "Trang chủ",
      link: "/",
      order: 1,
      level: 1,
      target_site: null,
      type: "home",
      slug: "home",
      title_en: "Home",
      active: "ACTIVE",
      child: [],
    },
    {
      id: 2,
      documentId: "menu-videos",
      createdAt: "2026-07-14T00:00:00.000Z",
      updatedAt: "2026-07-14T00:00:00.000Z",
      title: "Danh sách Video",
      link: "/videos",
      order: 2,
      level: 1,
      target_site: null,
      type: "videos",
      slug: "videos",
      title_en: "Videos",
      active: "ACTIVE",
      child: [],
    },
  ],
  meta: {},
};

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

/**
 * Fetch specific Page SEO by path and locale.
 */
export async function fetchPageSeo(
  path: string,
  locale: string,
): Promise<IStrapiCollectionResponse<IPageSeo>> {
  try {
    const query = buildStrapiQuery({
      filters: {
        path: {
          $eq: path,
        },
      },
      locale: locale,
      populate: "image",
    });
    const url = `${cleanBaseUrl}/api/page-seos?${query}`;

    const res = await fetch(url, {
      next: {
        revalidate: 86400,
        tags: [`cms-page-seo-${path}-${locale}`],
      },
    });

    if (!res.ok) {
      console.warn(
        `CMS Fetch page SEO returned status: ${res.status}. Returning empty results.`,
      );
      return { data: [], meta: {} };
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch page SEO for path ${path}:`, error);
    return { data: [], meta: {} };
  }
}
