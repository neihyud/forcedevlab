import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Webhook endpoint for Strapi CMS to trigger cache revalidation.
 *
 * Strapi sends a POST request to this endpoint whenever content is
 * created, updated, or deleted. This clears the Next.js cache so
 * the latest data is fetched on the next request.
 *
 * Usage:
 *   POST /api/revalidate
 *   Headers: { "x-revalidation-secret": "<secret>" }
 *   Body: { "model": "global-setting" | "menu", "event": "entry.publish" }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the webhook secret for security
    const secret = request.headers.get("x-revalidation-secret");
    const expectedSecret = process.env.REVALIDATION_SECRET;
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { error: "Invalid revalidation secret" },
        { status: 401 },
      );
    }

    // Parse the webhook payload
    const body = await request.json().catch(() => ({}));
    const model = body?.model || "unknown";

    // Revalidate based on model, or revalidate all CMS tags
    if (model === "global-setting") {
      revalidateTag("cms-global-setting");
    } else if (model === "menu") {
      revalidateTag("cms-menus");
    } else {
      // Revalidate all CMS tags if model is unknown
      revalidateTag("cms-global-setting");
      revalidateTag("cms-menus");
    }

    return NextResponse.json({
      revalidated: true,
      model,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Revalidation failed", details: message },
      { status: 500 },
    );
  }
}
