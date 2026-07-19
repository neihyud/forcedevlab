import Footer from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PropsWithChildren } from "react";
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
    <div className="flex flex-col min-h-screen relative bg-background text-foreground">
      <Header menus={menus} globalSetting={globalSetting} />
      <main className="flex-1 flex flex-col">
        <PageFlip />
        {children}
      </main>
      <Footer globalSetting={globalSetting} />
    </div>
  );
};

export default LayoutComponents;
