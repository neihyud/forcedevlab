import { ArrowRightIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/routing";
import { StaticImageData } from "next/image";

import ButtonApp from "@/components/common/Button/ButtonApp";
import Image from "@/components/ui/Image";

interface MarginBannerProps {
  title: string;
  description: string;
  buttonText1: string;
  buttonText2: string;
  buttonLink1: string;
  buttonLink2: string;
  bgImage: StaticImageData | string;
  heroImage: StaticImageData | string;
}

export default function MarginBanner({
  title,
  description,
  buttonText1,
  buttonText2,
  buttonLink1,
  buttonLink2,
  bgImage,
  heroImage,
}: MarginBannerProps) {
  return (
    <div className="w-full text-white py-12 md:py-20 relative overflow-hidden">
      {/* Abstract shapes overlay for premium feel */}

      <Image
        src={bgImage}
        alt="Banner Background"
        fill
        priority
        quality={100}
        className="object-cover select-none pointer-events-none"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Title & Text */}
          <div className="lg:col-span-6 text-left space-y-6 z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight">
              {title}
            </h1>
            <p className="text-sm md:text-lg text-[#E5E7EB] leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href={buttonLink1} className="flex-1 min-w-[200px] flex">
                <ButtonApp
                  text={buttonText1}
                  icon={<ArrowRightIcon className="w-6 h-6" />}
                  withOuterLayer={true}
                  fullWidth={true}
                  className="text-[17px] leading-6.25"
                />
              </Link>
              {buttonText2 ? (
                <Link href={buttonLink2} className="flex-1 min-w-[200px] flex">
                  <ButtonApp
                    text={buttonText2}
                    color="#FFFFFF"
                    background="#FFFFFF14"
                    withOuterLayer={true}
                    fullWidth={true}
                    className="text-[17px] leading-6.25"
                    backgroundLayer="linear-gradient(90deg, rgba(0, 41, 99, 0) 0%, rgba(0, 41, 99, 0.3) 100%)"
                  />
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-6 z-10">
            <div className="relative aspect-[1.6/1] w-full rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 text-center group">
              <Image
                src={heroImage}
                alt="Banner Hero Image"
                fill
                priority
                quality={100}
                className="object-cover select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
