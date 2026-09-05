import React, { useState } from "react";
import { X, Plus, Trash2, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Button } from "../../components/ui/Button";
import { useAppSettings } from "../../context/AppSettingsContext";
import type { SavedPayment } from "./types";

interface AccountPaymentsModalProps {
  open: boolean;
  onClose: () => void;
  payments: SavedPayment[];
  onUpdatePayments: (payments: SavedPayment[]) => void;
}

export function AccountPaymentsModal({ open, onClose, payments, onUpdatePayments }: AccountPaymentsModalProps) {
  const { t, isRTL } = useAppSettings();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCvv, setNewCardCvv] = useState("");

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber || !newCardName || !newCardExpiry) {
      toast.error(isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in required fields");
      return;
    }
    const cleanNum = newCardNumber.replace(/\s+/g, "");
    const cardBrand = cleanNum.startsWith("4") ? "Visa" : cleanNum.startsWith("5") ? "Mastercard" : "Card";
    onUpdatePayments([...payments, {
      id: Date.now().toString(),
      type: cardBrand,
      number: `**** **** **** ${cleanNum.slice(-4) || "0000"}`,
      expiry: newCardExpiry
    }]);
    setNewCardNumber("");
    setNewCardName("");
    setNewCardExpiry("");
    setNewCardCvv("");
    setIsAddingCard(false);
    toast.success(isRTL ? "تم إضافة البطاقة بنجاح" : "Payment card added successfully");
  };

  const detectedBrand = newCardNumber.replace(/\s+/g, "").startsWith("4") 
    ? "Visa" 
    : newCardNumber.replace(/\s+/g, "").startsWith("5") 
      ? "Mastercard" 
      : "";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              setIsAddingCard(false);
            }}
            className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-md h-full sm:h-auto bg-card border-0 sm:border border-border rounded-none sm:rounded-3xl p-5 sm:p-6 z-50 shadow-elev overflow-hidden flex flex-col max-h-screen sm:max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-foreground font-display text-base sm:text-lg">{t.paymentMethods}</h3>
              <button 
                onClick={() => {
                  onClose();
                  setIsAddingCard(false);
                }} 
                className="text-muted-foreground hover:text-foreground p-1"
                aria-label={isRTL ? "إغلاق" : "Close"}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pe-1.5 -me-1.5 ps-1.5 -ms-1.5 space-y-4">
              <AnimatePresence mode="wait">
                {isAddingCard ? (
                  <motion.form
                    key="add-card-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSaveCard}
                    className="space-y-4 border border-border/80 rounded-2xl p-4 bg-background/50 mb-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase text-brand-terracotta">
                        {isRTL ? "إضافة بطاقة جديدة" : "Add Payment Card"}
                      </h4>
                      {detectedBrand && (
                        <span className="text-xs font-bold text-brand-terracotta bg-brand-peach px-2 py-0.5 rounded-full font-mono">
                          {detectedBrand}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] text-muted-foreground mb-1">{t.cardNumber} *</label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={newCardNumber}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                          setNewCardNumber(val.replace(/(.{4})/g, "$1 ").trim());
                        }}
                        className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-muted-foreground mb-1">{t.cardName} *</label>
                      <input
                        type="text"
                        required
                        placeholder={isRTL ? "محمد أحمد" : "John Doe"}
                        value={newCardName}
                        onChange={e => setNewCardName(e.target.value)}
                        className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-muted-foreground mb-1">{t.expiry} *</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                          value={newCardExpiry}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                            setNewCardExpiry(val.length > 2 ? `${val.slice(0, 2)}/${val.slice(2)}` : val);
                          }}
                          className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-muted-foreground mb-1">{t.cvv} *</label>
                        <input
                          type="password"
                          required
                          placeholder="123"
                          maxLength={4}
                          value={newCardCvv}
                          onChange={e => setNewCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        size="md"
                        className="flex-1 text-xs font-semibold rounded-lg"
                      >
                        {isRTL ? "حفظ البطاقة" : "Save Card"}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setIsAddingCard(false);
                          setNewCardNumber("");
                          setNewCardName("");
                          setNewCardExpiry("");
                          setNewCardCvv("");
                        }}
                        variant="outline"
                        size="md"
                        className="px-4 rounded-lg text-xs"
                      >
                        {isRTL ? "إلغاء" : "Cancel"}
                      </Button>
                    </div>
                  </motion.form>
                ) : null}
              </AnimatePresence>

              <div className="space-y-3">
                {payments.map(card => (
                  <div key={card.id} className="bg-background border border-border/60 rounded-xl p-3.5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-peach/40 flex items-center justify-center text-brand-terracotta flex-shrink-0">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground text-sm font-semibold">{card.type}</span>
                          <span className="text-muted-foreground text-xs font-mono">{card.number}</span>
                        </div>
                        <p className="text-muted-foreground text-[11px]">{t.expiry}: {card.expiry}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        onUpdatePayments(payments.filter(p => p.id !== card.id));
                        toast.success(isRTL ? "تم حذف البطاقة بنجاح" : "Card deleted successfully");
                      }}
                      className="text-destructive hover:text-destructive-dark p-1"
                      aria-label={isRTL ? `حذف بطاقة ${card.type}` : `Delete ${card.type} card`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {!isAddingCard && (
                  <button 
                    onClick={() => setIsAddingCard(true)}
                    className="w-full py-2.5 bg-brand-peach text-brand-terracotta hover:bg-brand-terracotta hover:text-white rounded-xl text-xs font-semibold uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={14} /> {isRTL ? "إضافة بطاقة دفع جديدة" : "Add New Payment Card"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
