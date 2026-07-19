import Footer from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import React, { PropsWithChildren } from "react";
import PageFlip from "@/components/common/PageFlip";
import { IGlobalSetting, IMenuItem } from "@/types/cms";

interface LayoutComponentsProps extends PropsWithChildren {
  menus?: IMenuItem[];
  globalSetting?: IGlobalSetting | null;
}

const LayoutComponents = ({
  children,
  menus,
  globalSetting,
}: LayoutComponentsProps) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* <Header menus={menus} globalSetting={globalSetting} /> */}
      <div className="flex gap-10">{children}</div>
      <Footer globalSetting={globalSetting} />
    </div>
  );
};

export default LayoutComponents;
