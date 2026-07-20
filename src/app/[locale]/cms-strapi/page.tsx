import CmsStrapi from "@/modules/cms-strapi";
import { IGlobalSetting, IMenuItem } from "@/types/cms";
import { IStrapiBase } from "@/types/strapi";

//demo ui
export default async function HomePage() {
  const globalSetting: (IGlobalSetting & IStrapiBase) | null = null;
  const menus: (IMenuItem & IStrapiBase)[] = [];

  return <CmsStrapi globalSetting={globalSetting} menus={menus} />;
}
