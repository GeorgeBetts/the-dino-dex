import { PaginationLinks, PaginationMeta } from "./pagination";

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedApiResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface ApiError {
  message: string;
  error?: string;
  statusCode?: number;
}
