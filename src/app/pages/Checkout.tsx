import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, Check, CreditCard, Truck, MapPin, Shield, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

type Step = "shipping" | "payment" | "confirmation";

export function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { t, isRTL } = useAppSettings();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("shipping");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const shipping = totalPrice >= 500 ? 0 : 49;
  const tax = totalPrice * 0.14;
  const total = totalPrice + shipping + tax;

  const [shippingData, setShippingData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "EG",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const updateShipping = (field: string, value: string) =>
    setShippingData(prev => ({ ...prev, [field]: value }));

  const updatePayment = (field: string, value: string) =>
    setPaymentData(prev => ({ ...prev, [field]: value }));

  const validateShipping = () => {
    const { firstName, lastName, email, address, city, zip } = shippingData;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !address.trim() || !city.trim() || !zip.trim()) {
      toast.error(isRTL ? "يرجى ملء جميع الحقول المطلوبة (*)" : "Please fill in all required fields (*)");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(isRTL ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    const { cardNumber, cardName, expiry, cvv } = paymentData;
    if (!cardNumber.trim() || !cardName.trim() || !expiry.trim() || !cvv.trim()) {
      toast.error(isRTL ? "يرجى ملء جميع بيانات بطاقة الدفع (*)" : "Please fill in all payment card details (*)");
      return false;
    }
    const cleanCard = cardNumber.replace(/\s/g, "");
    if (cleanCard.length < 15 || cleanCard.length > 16) {
      toast.error(isRTL ? "يرجى إدخال رقم بطاقة صحيح" : "Please enter a valid card number");
      return false;
    }
    if (!expiry.includes("/") || expiry.split("/")[0].length !== 2 || expiry.split("/")[1].length !== 2) {
      toast.error(isRTL ? "يرجى إدخال تاريخ انتهاء صحيح (MM/YY)" : "Please enter a valid expiry date (MM/YY)");
      return false;
    }
    if (cvv.length < 3 || cvv.length > 4) {
      toast.error(isRTL ? "يرجى إدخال رمز أمان صحيح (CVV)" : "Please enter a valid security code (CVV)");
      return false;
    }
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setStep("payment");
    }
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) return;
    setIsPlacingOrder(true);
    await new Promise(r => setTimeout(r, 1500));
    clearCart();
    setStep("confirmation");
    setIsPlacingOrder(false);
    toast.success(isRTL ? "تم تأكيد طلبك! 🎉" : "Order placed successfully! 🎉");
  };

  const inputCls = [
    "w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground",
    "outline-none focus:border-brand-terracotta focus:ring-2 focus:ring-brand-terracotta/20 transition-all",
  ].join(" ");
  const labelCls = "block text-muted-foreground mb-1.5" as const;

  const steps = [
    { id: "shipping", label: t.shippingInfo, icon: MapPin },
    { id: "payment", label: t.paymentDetails, icon: CreditCard },
    { id: "confirmation", label: t.orderConfirmed, icon: Check },
  ];

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-5xl">🛒</p>
          <h2 className="text-foreground">{t.cartEmpty}</h2>
          <Link
            to="/products"
            className="inline-block bg-brand-terracotta text-white px-6 py-3 rounded-xl hover:bg-brand-terracotta-dark transition-colors"
            style={{ fontSize: "0.875rem" }}
          >
            {t.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Back to cart / home nav */}
        {step !== "confirmation" && (
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => step === "payment" ? setStep("shipping") : navigate("/cart")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontSize: "0.875rem" }}
            >
              <ArrowLeft size={16} className="rtl-flip" />
              {step === "payment" ? t.back : t.shoppingCart}
            </button>
            <span className="text-border">·</span>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "0.875rem" }}>
              {t.home}
            </Link>
          </div>
        )}

        {/* Step indicators */}
        <div className="flex items-center justify-center mb-8 gap-1">
          {steps.map((s, i) => {
            const currentIndex = steps.findIndex(x => x.id === step);
            const isDone = i < currentIndex;
            const isCurrent = s.id === step;
            return (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                  isCurrent ? "bg-brand-terracotta text-white" :
                  isDone ? "bg-brand-peach text-brand-terracotta" :
                  "text-muted-foreground"
                }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isCurrent ? "bg-white/20" :
                    isDone ? "bg-brand-terracotta/20" : "bg-muted"
                  }`} style={{ fontSize: "0.7rem" }}>
                    {isDone ? <Check size={11} className="text-brand-terracotta" /> : i + 1}
                  </div>
                  <span className="hidden sm:block" style={{ fontSize: "0.8rem" }}>
                    {i === 0 ? t.shippingInfo : i === 1 ? t.paymentDetails : t.orderSummary}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 rounded-full ${isDone || isCurrent ? "bg-brand-terracotta" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        {step === "confirmation" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center bg-card rounded-3xl p-8 border border-border"
          >
            <div className="w-20 h-20 bg-brand-peach rounded-full flex items-center justify-center mx-auto mb-5">
              <Check size={36} className="text-brand-terracotta" />
            </div>
            <h2 className="text-foreground mb-2">{t.orderConfirmed}</h2>
            <p className="text-muted-foreground mb-6" style={{ fontSize: "0.875rem" }}>
              {t.orderConfirmedNote}
            </p>
            <div className="bg-brand-peach rounded-2xl p-4 mb-6 text-start space-y-3">
              <div className="flex justify-between" style={{ fontSize: "0.875rem" }}>
                <span className="text-muted-foreground">{t.orderNumber}</span>
                <span className="text-foreground">#HJR-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: "0.875rem" }}>
                <span className="text-muted-foreground">{t.estimatedDelivery}</span>
                <span className="text-foreground">{t.businessDays}</span>
              </div>
              <div className="flex justify-between border-t border-border/50 pt-3" style={{ fontSize: "0.875rem" }}>
                <span className="text-muted-foreground">{t.totalPaid}</span>
                <span className="text-brand-terracotta">{t.currency} {total.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                to="/products"
                className="w-full block bg-brand-terracotta text-white py-3 rounded-xl hover:bg-brand-terracotta-dark transition-colors active:scale-[0.98]"
                style={{ fontSize: "0.875rem" }}
              >
                {t.continueShopping}
              </Link>
              <Link
                to="/account"
                className="w-full block border border-border text-foreground py-3 rounded-xl hover:bg-muted transition-colors"
                style={{ fontSize: "0.875rem" }}
              >
                {t.trackOrder}
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    className="bg-card rounded-3xl p-6 space-y-5 border border-border"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Truck size={18} className="text-brand-terracotta" />
                      <h2 className="text-foreground" style={{ fontSize: "1.1rem" }}>{t.shippingInfo}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.firstName} *</label>
                        <input type="text" value={shippingData.firstName} onChange={e => updateShipping("firstName", e.target.value)} className={inputCls} placeholder={isRTL ? "محمد" : "John"} />
                      </div>
                      <div>
                        <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.lastName} *</label>
                        <input type="text" value={shippingData.lastName} onChange={e => updateShipping("lastName", e.target.value)} className={inputCls} placeholder={isRTL ? "علي" : "Doe"} />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.email} *</label>
                      <input type="email" value={shippingData.email} onChange={e => updateShipping("email", e.target.value)} className={inputCls} placeholder="name@example.com" />
                    </div>

                    <div>
                      <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.phone}</label>
                      <input type="tel" value={shippingData.phone} onChange={e => updateShipping("phone", e.target.value)} className={inputCls} placeholder={isRTL ? "٠١٠٠٠٠٠٠٠٠٠" : "+20 100 000 0000"} />
                    </div>

                    <div>
                      <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.address} *</label>
                      <input type="text" value={shippingData.address} onChange={e => updateShipping("address", e.target.value)} className={inputCls} placeholder={isRTL ? "١٢٣ شارع التحرير" : "123 Main Street, Apt 4B"} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.city} *</label>
                        <input type="text" value={shippingData.city} onChange={e => updateShipping("city", e.target.value)} className={inputCls} placeholder={isRTL ? "القاهرة" : "Cairo"} />
                      </div>
                      <div>
                        <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.state}</label>
                        <input type="text" value={shippingData.state} onChange={e => updateShipping("state", e.target.value)} className={inputCls} placeholder={isRTL ? "القاهرة" : "Cairo"} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.zip} *</label>
                        <input type="text" value={shippingData.zip} onChange={e => updateShipping("zip", e.target.value)} className={inputCls} placeholder="11511" />
                      </div>
                      <div>
                        <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.country}</label>
                        <select value={shippingData.country} onChange={e => updateShipping("country", e.target.value)} className={inputCls}>
                          <option value="EG">{isRTL ? "مصر" : "Egypt"}</option>
                          <option value="SA">{isRTL ? "المملكة العربية السعودية" : "Saudi Arabia"}</option>
                          <option value="AE">{isRTL ? "الإمارات" : "UAE"}</option>
                          <option value="KW">{isRTL ? "الكويت" : "Kuwait"}</option>
                          <option value="GB">{isRTL ? "المملكة المتحدة" : "United Kingdom"}</option>
                          <option value="US">{isRTL ? "الولايات المتحدة" : "United States"}</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleContinueToPayment}
                      className="w-full bg-brand-terracotta text-white py-3.5 rounded-xl hover:bg-brand-terracotta-dark transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {t.continueToPay}
                      <CreditCard size={16} />
                    </button>
                  </motion.div>
                )}

                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    className="bg-card rounded-3xl p-6 space-y-5 border border-border"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard size={18} className="text-brand-terracotta" />
                      <h2 className="text-foreground" style={{ fontSize: "1.1rem" }}>{t.paymentDetails}</h2>
                    </div>

                    <div className="bg-brand-peach rounded-xl p-3 flex items-center gap-2 text-brand-terracotta" style={{ fontSize: "0.8rem" }}>
                      <Shield size={15} />
                      {t.paymentSecureNote}
                    </div>

                    <div>
                      <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.cardNumber} *</label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={e => updatePayment("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
                        className={inputCls}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.cardName} *</label>
                      <input type="text" value={paymentData.cardName} onChange={e => updatePayment("cardName", e.target.value)} className={inputCls} placeholder={isRTL ? "محمد علي" : "John Doe"} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.expiry} *</label>
                        <input
                          type="text"
                          value={paymentData.expiry}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                            updatePayment("expiry", val.length > 2 ? val.slice(0, 2) + "/" + val.slice(2) : val);
                          }}
                          className={inputCls}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={{ fontSize: "0.8rem" }}>{t.cvv} *</label>
                        <input type="text" value={paymentData.cvv} onChange={e => updatePayment("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))} className={inputCls} placeholder="123" maxLength={4} />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep("shipping")}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground border border-border px-4 py-3 rounded-xl transition-colors hover:bg-muted"
                        style={{ fontSize: "0.875rem" }}
                      >
                        <ChevronLeft size={16} className="rtl-flip" />
                        {t.back}
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                        className="flex-1 bg-brand-terracotta text-white py-3 rounded-xl hover:bg-brand-terracotta-dark transition-colors active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {isPlacingOrder ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {isRTL ? "جارٍ المعالجة..." : "Processing..."}
                          </>
                        ) : (
                          <>{t.placeOrder} · {t.currency} {total.toFixed(2)}</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order summary sidebar */}
            <div className="bg-card rounded-3xl p-5 h-fit space-y-4 border border-border">
              <h3 className="text-foreground" style={{ fontSize: "1rem" }}>{t.orderSummary}</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-cream-2 flex-shrink-0 flex items-center justify-center p-1">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                      <span className="absolute -top-1 -end-1 w-5 h-5 bg-brand-terracotta text-white rounded-full flex items-center justify-center" style={{ fontSize: "0.65rem" }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground line-clamp-1" style={{ fontSize: "0.8rem" }}>{item.product.name}</p>
                      <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{item.product.weight}</p>
                    </div>
                    <span className="text-foreground" style={{ fontSize: "0.8rem" }}>
                      {t.currency} {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2" style={{ fontSize: "0.875rem" }}>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.subtotal}</span>
                  <span>{t.currency} {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.shipping}</span>
                  <span>{shipping === 0 ? <span className="text-brand-sage">{t.free}</span> : `${t.currency} ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.tax} (14%)</span>
                  <span>{t.currency} {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground border-t border-border pt-2">
                  <span>{t.total}</span>
                  <span className="text-brand-terracotta">{t.currency} {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
