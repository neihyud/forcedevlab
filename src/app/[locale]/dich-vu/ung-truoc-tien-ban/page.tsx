import React from "react";
import { Metadata } from "next";
import MarginTradingModule from "@/modules/dich-vu/ung-truoc-tien-ban";
import { getSeoMetadata } from "@/lib/utils/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getSeoMetadata({
    path: "/dich-vu/ung-truoc-tien-ban",
    locale,
    fallbackTitle: "Ứng trước tiền bán",
    fallbackDescription:
      "Cho phép nhà đầu tư ứng trước tiền bán chứng khoán ngay sau khi giao dịch, không cần chờ thanh toán T+2.",
  });
}

export default async function MarginTradingPage() {
  return <MarginTradingModule />;
}
