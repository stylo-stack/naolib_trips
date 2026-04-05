export type TripParams = {
  from: string;
  from_lat: number;
  from_lng: number;
  to: string;
  to_lat: number;
  to_lng: number;
  type?: "now" | "departure" | "arrival";
  /** Format hh:mm */
  time?: string;
  /** Format yyyy-mm-dd */
  date?: string;
  avoid_dis?: boolean;
  access?: boolean;
};

// ── Shared primitives ────────────────────────────────────────────────────────

export type Position = {
  Lat: number;
  Long: number;
};

export type Site = {
  id: string;
  Position: Position;
  Name: string | null;
  CityCode: string;
  CityName: string;
  Language: string | null;
  LogicalId: string | null;
  ImportId: string | null;
  RoadNumber: number;
  Type: string;
  TimeSourceType: string | null;
  Category: number;
  TransportMode: string | null;
};

export type StopEndpoint = {
  Site: Site;
  AccessPoint: unknown | null;
  GuidanceInfo: unknown | null;
  Extension: unknown | null;
  DisruptionIds: string[] | null;
  Time: string;
};

// ── Top-level solution ───────────────────────────────────────────────────────

export type CarbonFootprint = {
  TripCO2: number;
  CarCO2: number;
  Ratio: number;
};

export type AdditionalInfo = {
  Cost: number;
  ReturnJourney: number;
  ExternalServices: unknown[];
  Kcal: number;
};

export type SolutionApi = {
  CarbonFootprint: CarbonFootprint;
  Departure: StopEndpoint;
  Arrival: StopEndpoint;
  TripKey: string;
  TripTitle: string;
  TripTags: unknown[];
  Disruption: boolean;
  DepartureTime: string;
  ArrivalTime: string;
  Duration: string;
  Distance: number;
  InterchangeNumber: number;
  KmlOverview: unknown | null;
  AdditionalInfo: AdditionalInfo;
};

// ── GeoJSON ──────────────────────────────────────────────────────────────────

export type GeoJsonProperties = {
  type: string;
  color?: string;
  background_color?: string;
  couleur_border?: string;
};

export type GeoJsonLineString = {
  type: "LineString";
  coordinates: [string, string][];
};

export type GeoJsonInfos = {
  additionalGeoJson: GeoJsonLineString;
  properties: GeoJsonProperties;
  distance?: number;           // present on transit sections
};

// ── Section — walking leg ────────────────────────────────────────────────────

export type Elevation = {
  Altitude: number;
  Distance: number;
};

export type PathLink = {
  id: string;
  Access: unknown | null;
  Departure: StopEndpoint;
  Arrival: StopEndpoint;
  Duration: string;
  Distance: number;
  Geometry: string;
  Extension: unknown | null;
  Speed: number;
  direction: number;
  Type: string;
  SubType: string;
  Elevations: Elevation[] | null;
  MergeStreetsId: number[] | null;
  MergeStreetsSpeed: number[] | null;
  MergeStreetsDirection: number[] | null;
  TimeSourceType: string;
  TrafficState: string;
  RelativeDirection: string;
  MagneticDirection: string;
};

export type WalkingLeg = {
  CoVPInformation: unknown | null;
  TADInformation: unknown | null;
  Departure: StopEndpoint;
  Arrival: StopEndpoint;
  Duration: string;
  TransportCenter: unknown | null;
  VehicleForHireInformation: unknown | null;
  SharedVehicleInformation: unknown | null;
  SharedVehicleProvider: unknown | null;
  ComputeProvider: { Name: string; Url: string | null };
  TrafficRoadSituation: unknown | null;
  pathLinks: { PathLink: PathLink[] };
  IsSharedVehicle: boolean;
  IsVehicleForHire: boolean;
  KmlOverview: unknown | null;
  Extension: unknown | null;
  TransportMode: "WALK" | string;
};

// ── Section — transit ride ───────────────────────────────────────────────────

export type StopPlace = {
  importId: string;
  Parent: unknown | null;
  idcomment: unknown | null;
  StopPlaceAttributes: unknown | null;
  id: string;
  Position: Position;
  Name: string;
  CityCode: string;
  CityName: string;
  Language: string | null;
  LogicalId: string;
  ImportId: string | null;
  RoadNumber: number;
  TheoreticalTime: string;
  Type: string;
  TimeSourceType: string;
  Category: number;
  TransportMode: string;
};

export type TransitEndpoint = {
  StopPlace: StopPlace;
  Extension: unknown | null;
  DisruptionIds: string[] | null;
  Time: string;
  PassThrough: boolean;
};

export type RideStep = {
  id: string | null;
  Departure: TransitEndpoint;
  Arrival: TransitEndpoint;
  Geometry: string;
  Duration: string;
  Distance: number;
  Extension: unknown | null;
};

export type TransitLine = {
  id: string;
  companyRef: unknown | null;
  ptNetworkRef: string;
  groupOfLineRef: unknown | null;
  Name: string;
  Number: string;
  PublishedName: string;
  RegistrationNumber: string;
  Comment: unknown | null;
  Color: string;
  TextColor: string;
};

export type PTRide = {
  SectionDisruptionIds: string[];
  Direction: { Id: string; Name: string };
  Attribute: { Value: string; Name: string }[];
  PlatformDeparture: string;
  PlatformArrival: string;
  IsLastCourse: boolean;
  DontGetOut: boolean;
  Departure: TransitEndpoint;
  Arrival: TransitEndpoint;
  Operator: { id: string; Name: string; Code: string };
  Picto: unknown | null;
  Access: { UFR: number; DM: number; NV: number; ME: number };
  DepartureAccess: unknown | null;
  ArrivalAccess: unknown | null;
  LineAccess: { UFR: number; DM: number; NV: number; ME: number };
  Notes: unknown | null;
  CodeActivity: unknown | null;
  IsDateExtended: boolean;
  GetOnWaitingTime: number;
  ComputeProvider: { Name: string; Url: string | null };
  WagonPosition: unknown | null;
  lineRef: unknown | null;
  companyRef: unknown | null;
  ptNetworkRef: unknown | null;
  vehicleJourneyRef: string;
  groupeOfLineRef: unknown | null;
  StopHeadSign: unknown | null;
  JourneyPatternName: string;
  Destination: string;
  Line: TransitLine;
  SalesInfo: unknown | null;
  GroupOfLine: unknown | null;
  PTNetwork: {
    id: string;
    Name: string;
    VersionDate: unknown | null;
    RegistrationNumber: string;
    Comment: unknown | null;
  };
  Company: unknown | null;
  Duration: string;
  Distance: number;
  KmlOverview: unknown | null;
  Comment: unknown | null;
  steps: { Step: RideStep[] };
  Code: string;
  Extension: unknown | null;
  Disruption: boolean;
  LastStopId: number;
  TransportMode: string;
  Diversion: unknown | null;
  TripGeometry: string;
};

// ── Section ──────────────────────────────────────────────────────────────────

export type LineDirection = {
  name: string;
  direction: number;
};

export type SectionLine = {
  external_id: string;
  name: string;
  number: string;
  direction: LineDirection;
  type: number;
};

export type ConcernedStop = {
  is_accessible?: boolean;
  external_id: string;
  physical_id: string;
  name: string;
  lat: number;
  lng: number;
  duration: string;
  startAt: string;
  endAt: string;
  disruption_ids: string[] | null;
};

export type WalkSection = {
  duration: string;
  startAt: string;
  endAt: string;
  distance: number;
  voieBicycle: number;
  voieBicycleDescription: unknown[];
  geojson_infos: GeoJsonInfos;
  api: { PTRide: null; Leg: WalkingLeg };
};

export type TransitSection = {
  duration: string;
  startAt: string;
  endAt: string;
  line: SectionLine;
  concernedStops: ConcernedStop[];
  geojson_infos: GeoJsonInfos;
  api: { PTRide: PTRide; Leg: null };
};

export type Section = WalkSection | TransitSection;

// ── Solution & response ──────────────────────────────────────────────────────

export type TripSolution = {
  startAt: string;
  endAt: string;
  duration: string;
  mode: string;
  solution_accessible?: boolean;
  api: SolutionApi;
  sections: Section[];
};

export type TripResponse = {
  solutions: TripSolution[];
};
