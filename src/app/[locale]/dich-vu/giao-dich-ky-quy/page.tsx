import React from "react";
import { Metadata } from "next";
import MarginTradingModule from "@/modules/dich-vu/giao-dich-ky-quy";
import { getSeoMetadata } from "@/lib/utils/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getSeoMetadata({
    path: "/dich-vu/giao-dich-ky-quy",
    locale,
    fallbackTitle: "Giao dịch ký quỹ",
    fallbackDescription:
      "Dịch vụ hỗ trợ vốn cho nhà đầu tư dưới hình thức ký quỹ tài sản để giao dịch mua bán chứng khoán HVS.",
  });
}

export default async function MarginTradingPage() {
  return <MarginTradingModule />;
}
