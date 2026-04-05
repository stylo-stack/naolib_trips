import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { search } from "./search.js";

describe("search", () => {
  it("returns results for a known stop name", async () => {
    const response = await search({ q: "viarme" });

    assert.ok(Array.isArray(response.result));
    assert.ok(response.result.length > 0);
    assert.ok(Array.isArray(response.recent));
  });

  it("first result for 'viarme' is the stop area", async () => {
    const response = await search({ q: "viarme" });
    const first = response.result[0];

    assert.ok(first !== undefined);
    assert.equal(first?.category, "STOPAREA");
    assert.ok(first?.stop !== null);
    assert.ok(typeof first?.stop?.stop_id === "string");
    assert.ok(Array.isArray(first?.stop?.linked_lines));
  });

  it("result items have required fields", async () => {
    const response = await search({ q: "commerce" });

    for (const item of response.result) {
      assert.ok(typeof item.name === "string");
      assert.ok(typeof item.lat === "number");
      assert.ok(typeof item.lng === "number");
      assert.ok(typeof item.category === "string");
    }
  });
});
