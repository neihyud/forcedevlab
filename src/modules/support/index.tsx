"use client";

import React, { useState } from "react";
import { Container, Text, Button } from "@/components/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import Breadcrumb from "@/components/ui/Breadcrumb";

interface SupportItem {
  question: string;
  answer: string;
}

interface SupportCategory {
  title: string;
  items: SupportItem[];
}

interface SupportProps {
  supportData: Record<string, SupportCategory>;
}

export default function SupportModule({ supportData }: SupportProps) {
  const sidebarItems = Object.keys(supportData || {}).map((key) => ({
    key: key,
    label: supportData[key].title,
  }));

  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const keys = Object.keys(supportData || {});
    return keys[0] || "";
  });

  // Breadcrumbs data
  const breadcrumbItems = [
    { title: "Trang chủ", href: "/" },
    { title: "Hỗ trợ", href: "/support" },
    {
      title:
        sidebarItems.find((item) => item.key === activeCategory)?.label || "",
    },
  ];

  const currentCategory = supportData?.[activeCategory];

  return (
    <div className="w-full bg-[#f8f9fb] dark:bg-background pb-6 md:pb-10 select-none">
      {/* ─── BREADCRUMB (Full Width) ─── */}
      <div className="w-full py-[15px] px-[24px] mb-6 md:mb-10">
        <Breadcrumb
          items={breadcrumbItems}
          separator="/"
          className="text-gray-600 dark:text-gray-400 gap-2"
          itemClassName="font-semibold text-gray-800 dark:text-gray-200 hover:text-primary"
          activeClassName="font-medium text-gray-500 dark:text-gray-500"
          separatorClassName="text-gray-400"
        />
      </div>

      <Container size="large" className="max-w-[1240px] px-4 mx-auto">
        {/* ─── MAIN CONTENT LAYOUT ─── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ─── LEFT SIDEBAR ─── */}
          <aside className="w-full lg:w-[305px] shrink-0 bg-white dark:bg-card border border-border rounded-lg overflow-hidden shadow-sm">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white dark:bg-card">
              <span className="text-lg font-bold font-poppins text-text-navy dark:text-primary-foreground">
                Danh mục
              </span>
              <ChevronDown className="w-5 h-5 text-[#03053d] dark:text-primary-foreground" />
            </div>

            {/* Sidebar Menu Items */}
            <nav className="p-2 flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const isActive = activeCategory === item.key;
                return (
                  <Button
                    key={item.key}
                    onClick={() => setActiveCategory(item.key)}
                    variant="text"
                    className={`w-full text-left px-4 py-3 transition-all duration-200 cursor-pointer border-l-[4px] rounded-[6px] justify-start h-auto ${
                      isActive
                        ? "bg-[#e7f1ff] dark:bg-[#1a2e4c] text-[#0f294d] dark:text-primary font-bold border-l-[#0f294d] border-y-transparent border-r-transparent"
                        : "border-l-transparent border-y-transparent border-r-transparent text-[#0f294d] dark:text-foreground/80 hover:bg-gray-50 dark:hover:bg-accent font-normal"
                    }`}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </aside>

          {/* ─── RIGHT CONTENT AREA ─── */}
          <main className="flex-1 w-full bg-white dark:bg-card rounded-lg p-6 md:p-[24px_20px]">
            {currentCategory && (
              <div className="flex flex-col gap-[20px]">
                <Text className="text-display-sm font-bold font-roboto text-[#0f294d] dark:text-foreground leading-[1.2]">
                  {currentCategory.title}
                </Text>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full flex flex-col p-[12px_12px_8px_12px]"
                >
                  {currentCategory.items.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="w-full border-b border-[#ced4da] dark:border-border last:border-none"
                    >
                      <AccordionTrigger
                        className="w-full text-left hover:no-underline font-normal font-roboto text-base text-[#212529] dark:text-foreground pt-3 pb-3 data-[state=open]:pb-2 flex items-center justify-between cursor-pointer px-0"
                        icon={
                          <ChevronDown className="w-6 h-6 text-[#03053d] dark:text-gray-400 pointer-events-none cursor-pointer transition-transform duration-200" />
                        }
                      >
                        <span className="pr-4">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-[#343a40] dark:text-gray-300 text-sm leading-[1.5] pb-3 pt-0 font-roboto px-0">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
