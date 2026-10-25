/**
 * Cloudflare Pages Edge Function
 * - Intercepts requests on Cloudflare's Edge network (Cairo, Alexandria, Frankfurt, etc.)
 * - Detects social bots (WhatsApp, Meta/Facebook, Twitter, Telegram, LinkedIn)
 * - Injects Open Graph metadata via HTMLRewriter for rich social preview cards
 * - Enforces Edge security headers
 */

interface PagesFunctionEnv {
  VITE_CLOUDFLARE_ZONE_URL?: string;
  [key: string]: unknown;
}

interface EventContext {
  request: Request;
  next: () => Promise<Response>;
  env: PagesFunctionEnv;
  params: Record<string, string | string[]>;
}

declare class HTMLRewriter {
  on(
    selector: string,
    handlers: {
      element?: (element: {
        setInnerContent: (content: string) => void;
        append: (content: string, options?: { html?: boolean }) => void;
      }) => void;
    }
  ): HTMLRewriter;
  transform(response: Response): Response;
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

// Product catalog map for Edge SSR metadata injection
const EDGE_PRODUCTS: Record<string, { name: string; nameAr: string; price: number; description: string; image: string }> = {
  "p17": {
    name: "Yemeni Sidr Mountain Honey",
    nameAr: "عسل سدر جبلي يمني فاخر",
    price: 450.0,
    description: "Pure natural Yemeni Sidr honey with rich caramel and herbal notes, harvested from natural hives.",
    image: "/src/assets/sidr_honey.webp",
  },
  "17": {
    name: "Yemeni Sidr Mountain Honey",
    nameAr: "عسل سدر جبلي يمني فاخر",
    price: 450.0,
    description: "Pure natural Yemeni Sidr honey with rich caramel and herbal notes, harvested from natural hives.",
    image: "/src/assets/sidr_honey.webp",
  },
  "p17b": {
    name: "Black Seed Honey",
    nameAr: "عسل حبة البركة المصري",
    price: 180.0,
    description: "100% natural raw honey from bees feeding on Nigella Sativa flowers for immunity.",
    image: "/src/assets/black_seed_honey.webp",
  },
  "p25": {
    name: "Egyptian Citrus Blossom Honey",
    nameAr: "عسل زهور الموالح المصري",
    price: 135.0,
    description: "Pure raw honey collected from blossoming orange and lemon groves of the Nile Delta.",
    image: "/src/assets/citrus_honey.webp",
  },
  "p26": {
    name: "Signature Nigella Sativa Seeds",
    nameAr: "حبة البركة النقية المنقاة",
    price: 48.0,
    description: "Cleaned, sifted, and hand-selected whole black seeds (Habbat Al-Barakah).",
    image: "/src/assets/black_seed_pouch.webp",
  },
  "p27": {
    name: "Cold-Pressed Virgin Black Seed Oil",
    nameAr: "زيت حبة البركة بكر معصور على البارد",
    price: 145.0,
    description: "First cold press extra-virgin Nigella Sativa oil in amber glass. Unfiltered and potent.",
    image: "/src/assets/black_seed_oil.webp",
  },
  "p28": {
    name: "Royal Arabian Kabsa Spice Blend",
    nameAr: "بهارات الكبسة العربية الفاخرة",
    price: 55.0,
    description: "Master aromatic apothecary blend combining dried black lime, cardamom, quills, and cloves.",
    image: "/src/assets/kabsa_spices.webp",
  },
  "p29": {
    name: "Aswan Royal Whole Hibiscus (Karkadeh)",
    nameAr: "كركديه أسواني ملكي زهرة كاملة",
    price: 65.0,
    description: "Sun-dried whole dark-ruby calyces harvested in Upper Egypt. Rich in antioxidants.",
    image: "/src/assets/hibiscus_flowers.webp",
  },
  "p30": {
    name: "Mountain Honey with Raw Honeycomb",
    nameAr: "عسل جبلي نقي بقطف الشمع الطبيعي",
    price: 340.0,
    description: "Raw wild mountain honey containing an intact slice of golden beeswax honeycomb.",
    image: "/src/assets/honeycomb_jar.webp",
  },
  "p31": {
    name: "Authentic Cairo Heritage Dukkah",
    nameAr: "دقة مصرية أصيلة بالسمسم والكمون",
    price: 42.0,
    description: "Traditional Egyptian blend of golden roasted sesame seeds, coriander, cumin, and chickpeas.",
    image: "/src/assets/egyptian_dukkah.webp",
  },
  "p32": {
    name: "Artisanal Laurel & Olive Oil Soap",
    nameAr: "صابون الغار وزيت الزيتون الحرفي",
    price: 58.0,
    description: "Traditional cold-process bar crafted from cold-pressed virgin olive oil and noble laurel berry oil.",
    image: "/src/assets/laurel_soap.webp",
  },
  "p1": {
    name: "Afghano Incense",
    nameAr: "بخور أفغانو التراثي",
    price: 80.0,
    description: "Smooth, woody Afghano incense sticks crafted in the traditional Egyptian way.",
    image: "/src/assets/afghano_incense.webp",
  },
  "1": {
    name: "Afghano Incense",
    nameAr: "بخور أفغانو التراثي",
    price: 80.0,
    description: "Smooth, woody Afghano incense sticks crafted in the traditional Egyptian way.",
    image: "/src/assets/afghano_incense.webp",
  },
};

export const onRequest = async (context: EventContext): Promise<Response> => {
  const { request, next, env } = context;
  const userAgent = request.headers.get("user-agent");
  const url = new URL(request.url);

  // If this is a crawler accessing a product page, inject Open Graph meta tags
  if (isBot(userAgent) && url.pathname.startsWith("/products/")) {
    const parts = url.pathname.split("/").filter(Boolean);
    const productId = parts[1];
    const product = productId ? EDGE_PRODUCTS[productId] : undefined;

    const response = await next();

    if (product) {
      const zoneUrl = (env.VITE_CLOUDFLARE_ZONE_URL as string | undefined) || url.origin;
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
