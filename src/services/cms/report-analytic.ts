import { cmsFetch } from "./client";
import { IReportAnalyst, ICategory } from "@/types/cms";
import { IStrapiCollectionResponse } from "@/types/strapi";

/**
 * Fetch list of Report Analysts by locale.
 */
export async function fetchReportAnalysts(
  locale: string,
): Promise<IStrapiCollectionResponse<IReportAnalyst>> {
  try {
    return await cmsFetch<IStrapiCollectionResponse<IReportAnalyst>>(
      "/api/report-analytics",
      {
        params: {
          locale: locale,
          populate: ["image", "category"],
          pagination: {
            limit: 100,
          },
        },
        revalidate: 86400,
        tags: [`cms-report-analysts-${locale}`],
      },
    );
  } catch (error) {
    console.error(
      "Failed to fetch report analysts, falling back to mock data:",
      error,
    );

    return { data: [], meta: {} };
  }
}

/**
 * Fetch report categories by type = "bao-cao-phan-tich"
 */
export async function fetchReportCategories(
  locale: string,
): Promise<IStrapiCollectionResponse<ICategory>> {
  try {
    return await cmsFetch<IStrapiCollectionResponse<ICategory>>(
      "/api/categories",
      {
        params: {
          locale,
          filters: {
            type: "bao-cao-phan-tich",
            active: "ACTIVE",
          },
          sort: ["order:asc", "id:asc"],
        },
        revalidate: 86400,
        tags: [`cms-report-categories-${locale}`],
      },
    );
  } catch (error) {
    console.error(
      "Failed to fetch report categories, falling back to mock data:",
      error,
    );
    const mockCategories: Omit<ICategory, "id">[] = [
      {
        title: "Báo cáo chiến lược",
        slug: "strategy",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 1,
      },
      {
        title: "Báo cáo vĩ mô",
        slug: "macro",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 2,
      },
      {
        title: "Phân tích doanh nghiệp",
        slug: "business",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 3,
      },
      {
        title: "Thị trường hàng hóa",
        slug: "commodity",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 4,
      },
      {
        title: "Nhận định thị trường",
        slug: "market",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 5,
      },
      {
        title: "Góc nhìn chuyên gia",
        slug: "expert",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 6,
      },
    ];
    const data = mockCategories.map((item, index) => ({
      id: index + 1,
      documentId: `cat-${index + 1}`,
      createdAt: "2026-07-19T00:00:00.000Z",
      updatedAt: "2026-07-19T00:00:00.000Z",
      ...item,
    }));
    return { data, meta: {} };
  }
}

/**
 * Fetch a single report by slug.
 */
export async function fetchReportBySlug(
  slug: string,
  locale: string,
): Promise<IReportAnalyst | null> {
  try {
    const res = await cmsFetch<IStrapiCollectionResponse<IReportAnalyst>>(
      "/api/report-analytics",
      {
        params: {
          locale,
          filters: {
            slug: {
              $eq: slug,
            },
          },
          populate: ["image", "category"],
        },
        revalidate: 86400,
        tags: [`cms-report-detail-${slug}-${locale}`],
      },
    );
    return res.data?.[0] || null;
  } catch (error) {
    console.error(`Failed to fetch report by slug ${slug}:`, error);

    return null;
  }
}

/**
 * Fetch related reports in the same category.
 */
export async function fetchRelatedReports(
  categorySlug: string,
  excludeId: number,
  locale: string,
): Promise<IStrapiCollectionResponse<IReportAnalyst>> {
  try {
    return await cmsFetch<IStrapiCollectionResponse<IReportAnalyst>>(
      "/api/report-analytics",
      {
        params: {
          locale,
          filters: {
            category: {
              slug: {
                $eq: categorySlug,
              },
            },
            id: {
              $ne: excludeId,
            },
          },
          populate: ["image", "category"],
          pagination: {
            limit: 5,
          },
        },
        revalidate: 86400,
        tags: [`cms-report-related-${categorySlug}-${locale}`],
      },
    );
  } catch (error) {
    console.error(
      `Failed to fetch related reports for category ${categorySlug}:`,
      error,
    );

    return { data: [], meta: {} };
  }
}
