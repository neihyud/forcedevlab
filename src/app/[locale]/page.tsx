import Home from "@/modules/home";
import {
  fetchGlobalSetting,
  fetchHomepage,
  fetchMenus,
} from "@/services/cms/global";
import { IGlobalSetting, IMenuItem, IHomepage } from "@/types/cms";
import { IStrapiBase } from "@/types/strapi";

//demo ui
export default async function HomePage() {
  let globalSetting: (IGlobalSetting & IStrapiBase) | null = null;
  let menus: (IMenuItem & IStrapiBase)[] = [];
  let homepage: (IHomepage & IStrapiBase) | null = null;

  try {
    const [globalSettingRes, menusRes, homepageRes] = await Promise.all([
      fetchGlobalSetting(),
      fetchMenus(),
      fetchHomepage(),
    ]);
    globalSetting = globalSettingRes.data;
    menus = menusRes.data;
    homepage = homepageRes.data;
  } catch (error) {
    console.error("Failed to fetch home page CMS data:", error);
  }

  return (
    <Home globalSetting={globalSetting} menus={menus} homepage={homepage} />
  );
}
