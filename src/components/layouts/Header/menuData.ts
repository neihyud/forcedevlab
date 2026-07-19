import {
  Globe,
  BarChart3,
  Cpu,
  BookOpen,
  FileText,
  TrendingUp,
} from "lucide-react";
import { HelpDropDownIcon } from "@/components/icons";

export interface MenuItemSubItem {
  id: string;
  href: string;
}

export interface MenuItemData {
  id: string;
  icon: any;
  subItems: MenuItemSubItem[];
}

export const menuDataMap: Record<string, MenuItemData[]> = {
  "Dịch vụ": [
    {
      id: "dich_vu_1",
      icon: HelpDropDownIcon,
      subItems: [
        { id: "sub_service_1", href: "/dich-vu/con-1" },
        { id: "sub_service_2", href: "/dich-vu/con-2" },
      ],
    },
    {
      id: "dich_vu_2",
      icon: Globe,
      subItems: [
        { id: "sub_service_3", href: "/dich-vu/con-3" },
        { id: "sub_service_4", href: "/dich-vu/con-4" },
      ],
    },
    {
      id: "dich_vu_3",
      icon: BarChart3,
      subItems: [
        { id: "sub_service_5", href: "/dich-vu/con-5" },
        { id: "sub_service_6", href: "/dich-vu/con-6" },
      ],
    },
    {
      id: "dich_vu_4",
      icon: Cpu,
      subItems: [
        { id: "sub_service_7", href: "/dich-vu/con-7" },
        { id: "sub_service_8", href: "/dich-vu/con-8" },
      ],
    },
  ],
  "Hướng dẫn": [
    {
      id: "huong_dan_co_ban",
      icon: BookOpen,
      subItems: [
        { id: "mo_tai_khoan", href: "/huong-dan/mo-tai-khoan" },
        { id: "nap_rut", href: "/huong-dan/nap-rut" },
      ],
    },
    {
      id: "giao_dich_hvs",
      icon: Globe,
      subItems: [
        { id: "dat_lenh", href: "/huong-dan/dat-lenh" },
        { id: "bang_gia", href: "/huong-dan/bang-gia" },
      ],
    },
  ],
  "Báo cáo phân tích": [
    {
      id: "bao_cao_vi_mo",
      icon: TrendingUp,
      subItems: [
        { id: "nhan_dinh_thi_truong", href: "/bao-cao/thi-truong" },
        { id: "bao_cao_chien_luoc", href: "/bao-cao/chien-luoc" },
      ],
    },
    {
      id: "bao_cao_doanh_nghiep",
      icon: FileText,
      subItems: [
        { id: "cap_nhat_doanh_nghiep", href: "/bao-cao/doanh-nghiep" },
        { id: "khuyen_nghi_dau_tu", href: "/bao-cao/khuyen-nghi" },
      ],
    },
  ],
  "Kiến thức": [
    {
      id: "chung_khoan_co_ban",
      icon: BookOpen,
      subItems: [
        { id: "chung_khoan_la_gi", href: "/kien-thuc/co-ban" },
        { id: "phan_tich_co_ban", href: "/kien-thuc/phan-tich-co-ban" },
      ],
    },
    {
      id: "phan_tich_ky_thuat",
      icon: BarChart3,
      subItems: [
        { id: "cac_mo_hinh_nen", href: "/kien-thuc/ky-thuat" },
        { id: "chi_bao_ky_thuat", href: "/kien-thuc/chi-bao" },
      ],
    },
  ],
  "Hệ sinh thái": [
    {
      id: "nen_tang_giao_dich",
      icon: Cpu,
      subItems: [
        { id: "hvs_trading_web", href: "/he-sinh-thai/web" },
        { id: "hvs_trading_app", href: "/he-sinh-thai/app" },
      ],
    },
    {
      id: "tien_ich_dau_tu",
      icon: Globe,
      subItems: [
        { id: "hvs_robo_advisor", href: "/he-sinh-thai/robo" },
        { id: "cong_cu_tinh_toan", href: "/he-sinh-thai/calculator" },
      ],
    },
  ],
};

export const getMenuDataMapByLocale = (locale: string) => {
  const isEn = locale === "en";

  // Create translated map
  const translatedMap: Record<string, MenuItemData[]> = {};

  // Translating primary keys
  const keyTranslation: Record<string, string> = {
    "Dịch vụ": isEn ? "Services" : "Dịch vụ",
    "Hướng dẫn": isEn ? "Guides" : "Hướng dẫn",
    "Báo cáo phân tích": isEn ? "Reports" : "Báo cáo phân tích",
    "Kiến thức": isEn ? "Knowledge" : "Kiến thức",
    "Hệ sinh thái": isEn ? "Ecosystem" : "Hệ sinh thái",
  };

  Object.entries(menuDataMap).forEach(([key, items]) => {
    const translatedKey = keyTranslation[key] || key;
    translatedMap[translatedKey] = items;
  });

  return { translatedMap, keyTranslation };
};
