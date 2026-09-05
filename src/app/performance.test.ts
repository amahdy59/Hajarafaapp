import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Performance & Asset Health Review Suite", () => {
  const rootDir = path.resolve(__dirname, "../..");
  const assetsDir = path.resolve(__dirname, "../../src/assets");

  it("enforces next-gen image formats: all catalog and hero assets are modern .webp", () => {
    const files = fs.readdirSync(assetsDir);
    const nonWebpImages: string[] = [];

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      // Only allow webp (and svg if vector icons)
      if ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"].includes(ext)) {
        nonWebpImages.push(file);
      }
    }

    expect(nonWebpImages).toEqual([]);
  });

  it("enforces image size budget: zero images exceed 250 kB", () => {
    const files = fs.readdirSync(assetsDir);
    const oversizedAssets: { file: string; sizeKb: number }[] = [];
    const MAX_IMAGE_SIZE_BYTES = 250 * 1024; // 250 kB limit

    for (const file of files) {
      const fullPath = path.join(assetsDir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile() && stat.size > MAX_IMAGE_SIZE_BYTES) {
        oversizedAssets.push({ file, sizeKb: Math.round(stat.size / 1024) });
      }
    }

    expect(oversizedAssets).toEqual([]);
  });

  it("verifies manual vendor chunking configuration in vite.config.ts", () => {
    const viteConfigPath = path.join(rootDir, "vite.config.ts");
    const content = fs.readFileSync(viteConfigPath, "utf-8");

    // Prevents monolithic JavaScript bundle by verifying manual chunking
    expect(content).toContain("manualChunks");
    expect(content).toContain("vendor-react");
    expect(content).toContain("vendor-motion");
    expect(content).toContain("vendor-icons");
  });

  it("verifies SPA fallback 404 generation plugin in vite.config.ts", () => {
    const viteConfigPath = path.join(rootDir, "vite.config.ts");
    const content = fs.readFileSync(viteConfigPath, "utf-8");

    expect(content).toContain("copyIndexTo404");
    expect(content).toContain("404.html");
  });

  it("verifies recently viewed storage cap to prevent localStorage quota exhaustion", async () => {
    const { MAX_ITEMS } = await import("./hooks/useRecentlyViewed");
    expect(MAX_ITEMS).toBeDefined();
    expect(MAX_ITEMS).toBeLessThanOrEqual(10);
    expect(MAX_ITEMS).toBeGreaterThanOrEqual(4);
  });
});
