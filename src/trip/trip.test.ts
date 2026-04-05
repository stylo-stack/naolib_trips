import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { searchTrip } from "./trip.js";

const FROM = {
  name: "Viarme-Talensac (Nantes)",
  lat: 47.221378326416016,
  lng: -1.5627094507217407,
};

const TO = {
  name: "Duchesse Anne - Château (Nantes)",
  lat: 47.21623229980469,
  lng: -1.5469282865524292,
};

describe("searchTrip", () => {
  it("returns solutions for a valid route", async () => {
    const response = await searchTrip({
      from: FROM.name,
      from_lat: FROM.lat,
      from_lng: FROM.lng,
      to: TO.name,
      to_lat: TO.lat,
      to_lng: TO.lng,
      type: "now",
      avoid_dis: false,
      access: false,
    });

    assert.ok(Array.isArray(response.solutions));
    assert.ok(response.solutions.length > 0);
  });

  it("each solution has startAt, endAt, duration, and sections", async () => {
    const response = await searchTrip({
      from: FROM.name,
      from_lat: FROM.lat,
      from_lng: FROM.lng,
      to: TO.name,
      to_lat: TO.lat,
      to_lng: TO.lng,
      type: "now",
      avoid_dis: false,
      access: false,
    });

    for (const solution of response.solutions) {
      assert.ok(typeof solution.startAt === "string");
      assert.ok(typeof solution.endAt === "string");
      assert.ok(typeof solution.duration === "string");

      assert.ok(Array.isArray(solution.sections));
      assert.ok(solution.sections.length > 0);
    }
  });

  it("sections have geojson coordinates", async () => {
    const response = await searchTrip({
      from: FROM.name,
      from_lat: FROM.lat,
      from_lng: FROM.lng,
      to: TO.name,
      to_lat: TO.lat,
      to_lng: TO.lng,
      type: "now",
      avoid_dis: false,
      access: false,
    });

    const firstSolution = response.solutions[0];
    if (firstSolution === undefined) throw new Error("No solutions returned");

    for (const section of firstSolution.sections) {
      assert.equal(section.geojson_infos.additionalGeoJson.type, "LineString");
      assert.ok(section.geojson_infos.additionalGeoJson.coordinates.length > 0);
    }
  });
});
