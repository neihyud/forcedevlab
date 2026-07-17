/**
 * Base properties present in every Strapi 5 content-type entry
 */
export interface IStrapiBase {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
}

/**
 * Standard metadata pagination structure returned by Strapi APIs
 */
export interface IStrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Standard metadata structure returned by Strapi APIs
 */
export interface IStrapiMeta {
  pagination?: IStrapiPagination;
  [key: string]: any;
}

/**
 * Standard response format for a single entry
 */
export interface IStrapiSingleResponse<T> {
  data: T & IStrapiBase;
  meta: IStrapiMeta;
}

/**
 * Standard response format for a collection of entries
 */
export interface IStrapiCollectionResponse<T> {
  data: (T & IStrapiBase)[];
  meta: IStrapiMeta;
}

/**
 * Generic response type that can represent either a single entry or custom structures
 */
export interface IStrapiResponse<T> {
  data: T;
  meta: IStrapiMeta;
}

/**
 * Standard error response format from Strapi REST endpoints
 */
export interface IStrapiError {
  status: number;
  name: string;
  message: string;
  details: Record<string, any>;
}

/**
 * Details of a specific size format for media files
 */
export interface IStrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

/**
 * Media properties representing images, videos, and other uploads in Strapi
 */
export interface IStrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: IStrapiMediaFormat;
    small?: IStrapiMediaFormat;
    medium?: IStrapiMediaFormat;
    large?: IStrapiMediaFormat;
    [key: string]: IStrapiMediaFormat | undefined;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/**
 * Type-safety for nesting custom component data in Strapi structures
 */
export type TStrapiComponent<T = Record<string, any>> = T & {
  id: number;
};

/**
 * Type-safety for defining dynamic zone components arrays in Strapi structures
 */
export type TStrapiDynamicZone<
  T extends { __component: string } = { __component: string },
> = (T & {
  id: number;
})[];

/**
 * Strongly-typed query parameters schema for querying Strapi REST API
 */
export interface IStrapiQueryParams {
  populate?: string | string[] | Record<string, any>;
  filters?: Record<string, any>;
  sort?: string | string[];
  fields?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
    withCount?: boolean;
  };
  locale?: string | string[];
  status?: "draft" | "published";
}
