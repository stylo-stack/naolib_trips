import axios from "axios";

const BASE_ORIGIN = "https://plan.naolib.fr";
let sessionCookie: string | null = null;
let pending: Promise<string | null> | null = null;

async function fetchSessionCookie(): Promise<string | null> {
  try {
    const response = await axios.get(BASE_ORIGIN + "/", {
      validateStatus: () => true,
    });
    const raw: string | string[] | undefined = response.headers["set-cookie"];
    if (!raw) return null;
    const cookies = Array.isArray(raw) ? raw : [raw];
    for (const cookie of cookies) {
      const match = cookie.match(/SERVERID=[^;]+/);
      if (match) return match[0];
    }
    return null;
  } catch {
    return null;
  }
}

async function getSessionCookie(): Promise<string | null> {
  if (sessionCookie !== null) return sessionCookie;
  if (!pending) pending = fetchSessionCookie();
  sessionCookie = await pending;
  pending = null;
  return sessionCookie;
}

export async function buildHeaders(): Promise<Record<string, string>> {
  const cookie = await getSessionCookie();
  const headers: Record<string, string> = { Referer: BASE_ORIGIN + "/" };
  if (cookie) headers.Cookie = cookie;
  return headers;
}
