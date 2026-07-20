import AboutUsModule from "@/modules/about-us";
import { fetchReviews, fetchFaq } from "@/services/cms/global";
import { Metadata } from "next";
import { getSeoMetadata } from "@/lib/utils/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getSeoMetadata({
    path: "/about-us",
    locale,
    fallbackTitle: "Về chúng tôi",
    fallbackDescription:
      "Tìm hiểu về HSV — đội ngũ, sứ mệnh và những giá trị chúng tôi mang lại.",
  });
}

export default async function AboutUsPage() {
  let reviews: any[] = [];
  let faq: any = null;
  try {
    const [reviewsRes, faqRes] = await Promise.all([
      fetchReviews(),
      fetchFaq(),
    ]);
    reviews = reviewsRes.data || [];
    faq = faqRes.data || null;
  } catch (error) {
    console.error("Failed to fetch CMS data for About Us page:", error);
  }

  return <AboutUsModule reviews={reviews} faq={faq} />;
}
