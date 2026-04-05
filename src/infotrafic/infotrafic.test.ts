import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getInfotrafic } from "./infotrafic.js";

describe("getInfotrafic", () => {
  it("returns pois and types arrays", async () => {
    const response = await getInfotrafic();

    assert.ok(Array.isArray(response.pois));
    assert.ok(Array.isArray(response.types));
  });

  it("pois entries have required fields", async () => {
    const response = await getInfotrafic();

    for (const entry of response.pois) {
      assert.ok(typeof entry.id === "number");
      assert.ok(typeof entry.title === "string");
      assert.ok(typeof entry.content === "string");
      assert.ok(typeof entry.startAt === "string");
      assert.ok(typeof entry.endAt === "string");
      assert.ok(Array.isArray(entry.pois) || entry.pois === null);
    }
  });

  it("types entries have required fields including type", async () => {
    const response = await getInfotrafic();

    for (const entry of response.types) {
      assert.ok(typeof entry.id === "number");
      assert.ok(typeof entry.title === "string");
      assert.ok(typeof entry.content === "string");
      assert.ok(typeof entry.startAt === "string");
      assert.ok(typeof entry.endAt === "string");
      assert.ok(typeof entry.type === "string");
      assert.ok(Array.isArray(entry.pois) || entry.pois === null);
    }
  });

  it("nested pois have required fields", async () => {
    const response = await getInfotrafic();

    const allPois = [...response.pois, ...response.types].flatMap(
      (entry) => entry.pois ?? []
    );

    for (const poi of allPois) {
      assert.ok(typeof poi?.id === "number");
      assert.ok(typeof poi?.name === "string");
      assert.ok(typeof poi?.type === "string");
      assert.ok(typeof poi?.lat === "number");
      assert.ok(typeof poi?.lng === "number");
      assert.ok(typeof poi?.options === "object" && poi.options !== null);
    }
  });
});
