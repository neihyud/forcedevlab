import CustomAxiosInstance from "@/services/api";
import { buildStrapiQuery } from "@/lib/helpers/strapi";
import {
  IStrapiCollectionResponse,
  IStrapiSingleResponse,
  IStrapiQueryParams,
} from "@/types/strapi";

/**
 * Service class that wraps a CustomAxiosInstance to make type-safe REST API requests
 * targeting a Strapi 5 backend.
 */
export class StrapiApiService {
  private apiInstance: CustomAxiosInstance;

  constructor(apiInstance: CustomAxiosInstance) {
    this.apiInstance = apiInstance;
  }

  /**
   * Internal helper to build URL paths with LHS bracket query params appended
   */
  private buildUrl(path: string, params?: IStrapiQueryParams): string {
    const query = buildStrapiQuery(params);
    return query ? `${path}?${query}` : path;
  }

  /**
   * Fetches a collection of entries (e.g. GET /api/articles)
   *
   * @param path The API endpoint path (e.g. "/api/articles")
   * @param params Query parameters (filters, populate, pagination, sort, fields, etc.)
   * @returns A promise resolving to a collection response wrapped in Strapi 5 format
   */
  async getCollection<T>(
    path: string,
    params?: IStrapiQueryParams,
  ): Promise<IStrapiCollectionResponse<T>> {
    return this.apiInstance.get<IStrapiCollectionResponse<T>>(
      this.buildUrl(path, params),
    );
  }

  /**
   * Fetches a single entry where the API maps to a single object (e.g. GET /api/homepage)
   *
   * @param path The API endpoint path (e.g. "/api/homepage")
   * @param params Query parameters (populate, fields, etc.)
   * @returns A promise resolving to a single response wrapped in Strapi 5 format
   */
  async getSingle<T>(
    path: string,
    params?: IStrapiQueryParams,
  ): Promise<IStrapiSingleResponse<T>> {
    return this.apiInstance.get<IStrapiSingleResponse<T>>(
      this.buildUrl(path, params),
    );
  }

  /**
   * Fetches an entry by its unique ID or documentId (e.g. GET /api/articles/:documentId)
   *
   * @param path The collection API endpoint base path (e.g. "/api/articles")
   * @param id The id or documentId of the target record
   * @param params Query parameters (populate, fields, etc.)
   * @returns A promise resolving to a single response wrapped in Strapi 5 format
   */
  async getById<T>(
    path: string,
    id: string | number,
    params?: IStrapiQueryParams,
  ): Promise<IStrapiSingleResponse<T>> {
    return this.apiInstance.get<IStrapiSingleResponse<T>>(
      this.buildUrl(`${path}/${id}`, params),
    );
  }

  /**
   * Creates a new entry (e.g. POST /api/articles).
   * Automatically nests the payload under a `data` key as required by Strapi.
   *
   * @param path The collection API endpoint base path (e.g. "/api/articles")
   * @param data The payload fields for creation
   * @param params Optional query parameters to return populated relations on creation
   * @returns A promise resolving to the created entry in a single response wrapper
   */
  async create<T>(
    path: string,
    data: any,
    params?: IStrapiQueryParams,
  ): Promise<IStrapiSingleResponse<T>> {
    const payload = { data };
    return this.apiInstance.post<IStrapiSingleResponse<T>>(
      this.buildUrl(path, params),
      payload,
    );
  }

  /**
   * Updates an existing entry (e.g. PUT /api/articles/:documentId).
   * Automatically nests the payload under a `data` key as required by Strapi.
   *
   * @param path The collection API endpoint base path (e.g. "/api/articles")
   * @param id The id or documentId of the target record to update
   * @param data The payload fields containing changes to apply
   * @param params Optional query parameters to return populated relations on update
   * @returns A promise resolving to the updated entry in a single response wrapper
   */
  async update<T>(
    path: string,
    id: string | number,
    data: any,
    params?: IStrapiQueryParams,
  ): Promise<IStrapiSingleResponse<T>> {
    const payload = { data };
    return this.apiInstance.put<IStrapiSingleResponse<T>>(
      this.buildUrl(`${path}/${id}`, params),
      payload,
    );
  }

  /**
   * Deletes an entry by its ID or documentId (e.g. DELETE /api/articles/:documentId)
   *
   * @param path The collection API endpoint base path (e.g. "/api/articles")
   * @param id The id or documentId of the target record to delete
   * @param params Optional query parameters
   * @returns A promise resolving to the API response
   */
  async delete(
    path: string,
    id: string | number,
    params?: IStrapiQueryParams,
  ): Promise<any> {
    return this.apiInstance.delete(this.buildUrl(`${path}/${id}`, params));
  }
}

// Read configuration from environment. Falling back to NEXT_PUBLIC_BASE_URL if NEXT_PUBLIC_STRAPI_API_URL is unset.
const strapiBaseUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "";

export const strapiApiInstance = new CustomAxiosInstance(strapiBaseUrl);
export const strapiApi = new StrapiApiService(strapiApiInstance);
