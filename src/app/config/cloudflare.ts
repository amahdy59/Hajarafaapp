/**
 * Cloudflare Integration Configuration & Edge Utilities
 * Reads configuration securely from Vite environment variables (e.g. .env.local).
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "avif" | "webp";
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";
}

export const CLOUDFLARE_CONFIG = {
  zoneUrl: import.meta.env.VITE_CLOUDFLARE_ZONE_URL || "https://hajarafa.com",
  imageDeliveryUrl: import.meta.env.VITE_CLOUDFLARE_IMAGE_DELIVERY_URL || "",
  turnstileSiteKey: import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
  analyticsToken: import.meta.env.VITE_CLOUDFLARE_ANALYTICS_TOKEN || "",
  workerApiUrl: import.meta.env.VITE_CLOUDFLARE_WORKER_API_URL || "",
  whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || "201123456789",
};

/**
 * Returns an optimized image URL using Cloudflare Images / Polish CDN when configured,
 * falling back gracefully to the original static/bundled asset.
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!src) return "";

  // If Cloudflare Image Delivery URL is configured and source is an image ID or remote path
  if (CLOUDFLARE_CONFIG.imageDeliveryUrl && !src.startsWith("data:")) {
    const params: string[] = [];
    if (options.width) params.push(`w=${options.width}`);
    if (options.height) params.push(`h=${options.height}`);
    if (options.quality) params.push(`q=${options.quality || 85}`);
    if (options.format) params.push(`f=${options.format || "auto"}`);
    if (options.fit) params.push(`fit=${options.fit || "contain"}`);

    const paramString = params.length > 0 ? `/cdn-cgi/image/${params.join(",")}` : "";
    
    // Remote absolute URL through Cloudflare zone
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return `${CLOUDFLARE_CONFIG.zoneUrl}${paramString}/${src}`;
    }

    return `${CLOUDFLARE_CONFIG.imageDeliveryUrl}/${src.replace(/^\/+/, "")}`;
  }

  // Local static asset fallback
  return src;
}

export interface CartWhatsAppSummaryItem {
  name: string;
  quantity: number;
  price: number;
}

/**
 * Generates an official WhatsApp 1-Click Ordering link for Egyptian / regional customers.
 */
export function generateWhatsAppOrderLink(
  items: CartWhatsAppSummaryItem[],
  total: number,
  currency = "EGP",
  isRTL = true
): string {
  const phone = CLOUDFLARE_CONFIG.whatsappPhone.replace(/\D/g, "");
  
  if (isRTL) {
    let message = "مرحباً حاج عرفة 🌿، أود تأكيد الطلب التالي من المتجر الإلكتروني:\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} × ${item.quantity} (${(item.price * item.quantity).toFixed(2)} ${currency})\n`;
    });
    message += `\n*الإجمالي:* ${total.toFixed(2)} ${currency}\n`;
    message += "يرجى تأكيد التوصيل وبيانات الاستلام. شكراً لكم!";
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  let message = "Hello Haj Arafa 🌿, I would like to place the following order from your store:\n\n";
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} × ${item.quantity} (${(item.price * item.quantity).toFixed(2)} ${currency})\n`;
  });
  message += `\n*Total:* ${total.toFixed(2)} ${currency}\n`;
  message += "Please confirm delivery details. Thank you!";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
