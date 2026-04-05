import axios from "axios";
import type { SearchParams, SearchResponse } from "./types.js";

const BASE_URL = "https://plan.naolib.fr/api/autocomplete/itinerary";

export async function search(
  params: SearchParams
): Promise<SearchResponse> {
  const response = await axios.get<SearchResponse>(BASE_URL, {
    params,
    headers: { Referer: "https://plan.naolib.fr/", "X-Requested-With": "XMLHttpRequest" },
  });
  return response.data;
}
