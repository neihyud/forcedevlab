import { IMenuItem } from "@/types/cms";
import { IStrapiCollectionResponse } from "@/types/strapi";

export const mockMenus: IStrapiCollectionResponse<IMenuItem> = {
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
