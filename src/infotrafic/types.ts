export type PoiOptions = {
  adresse?: string;
  site_web?: string;
  acces_pmr?: "OUI" | "NON";
  capacite_pmr?: number;
  presentation?: string;
  url_redirect?: string;
  capacite_moto?: number | string;
  capacite_velo?: number | string;
  grp_disponible?: number;
  moyen_paiement?: string;
  capacite_voiture?: number;
  infos_complementaires?: string;
  stationnement_velo_securise?: "OUI" | "NON";
  capacite_vehicule_electrique?: number | string;
  [key: string]: unknown;
};

export type Poi = {
  id: number;
  type: string;
  real_type: string;
  name: string;
  lat: number;
  lng: number;
  options: PoiOptions;
  icon_poi: string;
  instance: string;
};

export type InfotraficEntry = {
  id: number;
  title: string;
  content: string;
  startAt: string;
  endAt: string;
  pois: Poi[] | null;
};

export type InfotraficTypeEntry = InfotraficEntry & {
  type: string;
};

export type InfotraficResponse = {
  pois: InfotraficEntry[];
  types: InfotraficTypeEntry[];
};
