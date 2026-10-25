import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { CLOUDFLARE_CONFIG, getOptimizedImageUrl } from "./config/cloudflare";
import { products } from "./data/products";

describe("Cloudflare Integration & Edge Infrastructure Suite", () => {
  const rootDir = path.resolve(__dirname, "../..");
  const publicDir = path.resolve(rootDir, "public");

  it("verifies Cloudflare configuration structure and fallback test keys", () => {
    expect(CLOUDFLARE_CONFIG.turnstileSiteKey).toBeTruthy();
    expect(CLOUDFLARE_CONFIG.zoneUrl).toBeTruthy();
    expect(typeof getOptimizedImageUrl).toBe("function");
  });

  it("correctly handles image optimization fallback when CDN is not configured", () => {
    const rawUrl = "/assets/citrus_honey.webp";
    const result = getOptimizedImageUrl(rawUrl, { width: 400, quality: 80 });
    // Falls back to direct local asset when imageDeliveryUrl is empty
    expect(result).toBe(rawUrl);
  });

  it("audits public/_headers for strict edge security headers and caching", () => {
    const headersPath = path.join(publicDir, "_headers");
    expect(fs.existsSync(headersPath)).toBe(true);

    const headersContent = fs.readFileSync(headersPath, "utf-8");
    expect(headersContent).toContain("X-Content-Type-Options: nosniff");
    expect(headersContent).toContain("X-Frame-Options: SAMEORIGIN");
    expect(headersContent).toContain("Referrer-Policy: strict-origin-when-cross-origin");
    expect(headersContent).toContain("Permissions-Policy:");
    expect(headersContent).toContain("Cache-Control: public, max-age=31536000, immutable");
  });

  it("audits public/_routes.json for Cloudflare Pages edge dispatch routing", () => {
    const routesPath = path.join(publicDir, "_routes.json");
    expect(fs.existsSync(routesPath)).toBe(true);

    const routes = JSON.parse(fs.readFileSync(routesPath, "utf-8"));
    expect(routes.version).toBe(1);
    expect(routes.include).toContain("/products/*");
    expect(routes.exclude).toContain("/assets/*");
    expect(routes.exclude).toContain("/*.webp");
  });

  it("audits functions/[[path]].ts edge function bot detection and HTMLRewriter injection", () => {
    const edgeFuncPath = path.join(rootDir, "functions/[[path]].ts");
    expect(fs.existsSync(edgeFuncPath)).toBe(true);

    const edgeContent = fs.readFileSync(edgeFuncPath, "utf-8");
    expect(edgeContent).toContain("BOT_USER_AGENTS");
    expect(edgeContent).toContain("whatsapp");
    expect(edgeContent).toContain("facebookexternalhit");
    expect(edgeContent).toContain("HTMLRewriter");
    expect(edgeContent).toContain("og:title");
    expect(edgeContent).toContain("og:image");
    expect(edgeContent).toContain("twitter:card");
  });

  it("verifies catalog contains signature Haj Arafa packshot products (p25-p32)", () => {
    const newIds = ["p25", "p26", "p27", "p28", "p29", "p30", "p31", "p32"];
    for (const id of newIds) {
      const prod = products.find((p) => p.id === id);
      expect(prod).toBeDefined();
      expect(prod?.name.length).toBeGreaterThan(0);
      expect(prod?.nameAr?.length).toBeGreaterThan(0);
      expect(prod?.image).toBeTruthy();
      expect(prod?.benefits.length).toBeGreaterThan(0);
      expect(prod?.price).toBeGreaterThan(0);
    }
  });
});
