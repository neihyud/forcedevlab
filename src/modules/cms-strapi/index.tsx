import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { getStrapiMediaUrl } from "@/lib/helpers/strapi";
import { IGlobalSetting, IMenuItem } from "@/types/cms";
import { IStrapiBase } from "@/types/strapi";
import { useTranslations, useLocale } from "next-intl";
import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
} from "lucide-react";
import React from "react";
import RefreshStatusBar from "./RefreshStatusBar";

// ─── Loading Skeleton ──────────────────────────────────────────────────────────

// ─── Error State ───────────────────────────────────────────────────────────────
function CmsError({ message }: { message: string }) {
  const t = useTranslations("Dashboard");
  return (
    <Card
      padding="2rem"
      className="border border-destructive/20 bg-destructive/5"
    >
      <CardContent>
        <div className="flex flex-col items-center gap-4 text-center py-6">
          <div className="p-3 rounded-full bg-destructive/10">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-destructive mb-1">
              {t("cannotLoad")}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Info Item ──────────────────────────────────────────────────────────────────
function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors">
      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground mt-0.5 truncate">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

// ─── Social Media Badge ────────────────────────────────────────────────────────
const socialIcons: Record<string, { bg: string; text: string }> = {
  Facebook: { bg: "bg-blue-500/10", text: "text-blue-600" },
  Twitter: { bg: "bg-sky-500/10", text: "text-sky-600" },
  TikTok: { bg: "bg-pink-500/10", text: "text-pink-600" },
};

// ─── Menu Tree Item ────────────────────────────────────────────────────────────
function MenuTreeItem({
  item,
  depth = 0,
}: {
  item: IMenuItem & IStrapiBase;
  depth?: number;
}) {
  const locale = useLocale();
  const isActive = item.active === "ACTIVE";
  const hasChildren = item.child && item.child.length > 0;

  return (
    <div>
      <div
        className={`group flex items-center gap-2 py-2 px-3 rounded-xl transition-all hover:bg-accent/50 ${
          depth > 0 ? "ml-6" : ""
        }`}
      >
        {depth > 0 && <div className="w-4 h-px bg-border shrink-0" />}
        <ChevronRight
          className={`size-3.5 text-muted-foreground shrink-0 transition-transform ${
            hasChildren ? "text-primary" : "opacity-30"
          }`}
        />
        <span
          className={`text-sm font-medium flex-1 ${isActive ? "text-foreground" : "text-muted-foreground line-through"}`}
        >
          {locale === "en" && item.title_en ? item.title_en : item.title}
        </span>
        {item.link && (
          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-mono">
            {item.link}
          </span>
        )}
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
            isActive
              ? "bg-success/10 text-success"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {isActive ? (
            <CheckCircle className="size-2.5" />
          ) : (
            <AlertCircle className="size-2.5" />
          )}
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
      {hasChildren &&
        item.child.map((child) => (
          <MenuTreeItem key={child.id} item={child} depth={depth + 1} />
        ))}
    </div>
  );
}

// ─── Main Home Component ───────────────────────────────────────────────────────
interface HomeProps {
  globalSetting: (IGlobalSetting & IStrapiBase) | null;
  menus: (IMenuItem & IStrapiBase)[];
}

const CmsStrapi = ({ globalSetting, menus }: HomeProps) => {
  const t = useTranslations("Dashboard");
  const locale = useLocale();
  const lastFetched = new Date().toISOString();

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 max-w-5xl space-y-6">
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Status Bar */}
      <RefreshStatusBar lastFetched={lastFetched} />

      {/* Error State */}
      {!globalSetting && <CmsError message={t("cannotLoadDesc")} />}

      {/* Content */}
      {globalSetting && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* ──── Header: Logo + Site Info ──── */}
          <Card padding="1.5rem" shadow="md">
            <CardContent>
              <div className="flex items-center gap-5">
                {globalSetting.logo && (
                  <div className="shrink-0 p-2 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
                    <img
                      src={getStrapiMediaUrl(globalSetting.logo.url)}
                      alt={
                        globalSetting.logo.alternativeText ||
                        globalSetting.siteName
                      }
                      className="h-14 w-auto object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-foreground truncate">
                    {globalSetting.siteName}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                    {globalSetting.siteDescription}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ──── Info Cards Grid ──── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Site Information */}
            <Card padding="1.25rem" shadow="sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="size-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("siteInfo")}
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={globalSetting.email}
                />
                <InfoItem
                  icon={Phone}
                  label="Hotline"
                  value={globalSetting.hotline}
                />
                <InfoItem
                  icon={MapPin}
                  label="Địa chỉ"
                  value={globalSetting.address}
                />
                <InfoItem
                  icon={BarChart3}
                  label="Google Analytics"
                  value={globalSetting.googleAnalyticsId}
                />
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card padding="1.25rem" shadow="sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <ExternalLink className="size-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("socialMedia")}
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                {globalSetting.socialMedia &&
                globalSetting.socialMedia.length > 0 ? (
                  <div className="space-y-3">
                    {globalSetting.socialMedia.map((social) => {
                      const style = socialIcons[social.socialNetwork] || {
                        bg: "bg-muted",
                        text: "text-foreground",
                      };
                      return (
                        <div
                          key={social.id}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors"
                        >
                          <div
                            className={`p-2 rounded-lg ${style.bg} shrink-0`}
                          >
                            <Globe className={`size-4 ${style.text}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-foreground">
                                {social.title}
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${style.bg} ${style.text}`}
                              >
                                {social.socialNetwork}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {social.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Chưa có mạng xã hội nào được cấu hình.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ──── Menu Tree ──── */}
          <Card padding="1.25rem" shadow="sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChevronRight className="size-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("menuStructure")}
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {menus.length} {locale === "en" ? "root items" : "mục gốc"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {menus.length > 0 ? (
                <div className="space-y-1">
                  {menus.map((menu) => (
                    <MenuTreeItem key={menu.id} item={menu} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Chưa có menu nào được tạo.
                </p>
              )}
            </CardContent>
          </Card>

          {/* ──── Webhook Info ──── */}
          <Card
            padding="1.25rem"
            shadow="none"
            className="border border-dashed border-border"
          >
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-info/10 shrink-0 mt-0.5">
                  <RefreshCw className="size-4 text-info" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">
                    Auto-Revalidation đã được cấu hình (ISR)
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Khi thay đổi dữ liệu trên Strapi CMS, cache Next.js sẽ tự
                    động revalidate qua webhook lifecycle. Bấm nút &quot;Làm
                    mới&quot; sẽ yêu cầu client refresh lại route từ Server.
                  </p>
                  <code className="inline-block mt-2 text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground">
                    POST /api/revalidate
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CmsStrapi;
