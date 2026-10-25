import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("UI Refinements: Dropdown Z-Order & Search Box Focus Isolation", () => {
  const headerPath = path.resolve(__dirname, "./components/Header.tsx");
  const headerContent = fs.readFileSync(headerPath, "utf-8");

  const tailwindPath = path.resolve(__dirname, "../styles/tailwind.css");
  const tailwindContent = fs.readFileSync(tailwindPath, "utf-8");

  const indexPath = path.resolve(__dirname, "../styles/index.css");
  const indexContent = fs.readFileSync(indexPath, "utf-8");

  const settingsDrawerPath = path.resolve(__dirname, "./components/SettingsDrawer.tsx");
  const settingsDrawerContent = fs.readFileSync(settingsDrawerPath, "utf-8");

  const cartDrawerPath = path.resolve(__dirname, "./components/CartDrawer.tsx");
  const cartDrawerContent = fs.readFileSync(cartDrawerPath, "utf-8");

  const customDropdownPath = path.resolve(__dirname, "./components/ui/CustomDropdown.tsx");
  const customDropdownContent = fs.readFileSync(customDropdownPath, "utf-8");

  it("ensures the Header top bar is stacked strictly above the Category Navigation Rail", () => {
    // Top bar has relative z-20
    expect(headerContent).toMatch(/relative z-20 h-16 sm:h-\[72px\]/);
    // Category rail has relative z-0 so it cannot paint over top bar dropdowns
    expect(headerContent).toMatch(/hidden sm:block relative z-0 border-t border-border\/80/);
  });

  it("ensures the Currency dropdown has elevated z-index and mutually closes other dropdowns", () => {
    // Currency container has elevated z-50 when open
    expect(headerContent).toContain('${currencyDropdownOpen ? "z-50" : ""}');
    // Currency button closes scope and desktop search
    expect(headerContent).toContain("setCurrencyDropdownOpen(prev => !prev)");
    expect(headerContent).toContain("setScopeDropdownOpen(false)");
    expect(headerContent).toContain("setDesktopSearchOpen(false)");
  });

  it("ensures the Scope (All Departments) dropdown has elevated z-index and mutually closes other dropdowns", () => {
    expect(headerContent).toContain('${scopeDropdownOpen ? "z-50" : ""}');
    expect(headerContent).toContain("setScopeDropdownOpen(prev => !prev)");
    expect(headerContent).toContain("setCurrencyDropdownOpen(false)");
  });

  it("ensures the desktop search input suppresses inner focus rings and delegates highlight to container", () => {
    // Desktop search container has focus-within glow
    expect(headerContent).toContain("focus-within:border-brand-terracotta");
    expect(headerContent).toContain("focus-within:ring-4");
    expect(headerContent).toContain("focus-within:ring-brand-terracotta/15");

    // Input element has complete focus suppression and data-no-focus-ring attribute
    expect(headerContent).toContain("id=\"desktop-header-search\"");
    expect(headerContent).toContain("data-no-focus-ring");
    expect(headerContent).toContain("focus-visible:outline-none");
    expect(headerContent).toContain("focus-visible:ring-0");
    expect(headerContent).toContain("focus-visible:shadow-none");
  });

  it("ensures the mobile search modal input suppresses inner focus ring and has correct z-index", () => {
    expect(headerContent).toContain("fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-50");
    expect(headerContent).toContain("fixed top-0 inset-x-0 z-[51]");
    expect(headerContent).toMatch(/<input[\s\S]*?data-no-focus-ring[\s\S]*?\/>/);
  });

  it("ensures global CSS suppresses inner focus halo and WebKit search pseudo-elements", () => {
    expect(indexContent).toContain("[data-no-focus-ring]:focus");
    expect(indexContent).toContain("[data-no-focus-ring]:focus-visible");
    expect(indexContent).toContain("*:focus-within > input:focus");
    expect(indexContent).toContain("*:focus-within > input:focus-visible");
    expect(indexContent).toContain("outline: none !important;");
    expect(indexContent).toContain("box-shadow: none !important;");
    expect(indexContent).toContain("::-webkit-search-cancel-button");
    expect(indexContent).toContain("-webkit-appearance: none;");
  });

  it("ensures global :where():focus-visible does not enforce rigid border-radius: 6px", () => {
    expect(tailwindContent).not.toContain("border-radius: 6px;\r\n    box-shadow");
    expect(tailwindContent).not.toContain("border-radius: 6px;\n    box-shadow");
  });

  it("ensures CartDrawer and SettingsDrawer backdrops are z-50 to cover the z-40 Header", () => {
    expect(settingsDrawerContent).toContain("fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-50");
    expect(settingsDrawerContent).toContain("z-[51] overflow-y-auto shadow-elev");

    expect(cartDrawerContent).toContain("fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-50");
    expect(cartDrawerContent).toContain("z-[51] flex flex-col shadow-elev border-s border-border");
  });

  it("ensures CustomDropdown elevates container z-index when open and uses start-0 for RTL/LTR parity", () => {
    expect(customDropdownContent).toContain('${isOpen ? "z-30" : "z-auto"}');
    expect(customDropdownContent).toContain("z-50 mt-2 start-0");
  });
});
