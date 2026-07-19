import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { IGlobalSetting } from "@/types/cms";
import { Container } from "@/components/ui";
import Image from "@/components/ui/Image";
import ContactForm from "./ContactForm";
import heroBanner from "@/lib/assets/images/webp/hero_banner.webp";

interface ContactProps {
  globalSetting: IGlobalSetting | null;
}

export default function Contact({ globalSetting }: ContactProps) {
  const t = useTranslations("Contact");

  return (
    <div className="w-full ">
      <Container className="space-y-8">
        {/* Banner Section */}
        <div className="relative w-full h-45  rounded-2xl overflow-hidden flex flex-col justify-center items-center text-center px-4 shadow-md">
          {/* Background Image */}
          <Image
            src={heroBanner}
            alt="Hero Banner"
            fill
            priority
            className="object-cover select-none pointer-events-none"
          />

          <h1 className="relative text-2xl md:text-[32px] font-extrabold text-white mb-2">
            {t("title")}
          </h1>
          <p className="relative text-sm md:text-base text-white opacity-80 max-w-xl ">
            {t("subtitle")}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone Card */}
          <div className="bg-white dark:bg-gray-800 rounded-[12px] p-6 shadow-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-full bg-[#FF9C00] text-white shrink-0 shadow-sm">
                  <Phone className="size-6" />
                </div>
                <h2 className="text-lg font-bold text-[#0F2451]">
                  {t("phone")}
                </h2>
              </div>
              <div>
                <p className="text-base font-semibold text-[#0F2451]">
                  {globalSetting?.hotline}
                </p>
                <p className="text-sm text-[#667085]">
                  {globalSetting?.workingHours}
                </p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white dark:bg-gray-800 rounded-[12px] p-6 shadow-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-full bg-[#FF9C00] text-white shrink-0 shadow-sm">
                  <Mail className="size-6" />
                </div>
                <h2 className="text-lg font-bold text-[#0F2451]">
                  {t("email")}
                </h2>
              </div>
              <div>
                <p className="text-lg font-semibold text-[#0F2451]">
                  {globalSetting?.email}
                </p>
                <p className="text-sm text-[#667085]">{globalSetting?.fax}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Map & Form Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch pb-12">
          {/* Google Map Section */}
          <div className="bg-white dark:bg-gray-800 rounded-[12px]  shadow-300  dark:border-gray-700 flex flex-col min-h-[450px] lg:min-h-0">
            <div className="w-full h-full flex-1 rounded-xl overflow-hidden relative  dark:border-gray-700">
              <iframe
                title="HVS Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26345.63751509113!2d105.81728839999998!3d20.9981739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5ac9beb0bd%3A0xc4069a08defd1deb!2sChung%20c%C6%B0%20Golden%20West!5e1!3m2!1sen!2s!4v1784405314536!5m2!1sen!2s"

                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Contact Form Section */}
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
