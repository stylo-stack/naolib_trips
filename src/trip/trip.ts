import axios from "axios";
import type { TripParams, TripResponse } from "./types.js";

const BASE_URL = "https://plan.naolib.fr/api/itinerary/search";

export async function searchTrip(params: TripParams): Promise<TripResponse> {
  const response = await axios.get<TripResponse>(BASE_URL, { params });
  return response.data;
}
