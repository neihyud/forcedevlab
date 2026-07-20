import React from "react";
import MarginBanner from "./components/MarginBanner";
import MarginExplanation from "./components/MarginExplanation";
import MarginSummary from "./components/MarginSummary";

export default function MarginTradingModule() {
  return (
    <div className="w-full bg-[#F5F8FF] dark:bg-gray-900 min-h-screen pb-16 md:pb-24">
      <MarginBanner />
      <MarginExplanation />
      <MarginSummary />
    </div>
  );
}
