import { useState } from "react";
import { Package, X, Check, Copy, Printer, CreditCard, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useAppSettings } from "../../context/AppSettingsContext";
import { type Order, statusColors, statusTranslations } from "./types";

interface AccountOrdersProps {
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onSelectTaxInvoice: (order: Order) => void;
}

export function AccountOrders({ orders, onCancelOrder, onSelectTaxInvoice }: AccountOrdersProps) {
  const { t, isRTL, locale } = useAppSettings();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success(isRTL ? "تم نسخ كود التتبع!" : "Tracking code copied!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrintReceipt = (order: Order) => {
    const printWindow = window.open("", "_blank", "width=800,height=900");
    if (!printWindow) {
      toast.error(isRTL ? "يرجى السماح بالنوافذ المنبثقة للطباعة" : "Please allow popups to print receipt");
      return;
    }

    const receiptHtml = `
      <!DOCTYPE html>
      <html lang="${locale}" dir="${isRTL ? "rtl" : "ltr"}">
      <head>
        <meta charset="UTF-8">
        <title>Haj Arafa - Receipt #${order.id}</title>
        <style>
          :root {
            --text-main: #1b1c1a;
            --text-muted: #53483f;
            --bg-page: #fbf8f2;
            --border-color: #e2d9cc;
            --brand-green: #1f382b;
            --brand-accent: #c4622d;
          }
          body {
            font-family: ${isRTL ? "'Cairo', sans-serif" : "'Questrial', sans-serif"};
            color: var(--text-main);
            margin: 0;
            padding: 40px;
            background: var(--bg-page);
          }
          .receipt-container {
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid var(--border-color);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 14px rgba(27, 28, 26, 0.04);
            background: #ffffff;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid var(--brand-green);
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 5px 0;
            font-size: 24px;
            color: var(--brand-green);
          }
          .header p {
            margin: 5px 0;
            color: var(--text-muted);
            font-size: 14px;
          }
          .details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            font-size: 14px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 15px;
          }
          .details-col {
            flex: 1;
            line-height: 1.6;
          }
          .details-col:last-child {
            text-align: ${isRTL ? "left" : "right"};
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th {
            background-color: #f5efe6;
            color: var(--brand-green);
            text-align: ${isRTL ? "right" : "left"};
            padding: 12px 10px;
            border-bottom: 2px solid var(--border-color);
            font-weight: bold;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid var(--border-color);
          }
          .totals {
            margin-top: 20px;
            border-top: 1px solid var(--border-color);
            padding-top: 15px;
          }
          .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            font-size: 14px;
          }
          .totals-row.grand-total {
            font-size: 18px;
            font-weight: bold;
            color: var(--brand-accent);
            margin-top: 10px;
            border-top: 2px solid var(--border-color);
            padding-top: 10px;
          }
          .address-section {
            margin-top: 35px;
            padding: 15px;
            background-color: var(--bg-page);
            border-radius: 8px;
            border: 1px solid var(--border-color);
            font-size: 13px;
          }
          .address-section h3 {
            margin-top: 0;
            color: var(--brand-green);
            font-size: 14px;
            margin-bottom: 8px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: var(--text-muted);
          }
          @media print {
            body { padding: 0; background: #ffffff; }
            .receipt-container { border: none; box-shadow: none; max-width: 100%; padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <h1>${isRTL ? "حاج عرفة" : "Haj Arafa"}</h1>
            <p>${isRTL ? "العطارة والأغذية الطبيعية منذ 1968" : "Natural Herbal Products Since 1968"}</p>
          </div>
          <div class="details">
            <div class="details-col">
              <strong>${isRTL ? "رقم الطلب:" : "Order #:"}</strong> ${order.id}<br>
              <strong>${isRTL ? "تاريخ الطلب:" : "Date:"}</strong> ${isRTL ? order.dateAr : order.dateEn}
            </div>
            <div class="details-col">
              <strong>${isRTL ? "الحالة:" : "Status:"}</strong> ${statusTranslations[order.status]?.[locale] || order.status}<br>
              <strong>${isRTL ? "طريقة الدفع:" : "Payment:"}</strong> Visa **** 4242
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>${isRTL ? "المنتج" : "Item"}</th>
                <th style="text-align: center;">${isRTL ? "الكمية" : "Qty"}</th>
                <th style="text-align: ${isRTL ? "left" : "right"};">${isRTL ? "السعر" : "Price"}</th>
                <th style="text-align: ${isRTL ? "left" : "right"};">${isRTL ? "الإجمالي" : "Total"}</th>
              </tr>
            </thead>
            <tbody>
              ${order.products.map(p => `
                <tr>
                  <td>${isRTL && p.nameAr ? p.nameAr : p.name}</td>
                  <td style="text-align: center;">${p.quantity}</td>
                  <td style="text-align: ${isRTL ? "left" : "right"};">${t.currency} ${p.price.toFixed(2)}</td>
                  <td style="text-align: ${isRTL ? "left" : "right"};">${t.currency} ${(p.price * p.quantity).toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="totals">
            <div class="totals-row">
              <span>${isRTL ? "المجموع الفرعي:" : "Subtotal:"}</span>
              <span>${t.currency} ${order.receipt.subtotal.toFixed(2)}</span>
            </div>
            <div class="totals-row">
              <span>${isRTL ? "الشحن:" : "Shipping:"}</span>
              <span>${order.receipt.shipping === 0 ? (isRTL ? "مجاني" : "FREE") : `${t.currency} ${order.receipt.shipping.toFixed(2)}`}</span>
            </div>
            <div class="totals-row">
              <span>${isRTL ? "الخصم:" : "Discount:"}</span>
              <span>-${t.currency} ${order.receipt.discount.toFixed(2)}</span>
            </div>
            <div class="totals-row grand-total">
              <span>${isRTL ? "الإجمالي الكلي:" : "Total Charged:"}</span>
              <span>${t.currency} ${order.total.toFixed(2)}</span>
            </div>
          </div>
          <div class="address-section">
            <h3>${isRTL ? "عنوان التوصيل:" : "Delivery Address:"}</h3>
            <div>${isRTL ? order.deliveryAddressAr : order.deliveryAddress}</div>
          </div>
          <div class="footer">
            <p>${isRTL ? "شكراً لتسوقكم من حاج عرفة! لأي استفسارات يرجى الاتصال على 19688." : "Thank you for shopping with Haj Arafa! For support, contact 19688."}</p>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <h3 className="text-brand-forest dark:text-brand-sage-dark font-display text-lg sm:text-xl font-bold flex items-center gap-2 mb-4">
        <Package size={20} className="text-brand-terracotta" />
        {t.myOrders}
      </h3>
      {orders.map(order => (
        <div key={order.id} className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-soft hover:shadow-md transition-all">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-foreground font-semibold font-mono whitespace-nowrap">#{order.id}</span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap ${statusColors[order.status]}`}>
                {statusTranslations[order.status]?.[locale] || order.status}
              </span>
            </div>
            <div className="flex items-center gap-1.5 justify-between sm:justify-end">
              <span className="text-xs text-muted-foreground sm:hidden">{isRTL ? "الإجمالي" : "Total"}</span>
              <span className="text-sm font-semibold text-brand-terracotta whitespace-nowrap">
                {t.currency} {order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Middle Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span>{isRTL ? order.dateAr : order.dateEn}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{order.items} {t.items}</span>
            </div>
            <div>
              <span className="font-medium text-foreground">
                {order.status === "delivered" ? t.deliveredSuccessfully : order.status === "cancelled" ? (isRTL ? "تم إلغاء هذا الطلب" : "This order has been cancelled") : t.onTheWay}
              </span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between gap-3 bg-brand-cream-2/60 dark:bg-zinc-800/40 p-2.5 rounded-xl border border-border/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted p-1 flex items-center justify-center border border-border/40 flex-shrink-0">
                <img src={order.image} alt={locale === "ar" ? "صورة المنتج" : "Product thumbnail"} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
              </div>
              <div className="text-xs">
                <p className="text-foreground font-medium line-clamp-1">{isRTL ? "تفاصيل الشحنة" : "Shipment Details"}</p>
                <p className="text-muted-foreground">{order.items} {isRTL ? "منتجات طبيعية" : "natural products"}</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedOrder(order)}
              className="text-xs bg-brand-terracotta/10 text-brand-terracotta px-3 py-1.5 rounded-lg hover:bg-brand-terracotta hover:text-white transition-all font-semibold whitespace-nowrap"
            >
              {t.details}
            </button>
          </div>
        </div>
      ))}

      {/* Order Details & Progress Tracking Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-50 animate-fade-in"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-2xl h-full sm:h-auto bg-card border-0 sm:border border-border rounded-none sm:rounded-3xl p-4 sm:p-6 z-50 shadow-elev overflow-hidden flex flex-col max-h-screen sm:max-h-[92vh]"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border/80 pb-4 mb-4 select-none flex-shrink-0">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{isRTL ? "تفاصيل الطلب" : "Order details"}</span>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <h3 className="text-foreground text-base sm:text-lg font-bold font-mono">#{selectedOrder.id}</h3>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${statusColors[selectedOrder.status]}`}>
                      {statusTranslations[selectedOrder.status]?.[locale] || selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {isRTL ? "تاريخ الطلب:" : "Ordered on:"} {isRTL ? selectedOrder.dateAr : selectedOrder.dateEn}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label={isRTL ? "إغلاق" : "Close"}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto pe-1.5 -me-1.5 ps-1.5 -ms-1.5 space-y-5">
                {/* Delivery Progress Stages Tracker */}
                <div className="bg-background/40 border border-border/60 rounded-2xl p-4 sm:p-5 mb-5 select-none">
                  <h4 className="text-xs font-semibold text-foreground mb-4">
                    {isRTL ? "حالة شحنتك ومراحل التوصيل" : "Delivery Progress & Tracking Timeline"}
                  </h4>
                  
                  {selectedOrder.status === "cancelled" ? (
                    <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 p-3 rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        ✕
                      </div>
                      <div>
                        <p className="text-xs font-bold text-red-700 dark:text-red-400">{isRTL ? "تم إلغاء هذا الطلب" : "This order has been cancelled"}</p>
                        <p className="text-[10px] text-muted-foreground">{isRTL ? "تمت معالجة الإلغاء بناءً على طلبك" : "The order cancellation has been processed successfully"}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="absolute top-[13px] start-4 end-4 h-0.5 bg-muted hidden sm:block" />
                      <div className="absolute top-4 bottom-4 start-[13px] w-0.5 bg-muted sm:hidden" />
                      
                      <div 
                        className="absolute top-[13px] start-4 h-0.5 bg-brand-terracotta hidden sm:block transition-all duration-500" 
                        style={{ 
                          width: selectedOrder.status === "delivered" 
                            ? "92%" 
                            : selectedOrder.status === "shipped" 
                              ? "61%" 
                              : "30%" 
                        }} 
                      />

                      <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-2 relative z-10">
                        {[
                          { step: "placed", labelEn: "Placed", labelAr: "تم الطلب", dateEn: selectedOrder.dateEn, dateAr: selectedOrder.dateAr, active: true },
                          { step: "processing", labelEn: "Processing", labelAr: "قيد التحضير", dateEn: selectedOrder.dateEn, dateAr: selectedOrder.dateAr, active: true },
                          { step: "shipped", labelEn: "Shipped", labelAr: "شحن الطلب", dateEn: selectedOrder.courier?.estDateEn || "In Transit", dateAr: selectedOrder.courier?.estDateAr || "قيد الشحن", active: ["shipped", "delivered"].includes(selectedOrder.status) },
                          { step: "delivered", labelEn: "Delivered", labelAr: "تم التوصيل", dateEn: selectedOrder.courier?.estDateEn || "Expected soon", dateAr: selectedOrder.courier?.estDateAr || "متوقع قريباً", active: selectedOrder.status === "delivered" }
                        ].map((stage, idx) => (
                          <div key={stage.step} className="flex sm:flex-col items-start sm:items-center text-center gap-3 sm:gap-1.5 flex-1">
                            <div 
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all flex-shrink-0 ${
                                stage.active 
                                  ? "bg-brand-terracotta border-brand-terracotta text-white shadow-sm" 
                                  : "bg-card border-muted text-muted-foreground"
                              }`}
                            >
                              {stage.active ? "✓" : idx + 1}
                            </div>
                            <div className="text-start sm:text-center leading-tight">
                              <p className={`text-xs font-semibold ${stage.active ? "text-foreground" : "text-muted-foreground"}`}>
                                {isRTL ? stage.labelAr : stage.labelEn}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {isRTL ? stage.dateAr : stage.dateEn}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Courier Panel */}
                {selectedOrder.courier && selectedOrder.status !== "cancelled" && (
                  <div className="bg-brand-peach/25 border border-brand-terracotta/10 rounded-2xl p-4 mb-5 flex items-center justify-between gap-4 select-none flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🚚</span>
                      <div className="text-xs">
                        <p className="text-foreground font-semibold">
                          {isRTL ? `الشحن عبر ${selectedOrder.courier.company}` : `Shipped with ${selectedOrder.courier.company}`}
                        </p>
                        <p className="text-muted-foreground mt-0.5">
                          {isRTL 
                            ? `كود التتبع: ${selectedOrder.courier.trackingCode}` 
                            : `Tracking Code: ${selectedOrder.courier.trackingCode}`
                          }
                        </p>
                        {selectedOrder.courier.phone && (
                          <p className="text-muted-foreground mt-0.5 flex items-center gap-1">
                            📞 {isRTL ? "هاتف المندوب:" : "Courier Phone:"} <span className="font-mono text-foreground font-semibold">{selectedOrder.courier.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => copyToClipboard(selectedOrder.courier!.trackingCode)}
                      className="py-1.5 px-3 bg-brand-peach text-brand-terracotta text-[10px] font-bold rounded-lg border border-brand-terracotta/20 hover:bg-brand-terracotta hover:text-white transition-all flex items-center gap-1.5"
                    >
                      {isCopied ? <Check size={12} /> : <Copy size={12} />}
                      {isCopied ? (isRTL ? "تم النسخ" : "Copied!") : (isRTL ? "نسخ الكود" : "Copy Code")}
                    </button>
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-3.5 mb-6">
                  <h4 className="text-xs font-semibold uppercase text-brand-ink-soft dark:text-zinc-300 select-none">
                    {isRTL ? "محتويات الشحنة" : "Shipment Items"}
                  </h4>
                  {selectedOrder.products?.map((prod, i: number) => (
                    <div key={i} className="flex justify-between items-center gap-3 border-b border-border/40 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted p-1 rounded-xl flex items-center justify-center flex-shrink-0 border border-border/30">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="text-xs">
                          <p className="text-foreground font-medium">{isRTL ? prod.nameAr : prod.name}</p>
                          <p className="text-muted-foreground mt-0.5">{isRTL ? "الكمية:" : "Qty:"} {prod.quantity}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-foreground font-mono">
                        {t.currency} {prod.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Receipt Breakdown */}
                <div className="border-t border-border pt-4 mb-6">
                  <h4 className="text-xs font-semibold uppercase text-brand-ink-soft dark:text-zinc-300 mb-3 select-none">
                    {isRTL ? "تفاصيل الدفع وملخص الحساب" : "Payment & Order Pricing Summary"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-muted/20 border border-border/60 rounded-2xl p-4">
                    <div className="space-y-4 border-b sm:border-b-0 sm:border-e border-border/80 pb-3 sm:pb-0 sm:pe-6">
                      <div>
                        <p className="text-muted-foreground uppercase text-[10px] tracking-wider font-semibold select-none">
                          {isRTL ? "طريقة الدفع" : "Payment Method"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <CreditCard size={15} className="text-brand-ink-soft dark:text-zinc-400" />
                          <span className="font-mono text-foreground font-medium">Visa **** 4242</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 select-none">
                          🔒 {t.paymentSecureNote}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground uppercase text-[10px] tracking-wider font-semibold select-none">
                          {isRTL ? "عنوان الشحن" : "Shipping Address"}
                        </p>
                        <p className="text-foreground font-medium mt-1 font-sans">
                          {isRTL ? selectedOrder.deliveryAddressAr : selectedOrder.deliveryAddress}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 font-mono">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? "المجموع الفرعي:" : "Subtotal:"}</span>
                        <span className="text-foreground font-medium">{t.currency} {selectedOrder.receipt.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{isRTL ? "الشحن:" : "Shipping:"}</span>
                        <span className="text-foreground font-medium">
                          {selectedOrder.receipt.shipping === 0 
                            ? (isRTL ? "مجاني" : "FREE") 
                            : `${t.currency} ${selectedOrder.receipt.shipping.toFixed(2)}`
                          }
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-red-600 dark:text-red-400">
                        <span>{isRTL ? "خصم الكوبون:" : "Discount:"}</span>
                        <span>-{t.currency} {selectedOrder.receipt.discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-border/80 pt-2 text-sm font-bold text-brand-terracotta">
                        <span className="font-sans select-none">{isRTL ? "الإجمالي الكلي:" : "Total Charged:"}</span>
                        <span>{t.currency} {selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex-shrink-0 mt-4 pt-4 border-t border-border/80 flex flex-col sm:flex-row gap-2 justify-end items-stretch sm:items-center select-none w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onSelectTaxInvoice(selectedOrder)}
                  className="py-2.5 px-4 bg-brand-peach text-brand-terracotta hover:bg-brand-peach/80 text-xs rounded-xl font-bold uppercase transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border border-brand-terracotta/20"
                >
                  <Printer size={14} />
                  {t.viewInvoice}
                </button>
                {selectedOrder.status === "delivered" && (
                  <button
                    onClick={() => handlePrintReceipt(selectedOrder)}
                    className="py-2.5 px-5 bg-brand-forest text-white hover:bg-brand-forest/90 text-xs rounded-xl font-bold uppercase transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer size={14} />
                    {isRTL ? "طباعة الإيصال" : "Print Receipt"}
                  </button>
                )}
                {["placed", "processing"].includes(selectedOrder.status) ? (
                  <button
                    onClick={() => {
                      if (confirm(isRTL ? "هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟" : "Are you sure you want to cancel this order?")) {
                        onCancelOrder(selectedOrder.id);
                        setSelectedOrder(prev => prev ? { ...prev, status: "cancelled" } : null);
                      }
                    }}
                    className="w-full sm:w-auto py-2.5 px-6 bg-red-600 text-white hover:bg-red-700 text-xs rounded-xl font-bold uppercase transition-colors shadow-sm"
                  >
                    {isRTL ? "إلغاء الطلب" : "Cancel Order"}
                  </button>
                ) : selectedOrder.status === "cancelled" ? (
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-950/20 px-3 py-1.5 rounded-xl border border-red-200/50 border-dashed">
                    ⚠️ {isRTL ? "تم إلغاء هذه العملية بنجاح" : "This purchase transaction is cancelled"}
                  </p>
                ) : (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground bg-muted/40 border border-border/80 px-3.5 py-1.5 rounded-xl">
                    <Info size={14} className="text-brand-ink-soft" />
                    <span>
                      {selectedOrder.status === "delivered" 
                        ? (isRTL ? "تم التوصيل ولا يمكن إلغاؤه" : "Order delivered, cancellation closed")
                        : (isRTL ? "الطلب قيد الشحن ولا يمكن إلغاؤه" : "Order shipped, cancellation closed")
                      }
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
