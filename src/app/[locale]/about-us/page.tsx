import AboutUsModule from "@/modules/about-us";
import { fetchReviews, fetchFaq } from "@/services/cms/global";

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
