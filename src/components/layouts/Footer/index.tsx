import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import logoDefault from "@/lib/assets/images/logo.webp";
import { TikTokIcon } from "@/components/icons";
import { Routes } from "@/lib/enum/routes";
import { IGlobalSetting } from "@/types/cms";
import { getStrapiMediaUrl } from "@/lib/helpers/strapi";

interface FooterProps {
  globalSetting?: IGlobalSetting | null;
}

const Footer = ({ globalSetting }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const hotline = globalSetting?.hotline || "0451210238";
  const email = globalSetting?.email || "cleaningsydney102@gmail.com";
  const address = globalSetting?.address || "Sydney, Australia";

  const logoUrl = globalSetting?.logo
    ? getStrapiMediaUrl(globalSetting.logo.url)
    : null;

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: Routes.ABOUT_US },
        { label: "Services", href: "/#services" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        {
          label: "Service A",
          href: Routes.SERVICE_A,
        },
        { label: "Service B", href: Routes.SERVICE_B },
        { label: "Service C", href: Routes.SERVICE_C },
        {
          label: "Service D",
          href: Routes.SERVICE_D,
        },
        { label: "Service E", href: Routes.SERVICE_E },
        { label: "Service F", href: Routes.SERVICE_F },
      ],
    },
    {
      title: "Contact Info",
      links: [
        {
          label: hotline,
          href: `tel:${hotline.replace(/\s+/g, "")}`,
          icon: Phone,
        },
        {
          label: email,
          href: `mailto:${email}`,
          icon: Mail,
        },
        { label: address, href: "#", icon: MapPin },
      ],
    },
  ];

  // Map CMS social media settings to icons or fallback to default social list
  const socials =
    globalSetting?.socialMedia && globalSetting.socialMedia.length > 0
      ? globalSetting.socialMedia.map((social) => {
          let IconComponent: React.ComponentType<any> = Facebook;
          const network = social.socialNetwork as string;
          if (network === "Instagram") {
            IconComponent = Instagram;
          } else if (network === "TikTok") {
            IconComponent = TikTokIcon;
          }
          return {
            icon: IconComponent,
            href: social.description || "#",
            label: social.title || social.socialNetwork,
          };
        })
      : [
          {
            icon: Facebook,
            href: "https://www.facebook.com",
            label: "Facebook",
          },
          {
            icon: Instagram,
            href: "https://www.instagram.com",
            label: "Instagram",
          },
          { icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok" },
        ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-primary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-all duration-[8000ms] animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 !pb-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4 max-sm:justify-center">
                <Link
                  href={Routes.HOME}
                  className="flex flex-col items-center gap-1 flex-shrink-0 group"
                >
                  <div className="relative transition-all duration-300 group-hover:scale-110">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={globalSetting?.siteName || "logo"}
                        className="relative w-20 h-20 object-contain rounded-full bg-white/10 p-1"
                      />
                    ) : (
                      <img
                        src={logoDefault.src}
                        alt="logo"
                        className="relative w-20 h-20 object-contain"
                      />
                    )}
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-lg font-black text-white leading-tight tracking-tight">
                      {globalSetting?.siteName || "My Business"}
                    </span>
                  </div>
                </Link>
              </div>

              <p className="text-white text-sm leading-relaxed mb-6 max-sm:text-center">
                {globalSetting?.siteDescription ||
                  "Professional services you can trust. Making your life easier, one project at a time."}
              </p>
              {/* Social links */}
              <div className="flex gap-4 max-sm:justify-center [&>a:last-child_path]:fill-primary [&>a:last-child:hover_svg_path]:fill-white">
                {socials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      title={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer links */}
            {footerLinks.map((column, columnIndex) => (
              <div key={columnIndex}>
                <h3 className="font-semibold text-white mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => {
                    const Icon = link.icon;
                    return (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          target={
                            link.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            link.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-white hover:text-primary transition-all duration-200 text-sm flex items-center gap-2 cursor-pointer hover:translate-x-1"
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
            <p>
              © {currentYear} {globalSetting?.siteName || "My Business"}. All
              Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-primary transition-colors cursor-pointer text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors cursor-pointer text-white"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
