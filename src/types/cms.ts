import { IStrapiBase, IStrapiMedia } from "@/types/strapi";

// ─── Social Media Component ────────────────────────────────────────────────────
export type TSocialNetwork =
  "Facebook" | "Twitter" | "TikTok" | "Instagram" | "Youtube";

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
  fax?: string;
  workingTime?: string;
  slogan?: string;
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

// ─── Report Analyst (Collection Type) ──────────────────────────────────────────
export interface IReportAnalyst {
  id: number;
  documentId: string;
  title: string;
  slug?: string | null;
  description?: string | null;
  description_mini?: string | null;
  badge?: string | null;
  public_at: string;
  Keyword?: string | null;
  category: ICategory;
  isFeatured?: boolean;
  view?: number | null;
  pin?: boolean | null;
  ticker?: string | null;
  reading_time?: string | null;
  source_link?: string | null;
  title_seo?: string | null;
  description_seo?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  active: "ACTIVE" | "INACTIVE";
  image?: IStrapiMedia | null;
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
  children?: (IMenuItem & IStrapiBase)[];
}

// ─── Partner (Collection Type) ──────────────────────────────────────────────────
export interface IPartner {
  name: string;
  logo: IStrapiMedia;
}

// ─── News Item (Collection Type) ────────────────────────────────────────────────
export interface IArticle {
  title: string;
  description: string;
  badge: string;
  date: string;
  image: IStrapiMedia;
}

// ─── Review Item (Collection Type) ──────────────────────────────────────────────
export interface IReview {
  name: string;
  rating: number;
  time: string;
  verified: boolean;
  content: string;
  avatarFallback: string;
}

// ─── Homepage Components ────────────────────────────────────────────────────────
export interface IHeroSectionComponent {
  id: number;
  __component: "sections.hero-section";
  title: string;
  subtitle: string;
  description: string;
  heroBackground: IStrapiMedia | null;
  badgeText: string;
  ctaText: string;
  ctaLink: string;
  videoUrl?: string | null;
}

export interface IPartnersSectionComponent {
  id: number;
  __component: "sections.partners-section";
  title: string;
  partners: (IPartner & IStrapiBase)[];
}

export interface IServiceCardComponent {
  id: number;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  image: IStrapiMedia;
}

export interface IProductServiceSectionComponent {
  id: number;
  __component: "sections.product-service-section";
  title: string;
  cards: IServiceCardComponent[];
  entrustTitle: string;
  entrustSubtitle: string;
  entrustDescription: string;
  entrustImage: IStrapiMedia;
}

export interface INewsSectionComponent {
  id: number;
  __component: "sections.news-section";
  title: string;
  articles: (IArticle & IStrapiBase)[];
}

export interface IReviewsSectionComponent {
  id: number;
  __component: "sections.reviews-section";
  title: string;
  reviews: (IReview & IStrapiBase)[];
}

export interface IAppDownloadSectionComponent {
  id: number;
  __component: "sections.app-download-section";
  title: string;
  description: string;
  appLogo: IStrapiMedia;
  appMockup: IStrapiMedia;
  qrCode: IStrapiMedia;
  appStoreLink: string;
  googlePlayLink: string;
}

export type THomepageSection =
  | IHeroSectionComponent
  | IPartnersSectionComponent
  | IProductServiceSectionComponent
  | INewsSectionComponent
  | IReviewsSectionComponent
  | IAppDownloadSectionComponent;

// ─── Homepage Single Type ───────────────────────────────────────────────────────
export interface IHomepage {
  page_sections: THomepageSection[];
}

// ─── CMS Data Aggregate ────────────────────────────────────────────────────────
export interface ICmsData {
  globalSetting: (IGlobalSetting & IStrapiBase) | null;
  menus: (IMenuItem & IStrapiBase)[];
  partners: (IPartner & IStrapiBase)[];
  homepage: (IHomepage & IStrapiBase) | null;
  lastFetched: string | null;
}

// ─── Category (Collection Type) ────────────────────────────────────────────────
export interface ICategory {
  id: number;
  title: string;
  type?: string | null;
  slug?: string | null;
  description?: string | null;
  active?: "ACTIVE" | "INACTIVE";
  order?: number | null;
}
