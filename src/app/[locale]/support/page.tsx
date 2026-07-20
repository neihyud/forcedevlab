import SupportModule from "@/modules/support";
import { fetchSupportData } from "@/services/cms/global";
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
    path: "/support",
    locale,
    fallbackTitle: "Hỗ trợ",
    fallbackDescription:
      "Trung tâm hỗ trợ HSV — giải đáp thắc mắc, hướng dẫn sử dụng và các câu hỏi thường gặp.",
  });
}

export default async function SupportPage() {
  const supportRes = await fetchSupportData();
  return <SupportModule supportData={supportRes.data} />;
}
