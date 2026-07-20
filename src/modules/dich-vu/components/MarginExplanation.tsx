import React from "react";
import { Container } from "@/components/ui/Container";
import Image from "@/components/ui/Image";
import { StaticImageData } from "next/image";

interface MarginExplanationProps {
  badgeText: string;
  title: string;
  desc1: React.ReactNode;
  desc2?: React.ReactNode;
  image: StaticImageData | string;
}

export default function MarginExplanation({
  badgeText,
  title,
  desc1,
  desc2,
  image,
}: MarginExplanationProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 py-12 md:py-17">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Image Illustration */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[1.6/1] w-full rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 text-center group">
              <Image
                src={image}
                alt="Service Explanation Background"
                fill
                priority
                quality={100}
                className="object-cover select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Right Column: Content Description */}
          <div className="lg:col-span-6 text-left space-y-4 order-1 lg:order-2">
            <span className="inline-flex items-center bg-[#F5A624] rounded-full py-1.5 px-4 font-bold text-xs text-white uppercase tracking-widest">
              {badgeText}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-blue-24 dark:text-white leading-tight uppercase">
              {title}
            </h2>
            <div className="space-y-4 mt-8 text-sm md:text-base text-grey-25 dark:text-gray-300 leading-relaxed">
              <p>{desc1}</p>
              {desc2 && <p>{desc2}</p>}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
