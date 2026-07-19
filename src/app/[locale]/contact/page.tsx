import React from "react";
import { Metadata } from "next";
import Contact from "@/modules/contact";
import { getSeoMetadata } from "@/lib/utils/seo";
import { fetchGlobalSetting } from "@/services/cms/global";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return getSeoMetadata({
    path: "/contact",
    locale,
    fallbackTitle: "Liên hệ",
    fallbackDescription:
      "Liên hệ với chúng tôi để được tư vấn và hỗ trợ nhanh nhất.",
  });
}

export default async function ContactPage() {
  let globalSetting;

  try {
    const globalSettingRes = await fetchGlobalSetting();
    globalSetting = globalSettingRes.data;
  } catch (error) {
    console.error("Failed to fetch contact page global settings:", error);
  }

  return <Contact globalSetting={globalSetting} />;
}
