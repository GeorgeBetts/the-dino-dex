import { fetchPaginatedApi } from "@/lib/api/fetchApi";
import { Dinosaur, PaginatedApiResponse } from "@/types";

export default async function fetchDinosaurs(): Promise<
  PaginatedApiResponse<Dinosaur>
> {
  return await fetchPaginatedApi("/api/dinosaurs");
}
