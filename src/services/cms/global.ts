import { cmsFetch } from "./client";
import { IGlobalSetting, IMenuItem, IPageSeo } from "@/types/cms";
import {
  IStrapiSingleResponse,
  IStrapiCollectionResponse,
} from "@/types/strapi";

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
