import axios from "axios";
import type { TripParams, TripResponse } from "./types.js";
import { buildHeaders } from "../client.js";

const BASE_URL = "https://plan.naolib.fr/api/itinerary/search";

export async function searchTrip(params: TripParams): Promise<TripResponse> {
  const response = await axios.get<TripResponse>(BASE_URL, {
    params,
    headers: buildHeaders(),
  });
  return response.data;
}
