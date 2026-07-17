import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type AxiosFunc =
  | typeof Axios.get
  | typeof Axios.post
  | typeof Axios.patch
  | typeof Axios.put
  | typeof Axios.delete;

type ApiErrorResponse = {
  message: string;
  code?: string;
  data?: any;
};

const request = async <T>(
  axiosFunc: AxiosFunc,
  ...args:
    | [string, any, AxiosRequestConfig | undefined]
    | [string, AxiosRequestConfig | undefined]
): Promise<T> => {
  try {
    // @ts-expect-error - args spread is valid but TypeScript cannot infer the correct types
    return (await axiosFunc(...args)) as AxiosResponse<T>;
  } catch (error: unknown) {
    if (Axios.isAxiosError(error)) {
      // Access to config, request, and response
      const errorMessage =
        error.response?.data ??
        ({
          message: "Lỗi kết nối, vui lòng thử lại sau",
        } as ApiErrorResponse);

      throw errorMessage;
    }
    throw error;
  }
};

class CustomAxiosInstance {
  instance: AxiosInstance;

  constructor(baseURL?: string) {
    this.instance = Axios.create({
      baseURL,
    });

    // Request inject access_key
    this.instance.interceptors.request.use(
      async (config) => {
        try {
          // Skip auth header in server-side context unless explicitly provided
          return config;
        } catch (err: unknown) {
          throw err;
        }
      },
      (error) => {
        Promise.reject(error);
      },
    );

    // Add auto refresh token
    this.instance.interceptors.response.use(
      async (response) => {
        return response.data;
      },
      async (error) => {
        return Promise.reject(error);
      },
    );
  }

  get<T = any>(path: string, configs?: AxiosRequestConfig): Promise<T> {
    return request(this.instance.get, path, configs);
  }

  post<T = any>(
    path: string,
    data: any,
    configs?: AxiosRequestConfig,
  ): Promise<T> {
    return request(this.instance.post, path, data, configs);
  }

  put<T = any>(
    path: string,
    data: any,
    configs?: AxiosRequestConfig,
  ): Promise<T> {
    return request(this.instance.put, path, data, configs);
  }

  patch<T = any>(
    path: string,
    data: any,
    configs?: AxiosRequestConfig,
  ): Promise<T> {
    return request(this.instance.patch, path, data, configs);
  }

  delete<T = any>(path: string, configs?: AxiosRequestConfig): Promise<T> {
    return request(this.instance.delete, path, configs);
  }
}

export default CustomAxiosInstance;
