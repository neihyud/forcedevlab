import { IStrapiMedia, IStrapiQueryParams } from "../../types/strapi";

/**
 * Recursively converts a query parameters object into a Strapi-compatible query string
 * using Left-Hand-Side (LHS) bracket notation.
 * Replaces the need for external libraries like `qs`.
 *
 * @param params The query parameter object (filters, populate, pagination, sort, fields, etc.)
 * @param prefix Internal parameter used for recursion
 * @returns An encoded query string (e.g. "populate[avatar]=*&filters[title][$eq]=hello")
 */
export function buildStrapiQuery(
  params?: IStrapiQueryParams | any,
  prefix = "",
): string {
  if (!params) return "";
  const parts: string[] = [];

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (value === undefined || value === null) continue;

      const newPrefix = prefix ? `${prefix}[${key}]` : key;

      if (typeof value === "object" && !Array.isArray(value)) {
        parts.push(buildStrapiQuery(value, newPrefix));
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object") {
            parts.push(buildStrapiQuery(item, `${newPrefix}[${index}]`));
          } else {
            // Strapi expects array elements as plural parameters (e.g. sort[]=title&sort[]=createdAt)
            parts.push(
              `${encodeURIComponent(newPrefix)}[]=${encodeURIComponent(String(item))}`,
            );
          }
        });
      } else {
        parts.push(
          `${encodeURIComponent(newPrefix)}=${encodeURIComponent(String(value))}`,
        );
      }
    }
  }

  return parts.filter(Boolean).join("&");
}

/**
 * Resolves a media URL from Strapi, prepending the Strapi base URL if the path is relative.
 *
 * @param url The relative or absolute media URL (e.g. "/uploads/image.png")
 * @returns The resolved absolute media URL
 */
export function getStrapiMediaUrl(url?: string | null): string {
  if (!url) return "";

  // If it's already an absolute URL (e.g. hosted on S3 or external CDN), return as-is
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  const strapiBaseUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "";

  // Clean up slashes to avoid double-slashes in the output
  const cleanBase = strapiBaseUrl.replace(/\/+$/, "");
  const cleanUrl = url.replace(/^\/+/, "");

  return `${cleanBase}/${cleanUrl}`;
}

/**
 * Resolves the absolute URL of a Strapi media file, optionally selecting a preferred responsive format.
 * If the preferred format does not exist, it falls back to the main media URL.
 *
 * @param media The Strapi media object
 * @param preferredFormat Preferred image size ('large' | 'medium' | 'small' | 'thumbnail')
 * @returns The resolved absolute image URL
 */
export function getStrapiImageUrl(
  media?: IStrapiMedia | null,
  preferredFormat: "large" | "medium" | "small" | "thumbnail" = "medium",
): string {
  if (!media) return "";

  const formatObj = media.formats?.[preferredFormat];
  const relativeUrl = formatObj?.url || media.url;

  return getStrapiMediaUrl(relativeUrl);
}
