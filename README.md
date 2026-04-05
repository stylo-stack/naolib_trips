# naolib_trips

A TypeScript/Node.js package for the [Naolib](https://www.naolib.fr) (Nantes public transportation) API. Provides stop search, itinerary planning, and traffic information.

## Installation

```bash
npm install naolib_trips
```

## Usage

```ts
import { search, trip, infotrafic } from "naolib_trips";
```

### Search stops

Search for stops or points of interest by name.

```ts
const results = await search.search({ q: "Commerce" });
// results.result — matched stops/POIs
// results.recent — recently searched
```

**`SearchParams`**

| Field | Type   | Description     |
| ----- | ------ | --------------- |
| `q`   | string | Search query    |

**`SearchResult`**

| Field      | Type                          | Description                    |
| ---------- | ----------------------------- | ------------------------------ |
| `name`     | string                        | Stop or POI name               |
| `lat`      | number                        | Latitude                       |
| `lng`      | number                        | Longitude                      |
| `category` | `"STOPAREA"` \| `"POI"` \| string | Type of result             |
| `stop`     | `StopInfo` \| null            | Stop details (lines, id) if applicable |

---

### Plan a trip

Find itineraries between two points.

```ts
const itinerary = await trip.searchTrip({
  from: "Gare de Nantes",
  from_lat: 47.2172,
  from_lng: -1.5415,
  to: "Commerce",
  to_lat: 47.2134,
  to_lng: -1.5542,
  type: "now",
});

for (const solution of itinerary.solutions) {
  console.log(solution.startAt, "→", solution.endAt, solution.duration);
}
```

**`TripParams`**

| Field        | Type                                   | Required | Description                         |
| ------------ | -------------------------------------- | -------- | ----------------------------------- |
| `from`       | string                                 | yes      | Origin label                        |
| `from_lat`   | number                                 | yes      | Origin latitude                     |
| `from_lng`   | number                                 | yes      | Origin longitude                    |
| `to`         | string                                 | yes      | Destination label                   |
| `to_lat`     | number                                 | yes      | Destination latitude                |
| `to_lng`     | number                                 | yes      | Destination longitude               |
| `type`       | `"now"` \| `"departure"` \| `"arrival"` | no      | When to compute from (default: now) |
| `time`       | string (`hh:mm`)                       | no       | Departure or arrival time           |
| `date`       | string (`yyyy-mm-dd`)                  | no       | Departure or arrival date           |
| `avoid_dis`  | boolean                                | no       | Avoid disrupted lines               |
| `access`     | boolean                                | no       | Filter for accessible routes        |

Each `TripSolution` contains:
- `startAt` / `endAt` / `duration` — overall journey times
- `sections` — array of `WalkSection` or `TransitSection` legs
- `api` — raw API response for the solution

---

### Traffic information

Fetch current traffic disruptions and points of interest.

```ts
const info = await infotrafic.getInfotrafic();

for (const entry of info.pois) {
  console.log(entry.title, entry.startAt, "→", entry.endAt);
}
```

**`InfotraficResponse`**

| Field   | Type                  | Description                           |
| ------- | --------------------- | ------------------------------------- |
| `pois`  | `InfotraficEntry[]`   | Active disruptions / info entries     |
| `types` | `InfotraficTypeEntry[]` | Same entries grouped by type        |

---

## Development

```bash
npm run build   # compile TypeScript
npm test        # run tests
npm run lint    # lint source
```

## License

ISC
