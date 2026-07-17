import {
  buildStrapiQuery,
  getStrapiMediaUrl,
  getStrapiImageUrl,
} from "../lib/helpers/strapi";
import { IStrapiMedia } from "../types/strapi";

describe("Strapi Helper Utilities", () => {
  describe("buildStrapiQuery", () => {
    test("returns empty string for empty/undefined params", () => {
      expect(buildStrapiQuery(undefined)).toBe("");
      expect(buildStrapiQuery(null)).toBe("");
      expect(buildStrapiQuery({})).toBe("");
    });

    test("serializes simple key-value pairs", () => {
      const query = buildStrapiQuery({ locale: "en", status: "published" });
      expect(query).toBe("locale=en&status=published");
    });

    test("serializes array query parameters", () => {
      const query = buildStrapiQuery({
        fields: ["title", "slug"],
        sort: ["createdAt:desc"],
      });
      expect(decodeURIComponent(query)).toBe(
        "fields[]=title&fields[]=slug&sort[]=createdAt:desc",
      );
    });

    test("serializes nested filters object (LHS brackets)", () => {
      const params = {
        filters: {
          title: {
            $eq: "Hello",
          },
          status: "active",
        },
      };
      const query = buildStrapiQuery(params);
      expect(decodeURIComponent(query)).toBe(
        "filters[title][$eq]=Hello&filters[status]=active",
      );
    });

    test("serializes complex nested structure (filters, populate, pagination)", () => {
      const params = {
        populate: {
          avatar: {
            fields: ["url", "alternativeText"],
          },
        },
        pagination: {
          page: 1,
          pageSize: 10,
        },
      };
      const query = buildStrapiQuery(params);
      expect(decodeURIComponent(query)).toBe(
        "populate[avatar][fields][]=url&populate[avatar][fields][]=alternativeText&pagination[page]=1&pagination[pageSize]=10",
      );
    });
  });

  describe("getStrapiMediaUrl", () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    test("returns empty string if no url provided", () => {
      expect(getStrapiMediaUrl(null)).toBe("");
      expect(getStrapiMediaUrl(undefined)).toBe("");
    });

    test("returns absolute url as-is", () => {
      expect(getStrapiMediaUrl("https://example.com/image.png")).toBe(
        "https://example.com/image.png",
      );
      expect(getStrapiMediaUrl("http://example.com/image.png")).toBe(
        "http://example.com/image.png",
      );
    });

    test("prepends NEXT_PUBLIC_STRAPI_API_URL or NEXT_PUBLIC_BASE_URL to relative url", () => {
      process.env.NEXT_PUBLIC_STRAPI_API_URL = "https://strapi.example.com";
      expect(getStrapiMediaUrl("/uploads/image.png")).toBe(
        "https://strapi.example.com/uploads/image.png",
      );
    });

    test("cleans up double slashes between base and path", () => {
      process.env.NEXT_PUBLIC_STRAPI_API_URL = "https://strapi.example.com/";
      expect(getStrapiMediaUrl("//uploads/image.png")).toBe(
        "https://strapi.example.com/uploads/image.png",
      );
    });
  });

  describe("getStrapiImageUrl", () => {
    const mockMedia = {
      id: 1,
      documentId: "media123",
      name: "test.png",
      url: "/uploads/test.png",
      formats: {
        thumbnail: { url: "/uploads/thumbnail_test.png" },
        medium: { url: "/uploads/medium_test.png" },
      },
    } as unknown as IStrapiMedia;

    beforeEach(() => {
      process.env.NEXT_PUBLIC_STRAPI_API_URL = "https://strapi.example.com";
    });

    test("returns thumbnail url if preferred and available", () => {
      const url = getStrapiImageUrl(mockMedia, "thumbnail");
      expect(url).toBe("https://strapi.example.com/uploads/thumbnail_test.png");
    });

    test("falls back to main url if preferred format is unavailable", () => {
      const url = getStrapiImageUrl(mockMedia, "large");
      expect(url).toBe("https://strapi.example.com/uploads/test.png");
    });

    test("returns empty string if media is null/undefined", () => {
      expect(getStrapiImageUrl(null)).toBe("");
      expect(getStrapiImageUrl(undefined)).toBe("");
    });
  });
});
