export type SearchParams = {
  q: string;
};

export type LinkedLine = {
  name: string;
  number: string;
  sort: number;
};

export type StopInfo = {
  linked_lines: LinkedLine[];
  stop_id: string;
};

export type SearchResult = {
  name: string;
  lat: number;
  lng: number;
  category: "STOPAREA" | "POI" | string;
  stop: StopInfo | null;
};

export type SearchResponse = {
  result: SearchResult[];
  recent: SearchResult[];
};
