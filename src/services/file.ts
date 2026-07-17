import CustomAxiosInstance from "@/services/api";

export class FileApi {
  apiInstance: CustomAxiosInstance;
  constructor(apiInstance: CustomAxiosInstance) {
    this.apiInstance = apiInstance;
  }
}

const apiInstance = new CustomAxiosInstance(process.env.NEXT_PUBLIC_BASE_URL);
export const fileApi = new FileApi(apiInstance);
