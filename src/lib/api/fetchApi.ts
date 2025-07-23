import { PaginatedApiResponse, ApiResponse } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.thedinodex.com";

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const fetchPaginatedApi = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<PaginatedApiResponse<T>> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
