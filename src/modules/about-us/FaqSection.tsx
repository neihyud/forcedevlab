"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import { ChevronUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "HVS là công ty chứng khoán như thế nào?",
    answer:
      "HVS là một trong những định chế tài chính uy tín tại Việt Nam, chuyên cung cấp các giải pháp chứng khoán và tư vấn đầu tư toàn diện. Chúng tôi kết hợp công nghệ hiện đại với đội ngũ chuyên gia giàu kinh nghiệm để mang lại hiệu quả đầu tư tối ưu cho khách hàng.",
  },
  {
    question: "Làm thế nào để mở tài khoản giao dịch tại HVS?",
    answer:
      "Bạn có thể mở tài khoản trực tuyến thông qua ứng dụng HVS hoặc trực tiếp tại văn phòng. Quá trình đăng ký đơn giản, nhanh chóng và được xác thực eKYC trong vòng vài phút.",
  },
  {
    question: "HVS có những sản phẩm đầu tư nào?",
    answer:
      "HVS cung cấp đa dạng sản phẩm: giao dịch cổ phiếu, trái phiếu, chứng quyền, phái sinh, cùng các dịch vụ tư vấn danh mục và quản lý tài sản chuyên nghiệp.",
  },
  {
    question: "Phí giao dịch tại HVS được tính như thế nào?",
    answer:
      "Phí giao dịch tại HVS cạnh tranh và minh bạch, được tính theo giá trị giao dịch thực tế. Bạn có thể xem bảng phí chi tiết trên website hoặc liên hệ đội ngũ tư vấn để được hỗ trợ.",
  },
  {
    question: "HVS có hỗ trợ giao dịch ký quỹ (margin) không?",
    answer:
      "Có, HVS cung cấp dịch vụ giao dịch ký quỹ với tỷ lệ hấp dẫn và danh sách cổ phiếu được phép margin đa dạng. Điều kiện và tỷ lệ ký quỹ sẽ được thông báo cụ thể khi mở tài khoản.",
  },
  {
    question: "Thông tin tài khoản và giao dịch của tôi có được bảo mật?",
    answer:
      "Chúng tôi áp dụng các công nghệ bảo mật tiên tiến nhất, bao gồm mã hóa SSL, xác thực 2 lớp (2FA) và hệ thống giám sát 24/7 để đảm bảo an toàn tuyệt đối cho tài sản và thông tin khách hàng.",
  },
  {
    question: "Tôi có thể theo dõi danh mục đầu tư ở đâu?",
    answer:
      "Bạn có thể theo dõi và quản lý toàn bộ danh mục đầu tư của mình thông qua ứng dụng HVS trên điện thoại hoặc website trading.hvsvn.com, cập nhật theo thời gian thực.",
  },
  {
    question: "Làm thế nào để liên hệ với bộ phận hỗ trợ của HVS?",
    answer:
      "Bạn có thể liên hệ với chúng tôi qua hotline (+84-24) 38869999, email info@hvsvn.com hoặc chat trực tiếp trên ứng dụng. Đội ngũ hỗ trợ luôn sẵn sàng phục vụ từ 8:00 - 17:00 các ngày làm việc.",
  },
];

import { IFaqSection } from "@/services/mocks/faq.mock";

interface FaqSectionProps {
  faq?: IFaqSection | null;
}

export function FaqSection({ faq = null }: FaqSectionProps) {
  const [openItems, setOpenItems] = useState<string[]>(["faq-0"]);

  const title = faq?.title || "Những câu hỏi thường gặp";
  const subtitle =
    faq?.subtitle ||
    "Chúng tôi luôn sẵn sàng hỗ trợ để đưa ra giải pháp tốt nhất";
  const items = faq?.items || FAQ_DATA;

  return (
    <section className="w-full bg-gray-0 dark:bg-background pb-24">
      <div className="max-w-[1200px] w-full mx-auto px-4">
        {/* ── Header ── */}
        <div className="flex flex-col items-center pt-0 mb-6">
          <h2 className="text-display-xs font-bold text-primary-500 dark:text-primary-foreground text-center leading-8 font-poppins mb-0">
            {title}
          </h2>
          <p className="text-sm font-medium text-gray-900 dark:text-muted-foreground text-center leading-[30px] font-poppins mt-0">
            {subtitle}
          </p>

          <Link
            href="/support"
            className={cn(
              "inline-flex items-center justify-center mt-4 w-36 h-11.5 p-1 rounded-lg",
              "bg-[linear-gradient(90deg,rgba(0,41,99,0)_0%,rgba(0,41,99,0.3)_100%)]",
              "hover:opacity-90 active:scale-[0.98] transition-all duration-200",
            )}
          >
            <span
              className={cn(
                "w-full h-full flex items-center justify-center rounded-[6px] text-sm font-bold text-white leading-5.5 py-2 px-4",
                "bg-[linear-gradient(90deg,#00122C_0%,#002963_100%),radial-gradient(70.45%_140.91%_at_50%_98.72%,#FFC402_0%,#FF9C00_50%)]",
              )}
            >
              Tìm hiểu thêm
            </span>
          </Link>
        </div>

        {/* ── Two-column FAQ grid using CSS columns ── */}
        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className="columns-1 lg:columns-2 gap-6 lg:gap-12 mt-9 [column-fill:_balance]"
        >
          {items.map((item, idx) => {
            const value = `faq-${idx}`;
            const isOpen = openItems.includes(value);
            return (
              <AccordionItem
                key={idx}
                value={value}
                className="break-inside-avoid mb-3 bg-white dark:bg-card overflow-hidden transition-all duration-200 rounded-sm border-y-0 border-r-0 border-l-[3px] border-l-primary-500 dark:border-l-secondary shadow-[0_4px_20px_rgba(11,18,55,0.04)] w-full"
              >
                <AccordionTrigger
                  icon={
                    isOpen ? (
                      <ChevronUp className="w-5 h-5 shrink-0 text-primary-500 dark:text-secondary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 shrink-0 text-gray-900 dark:text-foreground" />
                    )
                  }
                  className={cn(
                    "w-full flex items-center justify-between gap-6 py-4 px-5 text-left cursor-pointer transition-colors duration-200 min-h-[56px] border-none hover:no-underline",
                    isOpen ? "rounded-t-sm" : "rounded-sm",
                    !isOpen &&
                      "bg-white dark:bg-card hover:bg-gray-50 dark:hover:bg-accent",
                  )}
                  style={
                    isOpen
                      ? {
                          background:
                            "linear-gradient(272.05deg, color-mix(in srgb, var(--color-primary-300) 5%, transparent) 2.84%, color-mix(in srgb, var(--color-primary-25) 60%, transparent) 78.16%)",
                        }
                      : undefined
                  }
                >
                  <span
                    className={cn(
                      "text-md font-roboto font-medium leading-6 tracking-[0.15px] flex-1 pr-2",
                      isOpen
                        ? "text-primary-500 dark:text-secondary"
                        : "text-primary-500 dark:text-foreground",
                    )}
                  >
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-card p-0">
                  <div className="py-4 px-5">
                    <p className="text-sm font-medium leading-[22px] text-[#474747] dark:text-gray-300 font-poppins">
                      {item.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
