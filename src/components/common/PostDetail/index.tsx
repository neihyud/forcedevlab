import CompactPostCard from "@/components/common/CompactPostCard";
import { FacebookIcon, LinkedinIcon, UploadIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { getStrapiImageUrl } from "@/lib/helpers/strapi";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { Link } from "@/i18n/routing";
import React from "react";

export type TPostDetailCategory = {
  id: string | number;
  title: string;
  slug: string;
  href: string;
};

export type TPostDetailRelated = {
  id: string | number;
  title: string;
  imageSrc: string | StaticImageData;
  date: string;
  categoryTitle?: string;
  href: string;
  readingTime?: string;
};

export type PostDetailProps = {
  /** Post detail attributes */
  title: string;
  category?: {
    title: string;
    slug: string;
  } | null;
  publicAt: string;
  readingTime?: string | null;
  keyword?: string | null;
  imageSrc?: string | null;
  description?: string | null;
  sourceLink?: string | null;
  author?: {
    name: string;
    avatarSrc?: string | StaticImageData | null;
  } | null;

  /** Sidebar lists */
  categoriesList?: TPostDetailCategory[];
  activeCategorySlug?: string;
  relatedPosts?: TPostDetailRelated[];

  /** Labels & Translations */
  labels?: {
    home?: string;
    categoryTitle?: string;
    relatedTitle?: string;
    noRelated?: string;
    noContent?: string;
    viewSource?: string;
    formTitle?: string;
    formSubtitle?: string;
    registerNow?: string;
  };
  className?: string;
};

export const PostDetail: React.FC<PostDetailProps> = ({
  title,
  category,
  publicAt,
  readingTime,
  keyword,
  imageSrc,
  description,
  sourceLink,
  author,
  categoriesList = [],
  activeCategorySlug,
  relatedPosts = [],
  labels = {},
  className,
}) => {
  // Localization labels fallbacks
  const lHome = labels.home || "Trang chủ";
  const lCategoryTitle = labels.categoryTitle || "Danh mục";
  const lRelatedTitle = labels.relatedTitle || "Bài viết liên quan";
  const lNoRelated = labels.noRelated || "Không có bài viết liên quan";
  const lNoContent = labels.noContent || "Nội dung đang được cập nhật...";
  const lViewSource = labels.viewSource || "Xem tài liệu gốc";
  const t = useTranslations("Common");

  // Date formatter
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={cn("w-full  min-h-screen py-5", className)}>
      <Container>
        {/* ─── BREADCRUMB ─── */}
        <nav className="flex items-center space-x-2 text-sm text-[#475467] dark:text-gray-400 mb-6 md:mb-8 font-medium">
          <Link href="/" className="hover:text-[#FF9C00] transition-colors">
            {lHome}
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          {category && (
            <>
              <span className="text-gray-400">{category.title}</span>
              <span className="text-gray-300 dark:text-gray-600">/</span>
            </>
          )}
          <span className="text-[#FF9C00] line-clamp-1">{title}</span>
        </nav>

        {/* ─── MAIN GRID (3 - 9) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT SIDEBAR (Col span 3) */}
          <aside className="lg:col-span-3 space-y-2 lg:sticky top-6 bg-white">
            {/* Category selection list */}
            {categoriesList.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-sm  overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700/50">
                  <h3 className="text-base font-bold text-blue-24 dark:text-white uppercase tracking-wider">
                    {lCategoryTitle}
                  </h3>
                  <span className="text-gray-400 dark:text-gray-500">▼</span>
                </div>
                <div className="flex flex-col">
                  {categoriesList.map((cat) => {
                    const isActive = activeCategorySlug === cat.slug;
                    return (
                      <Link
                        key={cat.id}
                        href={cat.href}
                        className={cn(
                          "px-5 py-3.5 text-sm font-medium text-left border-l-4 transition-all",
                          isActive
                            ? "bg-[#F4F6F9] dark:bg-gray-700/50 text-blue-24 dark:text-[#FF9C00] border-blue-24 dark:border-[#FF9C00] font-semibold"
                            : "border-transparent text-[#475467] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/20",
                        )}
                      >
                        {cat.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related Articles Compact cards */}
            <div className="bg-white dark:bg-gray-800 rounded-sm p-4 pt-6 border-t border-[#E4E7EC] dark:border-gray-700 ">
              <h3 className="text-lg font-bold text-blue-24 dark:text-white mb-4">
                {lRelatedTitle}
              </h3>

              {relatedPosts.length === 0 ? (
                <p className="text-sm text-[#667085] dark:text-gray-400 italic">
                  {lNoRelated}
                </p>
              ) : (
                <div className="space-y-4">
                  {relatedPosts.map((item) => (
                    <CompactPostCard
                      key={item.id}
                      href={item.href}
                      imageSrc={item.imageSrc}
                      imageAlt={item.title}
                      badge={item.categoryTitle}
                      date={formatDate(item.date)}
                      title={item.title}
                      layout="horizontal"
                      readingTime={item.readingTime}
                    />
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT (Col span 9) */}
          <main className="lg:col-span-9 bg-white dark:bg-gray-800 rounded-md px-5 py-6 ">
            {/* Title & Badge */}
            <div className="space-y-4 text-left pb-6">
              {category && (
                <span className="inline-flex items-center bg-orange-50 dark:bg-orange-950/30 rounded-full py-1 px-2.5 font-bold text-xs text-blue-24 tracking-wider">
                  {category.title}
                </span>
              )}
              <h1 className="text-2xl md:text-[32px] font-bold text-blue-24 dark:text-white leading-tight">
                {title}
              </h1>

              {/* Author & Publish Info Row */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    {author?.avatarSrc ? (
                      <Image
                        src={getStrapiImageUrl(author.avatarSrc)}
                        alt={author?.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-24 text-white text-sm font-bold uppercase">
                        {author?.name.charAt(0) || "HVS"}
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-blue-24 dark:text-white">
                      {author?.name || "HVS Research Team"}
                    </p>
                    <div className="flex mt-0.5 items-center space-x-1.5 text-xs  text-[#667085] ">
                      <span>• {formatDate(publicAt)}</span>
                      {readingTime && (
                        <>
                          <span>•</span>
                          <span className="lowercase">
                            {readingTime} {t("timeReading")}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div>
                    <UploadIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <FacebookIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cover Image */}
            {/* {imageSrc && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-sm bg-gray-50 dark:bg-gray-900">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1200px) 100vw, 80vw"
                />
              </div>
            )} */}

            {/* CKEditor HTML Description Content */}
            <article className="prose prose-base prose-blue dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-blue-13 dark:prose-headings:text-white prose-p:leading-relaxed prose-p:text-[#344054] dark:prose-p:text-gray-300 text-left">
              {description ? (
                <div
                  className="ck-content"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              ) : (
                <p className="text-[#667085] dark:text-gray-400 italic">
                  {lNoContent}
                </p>
              )}
            </article>

            {/* Source Link */}
            {/* {sourceLink && (
              <div className="flex justify-start border-t border-gray-100 dark:border-gray-700/50 pt-6">
                <a
                  href={sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-bold text-sm bg-blue-24 hover:bg-blue-13 text-white px-6 py-3 rounded-xl transition-colors space-x-2 shadow-sm"
                >
                  <span>{lViewSource}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </a>
              </div>
            )} */}
          </main>
        </div>
      </Container>
    </div>
  );
};

PostDetail.displayName = "PostDetail";

export default PostDetail;
