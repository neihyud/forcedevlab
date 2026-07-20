import { IGlobalSetting } from "@/types/cms";
import { IStrapiSingleResponse } from "@/types/strapi";

export const mockGlobalSetting: IStrapiSingleResponse<IGlobalSetting> = {
  data: {
    id: 1,
    documentId: "global-setting-doc",
    createdAt: "2026-07-14T00:00:00.000Z",
    updatedAt: "2026-07-14T00:00:00.000Z",
    siteName: "HVS Video App",
    siteDescription: "Hệ thống Quản lý Video chuyên nghiệp",
    email: "info@hvsvn.com",
    hotline: "(+84-24) 38869999",
    address:
      "Tầng 4, Trung tâm Thương mại Dịch vụ Cống Vị, số 2 Liễu Giai, Phường Ngọc Hà, TP Hà Nội.",
    fax: "(+84-24) 36888886",
    workingTime: "08:00 – 17:00 (Thứ 2 – Thứ 6)",
    slogan: "LÀM ÍT HƠN AN TOÀN HƠN LỢI NHUẬN NHIỀU HƠN",
    googleAnalyticsId: "UA-123456-1",
    logo: null,
    favicon: null,
    socialMedia: [
      {
        id: 1,
        socialNetwork: "Facebook",
        title: "Facebook",
        description: "https://facebook.com/hvs",
      },
      {
        id: 2,
        socialNetwork: "Instagram",
        title: "Instagram",
        description: "https://instagram.com/hvs",
      },
      {
        id: 3,
        socialNetwork: "TikTok",
        title: "TikTok",
        description: "https://tiktok.com/@hvs",
      },
      {
        id: 4,
        socialNetwork: "Youtube",
        title: "Youtube",
        description: "https://youtube.com/c/hvs",
      },
    ],
  },
  meta: {},
};
