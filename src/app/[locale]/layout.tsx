import type { Metadata, Viewport } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import LayoutComponents from "@/components/layouts/LayoutComponents";
import { fetchGlobalSetting, fetchMenus } from "@/services/cms/global";
import { getStrapiMediaUrl } from "@/lib/helpers/strapi";
import { IGlobalSetting, IMenuItem } from "@/types/cms";
import { IStrapiBase } from "@/types/strapi";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let siteName = "My Business";
  let description =
    "An example business website description. Providing reliable products and premium services to our clients.";
  let logoUrl = "/logo-placeholder.png";
  let faviconUrl = "/favicon.ico";

  try {
    const globalSettingRes = await fetchGlobalSetting();
    const globalSetting = globalSettingRes.data;

    if (globalSetting) {
      siteName = globalSetting.siteName || siteName;
      description = globalSetting.siteDescription || description;
      if (globalSetting.logo) {
        logoUrl = getStrapiMediaUrl(globalSetting.logo.url);
      }
      if (globalSetting.favicon) {
        faviconUrl = getStrapiMediaUrl(globalSetting.favicon.url);
      }
    }
  } catch (error) {
    console.error(
      "Failed to fetch CMS metadata, using default metadata settings.",
      error,
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${siteName} - Premium Services`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [],
    authors: [
      {
        name: siteName,
        url: baseUrl,
      },
    ],
    creator: siteName,
    publisher: siteName,

    // Open Graph
    openGraph: {
      type: "website",
      url: baseUrl,
      title: `${siteName} - Premium Services`,
      description,
      siteName,
      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} - Professional Services`,
        },
      ],
      locale: "en_AU",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `${siteName} - Premium Services`,
      description,
      images: [logoUrl],
      creator: "@mybusiness",
    },

    // Additional SEO
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: "index, follow",
    },

    // Canonical
    alternates: {
      canonical: baseUrl,
      languages: {
        "en-AU": `${baseUrl}`,
      },
    },

    // Icons
    icons: {
      icon: [
        {
          url: faviconUrl,
          sizes: "any",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
      ],
      apple: "/logo-maskable.png",
    },

    // Manifest
    manifest: "/site.webmanifest",

    // App links
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: siteName,
    },

    // Verification
    verification: {
      google: "your-google-search-console-id",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  let globalSetting: (IGlobalSetting & IStrapiBase) | null = null;
  let menus: (IMenuItem & IStrapiBase)[] = [];

  try {
    const [globalSettingRes, menusRes] = await Promise.all([
      fetchGlobalSetting(),
      fetchMenus(),
    ]);
    globalSetting = globalSettingRes.data;
    menus = menusRes.data;
  } catch (error) {
    console.error("Failed to fetch layout data on server side:", error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const siteName = globalSetting?.siteName || "My Business";
  const description =
    globalSetting?.siteDescription ||
    "An example business website description. Providing reliable products and premium services to our clients.";

  const logoUrl = globalSetting?.logo
    ? getStrapiMediaUrl(globalSetting.logo.url)
    : `${baseUrl}/logo-placeholder.png`;

  const hotline = globalSetting?.hotline || "0123456789";
  const email = globalSetting?.email || "contact@example.com";
  const address = globalSetting?.address || "123 Example St, City, Country";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": baseUrl,
              name: siteName,
              image: logoUrl,
              description,
              url: baseUrl,
              telephone: hotline,
              email: email,
              address: {
                "@type": "PostalAddress",
                streetAddress: address,
                addressLocality: "Sydney",
                addressRegion: "NSW",
                postalCode: "2000",
                addressCountry: "AU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-33.8688",
                longitude: "151.2093",
              },
              sameAs: ["https://www.facebook.com", "https://www.instagram.com"],
              priceRange: "$$",
              areaServed: "Sydney, NSW, Australia",
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "-33.8688",
                  longitude: "151.2093",
                },
                geoRadius: "50",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "2000",
              },
            }),
          }}
        />

        {/* Structured Data - Organization (Schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: baseUrl,
              logo: logoUrl,
              description,
              sameAs: ["https://www.facebook.com", "https://www.instagram.com"],
            }),
          }}
        />

        {/* Breadcrumb Navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: baseUrl,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Services",
                  item: `${baseUrl}/service`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Booking",
                  item: `${baseUrl}/booking`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "About Us",
                  item: `${baseUrl}/about-us`,
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Pricing",
                  item: `${baseUrl}/pricing`,
                },
              ],
            }),
          }}
        />

        {/* Apple icons */}
        <link rel="apple-touch-icon" href="/logo-maskable.png" />

        {/* Android Chrome */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="var(--primary)"
              zIndex={100000}
              showSpinner={false}
              crawlSpeed={200}
              crawl={true}
              height={3}
            />
            <LayoutComponents menus={menus} globalSetting={globalSetting}>
              {children}
            </LayoutComponents>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
