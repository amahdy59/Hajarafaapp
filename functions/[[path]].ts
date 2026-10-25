/**
 * Cloudflare Pages Edge Function
 * - Intercepts requests on Cloudflare's Edge network (Cairo, Alexandria, Frankfurt, etc.)
 * - Detects social bots (WhatsApp, Meta/Facebook, Twitter, Telegram)
 * - Injects Open Graph metadata via HTMLRewriter for rich social preview cards
 */

interface Env {
  VITE_CLOUDFLARE_ZONE_URL?: string;
}

const BOT_USER_AGENTS = [
  "whatsapp",
  "facebookexternalhit",
  "facebot",
  "twitterbot",
  "telegrambot",
  "linkedinbot",
  "discordbot",
  "slackbot",
  "bingpreview",
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const lower = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => lower.includes(bot));
}

// Basic product catalog map for Edge SSR metadata injection
const EDGE_PRODUCTS: Record<string, { name: string; nameAr: string; price: number; description: string; image: string }> = {
  "1": {
    name: "Sidr Mountain Honey",
    nameAr: "عسل سدر جبلي فاخر",
    price: 110.0,
    description: "Pure natural Yemeni Sidr honey with rich floral notes, harvested from natural hives.",
    image: "/src/assets/sidr_honey.webp",
  },
  "2": {
    name: "Black Seed Honey",
    nameAr: "عسل حبة البركة",
    price: 95.0,
    description: "100% natural raw honey infused with pure black seed extract.",
    image: "/src/assets/black_seed_honey.webp",
  },
  "3": {
    name: "Clover Blossom Honey",
    nameAr: "عسل زهور البرسيم",
    price: 65.0,
    description: "Mild, sweet raw clover honey, ideal for daily family wellness.",
    image: "/src/assets/clover_honey.webp",
  },
};

export const onRequest: any = async (context: any) => {
  const { request, next, env } = context;
  const userAgent = request.headers.get("user-agent");
  const url = new URL(request.url);

  // If this is a crawler accessing a product page, inject Open Graph meta tags
  if (isBot(userAgent) && url.pathname.startsWith("/products/")) {
    const parts = url.pathname.split("/").filter(Boolean);
    const productId = parts[1];
    const product = EDGE_PRODUCTS[productId];

    const response = await next();

    if (product) {
      const zoneUrl = env.VITE_CLOUDFLARE_ZONE_URL || url.origin;
      const imageUrl = `${zoneUrl}${product.image}`;
      const title = `${product.nameAr} | ${product.name} - Haj Arafa`;
      const desc = `${product.description} • السعر: ${product.price} جنيه مصري`;

      // Use Cloudflare HTMLRewriter to stream-modify the response head
      return new HTMLRewriter()
        .on("title", {
          element(el) {
            el.setInnerContent(title);
          },
        })
        .on("head", {
          element(el) {
            el.append(`<meta property="og:title" content="${title}" />`, { html: true });
            el.append(`<meta property="og:description" content="${desc}" />`, { html: true });
            el.append(`<meta property="og:image" content="${imageUrl}" />`, { html: true });
            el.append(`<meta property="og:url" content="${url.href}" />`, { html: true });
            el.append(`<meta property="og:type" content="product" />`, { html: true });
            el.append(`<meta property="og:price:amount" content="${product.price}" />`, { html: true });
            el.append(`<meta property="og:price:currency" content="EGP" />`, { html: true });
            el.append(`<meta name="twitter:card" content="summary_large_image" />`, { html: true });
            el.append(`<meta name="twitter:title" content="${title}" />`, { html: true });
            el.append(`<meta name="twitter:description" content="${desc}" />`, { html: true });
            el.append(`<meta name="twitter:image" content="${imageUrl}" />`, { html: true });
          },
        })
        .transform(response);
    }

    return response;
  }

  // Pass-through for regular customers
  return next();
};
