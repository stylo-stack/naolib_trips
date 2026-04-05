const BASE_ORIGIN = "https://plan.naolib.fr";

let sessionCookie: string | null = null;

export function configure(options: { sessionCookie: string }): void {
  sessionCookie = options.sessionCookie;
}

export function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = { Referer: BASE_ORIGIN + "/" };
  if (sessionCookie) headers.Cookie = sessionCookie;
  return headers;
}
