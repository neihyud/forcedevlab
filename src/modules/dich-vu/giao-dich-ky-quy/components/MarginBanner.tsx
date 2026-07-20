import { ArrowRightIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import bannerMarginTrading from "@/lib/assets/images/webp/margin-trading/banner-section.webp";
import marginTradingRightSide from "@/lib/assets/images/webp/margin-trading/hero-illustration.webp";
import { useTranslations } from "next-intl";

import ButtonApp from "@/components/common/Button/ButtonApp";
import Image from "@/components/ui/Image";

export default function MarginBanner() {
  const t = useTranslations("MarginTrading");

  return (
    <div className="w-full  text-white py-12 md:py-20 relative overflow-hidden">
      {/* Abstract shapes overlay for premium feel */}

      <Image
        src={bannerMarginTrading}
        alt="Banner Margin Trading Background"
        fill
        priority
        quality={100}
        className="object-cover  select-none pointer-events-none "
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Title & Text */}
          <div className="lg:col-span-6 text-left space-y-6  z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight">
              {t("bannerTitle")}
            </h1>
            <p className="text-sm md:text-lg text-[#E5E7EB] leading-relaxed max-w-2xl ">
              {t("bannerDesc")}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <ButtonApp
                text={t("btnDetail")}
                icon={<ArrowRightIcon className="w-6 h-6" />}
                withOuterLayer={true}
                className="text-[17px] flex-1 leading-6.25"
              />
              <ButtonApp
                text={t("btnFee")}
                color="#FFFFFF"
                background="#FFFFFF14"
                withOuterLayer={true}
                className="text-[17px] flex-1 leading-6.25"
                backgroundLayer="linear-gradient(90deg, rgba(0, 41, 99, 0) 0%, rgba(0, 41, 99, 0.3) 100%)"
              />
            </div>
          </div>

          {/* Right Column: Image Placeholder (Fallback BG) */}
          <div className="lg:col-span-6 z-10">
            <div className="relative aspect-[1.6/1] w-full rounded-3xl overflow-hidden    flex flex-col items-center justify-center p-6 text-center group">
              <Image
                src={marginTradingRightSide}
                alt="Margin Trading Right Side"
                fill
                priority
                quality={100}
                className="object-cover  select-none pointer-events-none "
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
