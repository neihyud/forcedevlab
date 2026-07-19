import SupportModule from "@/modules/support";
import { fetchSupportData } from "@/services/cms";

export default async function SupportPage() {
  const supportRes = await fetchSupportData();
  return <SupportModule supportData={supportRes.data} />;
}
