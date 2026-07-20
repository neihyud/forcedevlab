import { buildStrapiQuery } from "@/lib/helpers/strapi";
import { IStrapiQueryParams } from "@/types/strapi";

const strapiBaseUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:1337";

const cleanBaseUrl = strapiBaseUrl.replace(/\/+$/, "");

interface FetchOptions extends RequestInit {
  params?: IStrapiQueryParams | any;
  revalidate?: number;
  tags?: string[];
}

/**
 * Base HTTP client using Next.js native fetch for server-side caching and revalidation.
 */
export async function cmsFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params, revalidate, tags, ...restOptions } = options;

  // Build query string
  const query = buildStrapiQuery(params);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${cleanBaseUrl}${cleanPath}${query ? `?${query}` : ""}`;

  // Next.js cache configurations
  const nextConfig: any = {};
  if (revalidate !== undefined) {
    nextConfig.revalidate = revalidate;
  }
  if (tags && tags.length > 0) {
    nextConfig.tags = tags;
  }

  const fetchOptions: RequestInit = {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...restOptions.headers,
    },
  };

  if (Object.keys(nextConfig).length > 0) {
    fetchOptions.next = nextConfig;
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(
      `CMS request failed to path ${path} with status ${res.status}`,
    );
  }

  return await res.json();
}
