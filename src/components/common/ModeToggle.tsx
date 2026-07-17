"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Laptop },
  ];

  const currentTheme = themes.find((t) => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Sun;

  const handleChangeTheme = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group border border-secondary/60 hover:border-secondary/80"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={"text-secondary"}
          >
            <CurrentIcon size={20} className=" transition-colors" />
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-44 rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden z-[1000] backdrop-blur-sm"
          >
            <div className="p-1">
              {themes.map((t, index) => {
                const ThemeIcon = t.icon;
                const isActive = theme === t.value;

                return (
                  <motion.button
                    key={t.value}
                    onClick={() => handleChangeTheme(t.value)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ThemeIcon
                      size={18}
                      className={isActive ? "text-blue-600" : "text-gray-600"}
                    />
                    <span>{t.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="ml-auto w-2 h-2 rounded-full bg-blue-600"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Blur when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
