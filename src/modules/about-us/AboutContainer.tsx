import React from "react";

interface AboutContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const AboutContainer = ({
  children,
  className = "",
}: AboutContainerProps) => {
  return (
    <div
      className={`relative z-10 w-full max-w-285 mx-auto px-4 lg:px-0 ${className}`}
    >
      {children}
    </div>
  );
};
