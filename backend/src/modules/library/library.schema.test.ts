import { describe, expect, it } from "vitest";

import {
  createLibraryMaterialSchema,
  isUuid,
  updateLibraryMaterialSchema,
} from "./library.schema.js";
import { hasImageSignature } from "./library.image.js";

describe("library material schemas", () => {
  it("applies defaults for a minimal article", () => {
    const parsed = createLibraryMaterialSchema.parse({
      title: "  Статья  ",
      topic: "Модель управления",
    });

    expect(parsed).toMatchObject({
      title: "Статья",
      type: "article",
      status: "draft",
      description: "",
      content: "",
    });
  });

  it("turns empty optional strings into null", () => {
    const parsed = updateLibraryMaterialSchema.parse({
      cover_url: "",
      read_time: " ",
    });

    expect(parsed.cover_url).toBeNull();
    expect(parsed.read_time).toBeNull();
  });

  it("rejects non-https cover urls and unknown types", () => {
    expect(
      createLibraryMaterialSchema.safeParse({
        title: "x",
        topic: "y",
        cover_url: "javascript:alert(1)",
      }).success,
    ).toBe(false);
    expect(
      createLibraryMaterialSchema.safeParse({
        title: "x",
        topic: "y",
        type: "podcast",
      }).success,
    ).toBe(false);
  });

  it("validates uuids", () => {
    expect(isUuid("3f2b8c1e-1d2a-4c5b-9e8f-0a1b2c3d4e5f")).toBe(true);
    expect(isUuid("1")).toBe(false);
  });
});

describe("hasImageSignature", () => {
  it("accepts a PNG header and rejects mismatched content", () => {
    const png = Buffer.from("89504e470d0a1a0a0000000d49484452", "hex");
    expect(hasImageSignature(png, "image/png")).toBe(true);
    expect(hasImageSignature(png, "image/jpeg")).toBe(false);
    expect(
      hasImageSignature(Buffer.from("<html><script>"), "image/png"),
    ).toBe(false);
  });
});
