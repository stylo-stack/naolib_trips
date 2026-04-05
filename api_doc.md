# Naolib API

Unofficial documentation for the two APIs backing Naolib's (Nantes) trip planner.

---

## Search

Search for stops and points of interest by name.

```
GET https://tanv4.cartographie.pro/api/autocomplete/itinerary
```

### Query Parameters

| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| `q`       | string | yes      | Search query term  |

### Response

```ts
{
  result: AutocompleteResult[];
  recent: AutocompleteResult[];
}
```

```ts
type AutocompleteResult = {
  name: string;               // e.g. "Viarme-Talensac (Nantes)"
  lat: number;
  lng: number;
  category: "STOPAREA" | "POI";
  stop: {
    stop_id: string;          // e.g. "VIAR1"
    linked_lines: {
      name: string;           // e.g. "Marcel Paul - Neustrie"
      number: string;         // e.g. "3"
      sort: number;
    }[];
  } | null;                   // null for POI results
}
```

> `recent` follows the same shape as `result` and reflects recently searched items (usually empty for unauthenticated requests).

---

## Trip Search

Find itinerary solutions between two points.

```
GET https://plan.naolib.fr/api/itinerary/search
```

### Query Parameters

| Parameter    | Type    | Required | Description                                          |
|--------------|---------|----------|------------------------------------------------------|
| `from`       | string  | yes      | Name of origin stop or place                         |
| `from_lat`   | number  | yes      | Latitude of origin                                   |
| `from_lng`   | number  | yes      | Longitude of origin                                  |
| `to`         | string  | yes      | Name of destination stop or place                    |
| `to_lat`     | number  | yes      | Latitude of destination                              |
| `to_lng`     | number  | yes      | Longitude of destination                             |
| `type`       | string  | no       | `"now"` \| `"departure"` \| `"arrival"`              |
| `time`       | string  | no       | Time for departure/arrival planning, e.g. `"10:36"`  |
| `date`       | string  | no       | Date for departure/arrival planning, e.g. `"2026-04-05"` |
| `avoid_dis`  | boolean | no       | Avoid disrupted routes                               |
| `access`     | boolean | no       | Filter for wheelchair-accessible routes              |

### Response

```ts
{
  solutions: TripSolution[];
}
```

#### TripSolution

```ts
type TripSolution = {
  startAt: string;             // e.g. "12:53"
  endAt: string;               // e.g. "13:11"
  duration: string;            // minutes, e.g. "17"
  mode: string;                // e.g. "bus", "tramway"
  solution_accessible?: boolean;
  api: {
    CarbonFootprint: {
      TripCO2: number;         // grams CO2 for this trip
      CarCO2: number;          // grams CO2 by car equivalent
      Ratio: number;
    };
    Departure: StopEndpoint;
    Arrival: StopEndpoint;
    TripKey: string;           // UUID
    TripTitle: string;
    TripTags: unknown[];
    Disruption: boolean;
    DepartureTime: string;
    ArrivalTime: string;
    Duration: string;          // ISO 8601, e.g. "PT17M31S"
    Distance: number;          // metres
    InterchangeNumber: number;
    KmlOverview: unknown | null;
    AdditionalInfo: {
      Cost: number;
      ReturnJourney: number;
      ExternalServices: unknown[];
      Kcal: number;
    };
  };
  sections: Section[];
}
```

#### Section

Each solution is broken into sections. A section is either a **walking leg** or a **transit ride**.

**Walk section**

```ts
type WalkSection = {
  duration: string;            // minutes
  startAt: string;
  endAt: string;
  distance: number;            // metres
  voieBicycle: number;
  voieBicycleDescription: unknown[];
  geojson_infos: GeoJsonInfos;
  api: { PTRide: null; Leg: WalkingLeg };
}

type WalkingLeg = {
  TransportMode: "WALK" | string;
  Departure: StopEndpoint;
  Arrival: StopEndpoint;
  Duration: string;            // ISO 8601
  pathLinks: { PathLink: PathLink[] };
  CoVPInformation: unknown | null;
  TADInformation: unknown | null;
  TransportCenter: unknown | null;
  VehicleForHireInformation: unknown | null;
  SharedVehicleInformation: unknown | null;
  SharedVehicleProvider: unknown | null;
  ComputeProvider: { Name: string; Url: string | null };
  TrafficRoadSituation: unknown | null;
  IsSharedVehicle: boolean;
  IsVehicleForHire: boolean;
  KmlOverview: unknown | null;
  Extension: unknown | null;
}
```

**Transit ride section**

```ts
type TransitSection = {
  duration: string;            // minutes
  startAt: string;
  endAt: string;
  line: SectionLine;
  concernedStops: ConcernedStop[];
  geojson_infos: GeoJsonInfos;
  api: { PTRide: PTRide; Leg: null };
}

type SectionLine = {
  external_id: string;
  name: string;                // e.g. "Marcel Paul - Neustrie"
  number: string;              // e.g. "3"
  direction: { name: string; direction: number };
  type: number;
}

type ConcernedStop = {
  external_id: string;
  physical_id: string;
  name: string;
  lat: number;
  lng: number;
  duration: string;
  startAt: string;
  endAt: string;
  is_accessible?: boolean;
  disruption_ids: string[] | null;
}
```

#### GeoJSON types

```ts
type GeoJsonLineString = {
  type: "LineString";
  coordinates: [string, string][];  // [lng, lat] pairs as strings
}

type GeoJsonProperties = {
  type: string;                // e.g. "WALK", "TRAMWAY", "BUS"
  color?: string;              // foreground hex, e.g. "#FFFFFF"
  background_color?: string;   // e.g. "#2581C4"
  couleur_border?: string;     // walk sections only
}

type GeoJsonInfos = {
  additionalGeoJson: GeoJsonLineString;
  properties: GeoJsonProperties;
  distance?: number;           // metres; present on transit sections
}
```

#### PTRide (transit ride detail)

```ts
type PTRide = {
  TransportMode: string;       // e.g. "TRAMWAY", "BUS"
  Departure: TransitEndpoint;
  Arrival: TransitEndpoint;
  Duration: string;            // ISO 8601
  Distance: number;            // metres
  Destination: string;
  JourneyPatternName: string;
  Line: TransitLine;
  PTNetwork: {
    id: string;
    Name: string;              // e.g. "Naolib"
    VersionDate: unknown | null;
    RegistrationNumber: string;
    Comment: unknown | null;
  };
  Operator: { id: string; Name: string; Code: string };
  Direction: { Id: string; Name: string };
  Attribute: { Value: string; Name: string }[];
  PlatformDeparture: string;
  PlatformArrival: string;
  IsLastCourse: boolean;
  DontGetOut: boolean;
  Access: { UFR: number; DM: number; NV: number; ME: number };
  LineAccess: { UFR: number; DM: number; NV: number; ME: number };
  GetOnWaitingTime: number;
  ComputeProvider: { Name: string; Url: string | null };
  steps: { Step: RideStep[] };
  vehicleJourneyRef: string;
  Disruption: boolean;
  LastStopId: number;
  TripGeometry: string;        // WKT LINESTRING
  SectionDisruptionIds: string[];
  Code: string;
  KmlOverview: unknown | null;
  SalesInfo: unknown | null;
  GroupOfLine: unknown | null;
  Company: unknown | null;
  Extension: unknown | null;
}

type TransitLine = {
  id: string;
  Name: string;
  Number: string;
  PublishedName: string;
  Color: string;               // hex without #, e.g. "2581C4"
  TextColor: string;
  RegistrationNumber: string;
  ptNetworkRef: string;
  companyRef: unknown | null;
  groupOfLineRef: unknown | null;
  Comment: unknown | null;
}

type TransitEndpoint = {
  StopPlace: StopPlace;
  Extension: unknown | null;
  DisruptionIds: string[] | null;
  Time: string;
  PassThrough: boolean;
}

type StopEndpoint = {
  Site: Site;
  AccessPoint: unknown | null;
  GuidanceInfo: unknown | null;
  Extension: unknown | null;
  DisruptionIds: string[] | null;
  Time: string;
}
```
