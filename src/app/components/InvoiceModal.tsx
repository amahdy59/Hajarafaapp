import { useRef } from "react";
import { X, Printer, CheckCircle2, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppSettings } from "../context/AppSettingsContext";
import { useDialogAccessibility } from "../hooks/useDialogAccessibility";
import { Button } from "./ui/Button";
import logoImg from "../../assets/logo.webp";

export interface InvoiceItem {
  name: string;
  nameAr?: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone?: string;
  customerAddress: string;
  governorate?: string;
  paymentMethodTitle: string;
  items: InvoiceItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  tax: number;
  total: number;
}

interface InvoiceModalProps {
  open: boolean;
  onClose: () => void;
  invoice: InvoiceData;
}

export function InvoiceModal({ open, onClose, invoice }: InvoiceModalProps) {
  const { t, isRTL, formatPrice } = useAppSettings();
  const modalRef = useRef<HTMLDivElement>(null);

  useDialogAccessibility({
    containerRef: modalRef,
    open,
    onClose,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 print:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-ink/50 backdrop-blur-sm print:hidden"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="invoice-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-card text-card-foreground rounded-3xl border border-border shadow-elev z-10 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-0 print:rounded-none print:m-0"
          >
            {/* Modal Header Actions (hidden on print) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/40 print:hidden flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-foreground" id="invoice-modal-title">
                  {t.taxInvoice} • #{invoice.orderNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePrint}
                  size="sm"
                  variant="outline"
                  className="h-10 text-xs font-semibold gap-1.5"
                  leftIcon={<Printer size={15} />}
                >
                  {t.printInvoice}
                </Button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label={t.closeInvoice}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Invoice Document Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-foreground print:p-4 print:text-black">
              {/* Brand & Tax Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6 print:border-black/20">
                <div className="flex items-center gap-3">
                  <img src={logoImg} alt="Haj Arafa" className="h-12 w-auto object-contain" />
                  <div>
                    <h1 className="font-display text-xl font-bold text-brand-forest dark:text-brand-sage-dark print:text-black">
                      {isRTL ? "حاج عرفة للمنتجات الطبيعية" : "Haj Arafa Natural Products"}
                    </h1>
                    <p className="text-xs text-muted-foreground print:text-black/70">
                      {isRTL ? "سجل تجاري: ١٠٤٨٢٠ • بطاقة ضريبية: ٢٣٩-٤٨١-٩٠٢" : "C.R.: 104820 • Tax ID: 239-481-902"}
                    </p>
                    <p className="text-[11px] text-muted-foreground print:text-black/60">
                      {isRTL ? "باب اللوق، وسط البلد، القاهرة، جمهورية مصر العربية" : "Bab El Louk, Downtown, Cairo, Egypt"}
                    </p>
                  </div>
                </div>

                <div className="text-start sm:text-end">
                  <span className="inline-block bg-brand-peach text-brand-terracotta border border-brand-terracotta/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider print:border-black print:text-black print:bg-transparent">
                    {t.taxInvoice}
                  </span>
                  <p className="text-xs font-mono font-bold text-foreground mt-2">
                    #{invoice.orderNumber}
                  </p>
                  <p className="text-[11px] text-muted-foreground print:text-black/70">
                    {invoice.date}
                  </p>
                </div>
              </div>

              {/* Bill To & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-2xl border border-border/60 print:border-black/20 print:bg-transparent text-xs">
                <div>
                  <span className="font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    {t.billTo}:
                  </span>
                  <p className="font-semibold text-sm text-foreground print:text-black">{invoice.customerName}</p>
                  {invoice.customerPhone && (
                    <p className="text-muted-foreground font-mono mt-0.5 print:text-black/80">{invoice.customerPhone}</p>
                  )}
                  <p className="text-muted-foreground mt-0.5 print:text-black/80">{invoice.customerAddress}</p>
                  {invoice.governorate && (
                    <p className="text-brand-terracotta font-semibold mt-0.5 print:text-black">{invoice.governorate}</p>
                  )}
                </div>

                <div className="sm:text-end space-y-1">
                  <span className="font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    {t.paymentMethod}:
                  </span>
                  <p className="font-semibold text-sm text-foreground print:text-black">{invoice.paymentMethodTitle}</p>
                  <div className="flex sm:justify-end items-center gap-1 text-xs text-brand-forest dark:text-brand-sage print:text-black">
                    <CheckCircle2 size={13} />
                    <span>{isRTL ? "معتمدة إلكترونياً" : "Verified & Issued"}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground print:text-black/60">{t.vatIncluded}</p>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start border-collapse">
                  <thead>
                    <tr className="border-b border-border print:border-black text-muted-foreground uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 text-start font-bold">{t.itemDescription}</th>
                      <th className="py-2.5 text-center font-bold">{t.quantity}</th>
                      <th className="py-2.5 text-end font-bold">{t.unitPrice}</th>
                      <th className="py-2.5 text-end font-bold">{t.subtotal}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 print:divide-black/20">
                    {invoice.items.map((item, idx) => (
                      <tr key={idx} className="py-2">
                        <td className="py-2.5 text-start font-medium text-foreground print:text-black">
                          {isRTL && item.nameAr ? item.nameAr : item.name}
                        </td>
                        <td className="py-2.5 text-center text-muted-foreground print:text-black">
                          {item.quantity}
                        </td>
                        <td className="py-2.5 text-end text-muted-foreground print:text-black">
                          {formatPrice(item.unitPrice)}
                        </td>
                        <td className="py-2.5 text-end font-semibold text-foreground print:text-black">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Totals & E-Invoice QR */}
              <div className="border-t border-border pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 print:border-black">
                {/* QR stamp simulation for Egyptian Tax Authority (ETA) compliance */}
                <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border print:border-black/20 print:bg-transparent">
                  <div className="w-16 h-16 bg-white rounded-lg p-1 border border-black/10 flex items-center justify-center flex-shrink-0">
                    <QrCode size={56} className="text-black" />
                  </div>
                  <div className="text-[10px] text-muted-foreground space-y-0.5 print:text-black/80">
                    <p className="font-bold text-foreground print:text-black">
                      {isRTL ? "منظومة الفاتورة الإلكترونية" : "ETA E-Invoice Standard"}
                    </p>
                    <p>UUID: {invoice.orderNumber}-ETA-EG</p>
                    <p>{isRTL ? "مصلحة الضرائب المصرية" : "Egyptian Tax Authority"}</p>
                  </div>
                </div>

                {/* Subtotals & Grand Total */}
                <div className="w-full sm:w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground print:text-black/80">
                    <span>{t.subtotal}:</span>
                    <span>{formatPrice(invoice.subtotal)}</span>
                  </div>
                  {invoice.discount ? (
                    <div className="flex justify-between text-brand-terracotta print:text-black">
                      <span>{t.discount}:</span>
                      <span>-{formatPrice(invoice.discount)}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between text-muted-foreground print:text-black/80">
                    <span>{t.vatAmount}:</span>
                    <span>{formatPrice(invoice.tax)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground print:text-black/80">
                    <span>{t.shipping}:</span>
                    <span>{invoice.shipping === 0 ? t.free : formatPrice(invoice.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-border pt-2 text-brand-terracotta print:border-black print:text-black">
                    <span>{t.total}:</span>
                    <span>{formatPrice(invoice.total)}</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] text-muted-foreground border-t border-border/40 pt-4 print:border-black/20 print:text-black/70">
                {isRTL
                  ? "شكراً لتسوقكم من حاج عرفة • الخط الساخن: ١٧٣٠٩ • www.hajarafa.com"
                  : "Thank you for shopping with Haj Arafa • Hotline: 17309 • www.hajarafa.com"}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
