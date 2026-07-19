import Home from "@/modules/home";
import { fetchGlobalSetting, fetchMenus } from "@/services/cms/global";
import { IGlobalSetting, IMenuItem } from "@/types/cms";
import { IStrapiBase } from "@/types/strapi";

//demo ui
export default async function HomePage() {
  let globalSetting: (IGlobalSetting & IStrapiBase) | null = null;
  let menus: (IMenuItem & IStrapiBase)[] = [];

  try {
    const [globalSettingRes, menusRes] = await Promise.all([
      fetchGlobalSetting(),
      fetchMenus(),
    ]);
    globalSetting = globalSettingRes.data;
    menus = menusRes.data;
  } catch (error) {
    console.error("Failed to fetch home page CMS data:", error);
  }

  return <Home globalSetting={globalSetting} menus={menus} />;
}
