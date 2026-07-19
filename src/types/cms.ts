import { IStrapiBase, IStrapiMedia } from "@/types/strapi";

// ─── Social Media Component ────────────────────────────────────────────────────
export type TSocialNetwork = "Facebook" | "Twitter" | "TikTok";

export interface ISocialMedia {
  id: number;
  socialNetwork: TSocialNetwork;
  title: string;
  description: string;
}

// ─── Global Setting (Single Type) ──────────────────────────────────────────────
export interface IGlobalSetting {
  siteName: string;
  siteDescription: string;
  email: string;
  hotline: string;
  address: string;
  googleAnalyticsId: string;
  workingHours: string;
  fax: string;
  logo: IStrapiMedia | null;
  favicon: IStrapiMedia | null;
  socialMedia: ISocialMedia[];
}

// ─── Page SEO (Collection Type) ────────────────────────────────────────────────
export interface IPageSeo {
  path: string;
  title: string;
  description: string;
  keywords?: string | null;
  image?: IStrapiMedia | null;
  active: "ACTIVE" | "INACTIVE";
}

// ─── Menu (Collection Type) ────────────────────────────────────────────────────
export type TMenuActive = "ACTIVE" | "DEACTIVE";

export interface IMenuItem {
  title: string;
  link: string;
  order: number;
  level: number;
  target_site: string | null;
  type: string | null;
  slug: string | null;
  title_en: string | null;
  active: TMenuActive;
  child: (IMenuItem & IStrapiBase)[];
}

// ─── CMS Data Aggregate ────────────────────────────────────────────────────────
export interface ICmsData {
  globalSetting: (IGlobalSetting & IStrapiBase) | null;
  menus: (IMenuItem & IStrapiBase)[];
  lastFetched: string | null;
}
