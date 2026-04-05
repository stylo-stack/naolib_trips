import axios from "axios";
import type { InfotraficResponse } from "./types.js";

const BASE_URL = "https://plan.naolib.fr/api/poi/infotrafic";

export async function getInfotrafic(): Promise<InfotraficResponse> {
  const response = await axios.get<InfotraficResponse>(BASE_URL, {
    headers: { Referer: "https://plan.naolib.fr/", "X-Requested-With": "XMLHttpRequest" },
  });
  return response.data;
}
