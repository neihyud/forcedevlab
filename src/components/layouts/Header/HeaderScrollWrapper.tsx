"use client";

import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function HeaderScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white dark:bg-white/50 backdrop-blur-xl shadow-2xl"
          : isHome
            ? "bg-transparent"
            : "bg-white dark:bg-white/50 backdrop-blur-xl"
      }`}
    >
      {children}
    </header>
  );
}
