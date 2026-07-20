import React from "react";
import { Metadata } from "next";
import SecuritiesDepositoryModule from "@/modules/dich-vu/luu-ky-chung-khoan";
import { getSeoMetadata } from "@/lib/utils/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getSeoMetadata({
    path: "/dich-vu/luu-ky-chung-khoan",
    locale,
    fallbackTitle: "Lưu ký chứng khoán",
    fallbackDescription:
      "Dịch vụ ký gửi, bảo quản, chuyển giao và ghi nhận sở hữu chứng khoán của khách hàng an toàn tại HVS.",
  });
}

export default async function SecuritiesDepositoryPage() {
  return <SecuritiesDepositoryModule />;
}
