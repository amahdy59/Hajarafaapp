import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, Check, CreditCard, Truck, MapPin, Shield, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";
import { DELIVERY_NOTICE, SHIPPING_CONFIG } from "../config/contact";
import { usePageMeta } from "../hooks/usePageMeta";


type Step = "shipping" | "payment" | "confirmation";

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { t, isRTL } = useAppSettings();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("shipping");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderNumber] = useState(() => `HJR-${Date.now().toString().slice(-6)}`);
  const [errors, setErrors] = useState<Record<string, string>>({});

  usePageMeta({
    description: isRTL
      ? "خطوات دفع أوضح مع تنبيه صريح أن هذا التدفق ما زال عرضاً تجريبياً."
      : "A clearer checkout flow with an explicit note that this payment experience is still a demo.",
    title: isRTL ? "الدفع | حاج عرفة" : "Checkout | Haj Arafa",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [step]);

  const shipping = totalPrice >= SHIPPING_CONFIG.freeThreshold ? 0 : SHIPPING_CONFIG.flatRate;
  const tax = totalPrice * 0.14;
  const total = totalPrice + shipping + tax;

  const [shippingData, setShippingData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "EG",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const updateShipping = (field: string, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updatePayment = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateShipping = () => {
    const { firstName, lastName, email, address, city, zip } = shippingData;
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = isRTL ? "الاسم الأول مطلوب" : "First name is required";
    if (!lastName.trim()) newErrors.lastName = isRTL ? "اسم العائلة مطلوب" : "Last name is required";
    if (!email.trim()) {
      newErrors.email = isRTL ? "البريد الإلكتروني مطلوب" : "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = isRTL ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email address";
      }
    }
    if (!address.trim()) newErrors.address = isRTL ? "العنوان مطلوب" : "Address is required";
    if (!city.trim()) newErrors.city = isRTL ? "المدينة مطلوبة" : "City is required";
    if (!zip.trim()) newErrors.zip = isRTL ? "الرمز البريدي مطلوب" : "Postal code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(isRTL ? "يرجى ملء جميع الحقول المطلوبة (*)" : "Please fill in all required fields (*)");
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePayment = () => {
    const { cardNumber, cardName, expiry, cvv } = paymentData;
    const newErrors: Record<string, string> = {};

    const cleanCard = cardNumber.replace(/\s/g, "");
    if (!cleanCard) {
      newErrors.cardNumber = isRTL ? "رقم البطاقة مطلوب" : "Card number is required";
    } else if (cleanCard.length < 15 || cleanCard.length > 16) {
      newErrors.cardNumber = isRTL ? "يرجى إدخال رقم بطاقة صحيح (١٥-١٦ رقماً)" : "Please enter a valid card number (15-16 digits)";
    }

    if (!cardName.trim()) {
      newErrors.cardName = isRTL ? "الاسم على البطاقة مطلوب" : "Cardholder name is required";
    }

    if (!expiry.trim()) {
      newErrors.expiry = isRTL ? "تاريخ الانتهاء مطلوب" : "Expiry date is required";
    } else if (!expiry.includes("/") || expiry.split("/")[0].length !== 2 || expiry.split("/")[1].length !== 2) {
      newErrors.expiry = isRTL ? "يرجى إدخال تاريخ انتهاء صحيح (MM/YY)" : "Please enter a valid expiry date (MM/YY)";
    }

    if (!cvv.trim()) {
      newErrors.cvv = isRTL ? "رمز CVV مطلوب" : "CVV is required";
    } else if (cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = isRTL ? "رمز أمان غير صحيح" : "Invalid CVV code";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(isRTL ? "يرجى ملء جميع بيانات بطاقة الدفع (*)" : "Please fill in all payment card details (*)");
      return false;
    }
    setErrors({});
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
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 py-6">

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
            <span className="text-muted-foreground">·</span>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "0.875rem" }}>
              {t.home}
            </Link>
          </div>
        )}

        {/* Step indicators */}
        <ol role="list" aria-label={isRTL ? "مراحل إتمام الطلب" : "Checkout steps"} className="flex items-center justify-center mb-8 gap-1">
          {steps.map((s, i) => {
            const currentIndex = steps.findIndex(x => x.id === step);
            const isDone = i < currentIndex;
            const isCurrent = s.id === step;
            return (
              <li key={s.id} aria-current={isCurrent ? "step" : undefined} className="flex items-center">
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
                  <div aria-hidden="true" className={`w-8 h-0.5 mx-1 rounded-full ${isDone || isCurrent ? "bg-brand-terracotta" : "bg-border"}`} />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mb-6 rounded-2xl border border-brand-terracotta/20 bg-brand-peach/50 px-4 py-3 text-sm text-brand-ink-soft">
          {isRTL
            ? "تنبيه: هذا مسار دفع تجريبي داخل الواجهة فقط. لا تتم معالجة أي دفعات حقيقية أو إنشاء طلبات فعلية بعد."
            : "Note: this checkout is still a front-end demo. No real payments are processed and no live orders are created yet."}
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
                <span className="text-foreground">#{orderNumber}</span>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="checkout-first-name" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.firstName} *</label>
                        <input
                          id="checkout-first-name"
                          type="text"
                          value={shippingData.firstName}
                          onChange={e => updateShipping("firstName", e.target.value)}
                          className={`${inputCls} ${errors.firstName ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                          placeholder={isRTL ? "محمد" : "John"}
                          autoComplete="given-name"
                          required
                          aria-invalid={!!errors.firstName}
                          aria-describedby={errors.firstName ? "err-first-name" : undefined}
                        />
                        {errors.firstName && <p id="err-first-name" role="alert" className="text-destructive text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label htmlFor="checkout-last-name" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.lastName} *</label>
                        <input
                          id="checkout-last-name"
                          type="text"
                          value={shippingData.lastName}
                          onChange={e => updateShipping("lastName", e.target.value)}
                          className={`${inputCls} ${errors.lastName ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                          placeholder={isRTL ? "علي" : "Doe"}
                          autoComplete="family-name"
                          required
                          aria-invalid={!!errors.lastName}
                          aria-describedby={errors.lastName ? "err-last-name" : undefined}
                        />
                        {errors.lastName && <p id="err-last-name" role="alert" className="text-destructive text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="checkout-email" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.email} *</label>
                      <input
                        id="checkout-email"
                        type="email"
                        value={shippingData.email}
                        onChange={e => updateShipping("email", e.target.value)}
                        className={`${inputCls} ${errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                        placeholder="name@example.com"
                        autoComplete="email"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "err-email" : undefined}
                      />
                      {errors.email && <p id="err-email" role="alert" className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="checkout-phone" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.phone}</label>
                      <input id="checkout-phone" type="tel" value={shippingData.phone} onChange={e => updateShipping("phone", e.target.value)} className={inputCls} placeholder={isRTL ? "٠١٠٠٠٠٠٠٠٠٠" : "+20 100 000 0000"} autoComplete="tel" />
                    </div>

                    <div>
                      <label htmlFor="checkout-address" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.address} *</label>
                      <input
                        id="checkout-address"
                        type="text"
                        value={shippingData.address}
                        onChange={e => updateShipping("address", e.target.value)}
                        className={`${inputCls} ${errors.address ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                        placeholder={isRTL ? "١٢٣ شارع التحرير" : "123 Main Street, Apt 4B"}
                        autoComplete="street-address"
                        required
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? "err-address" : undefined}
                      />
                      {errors.address && <p id="err-address" role="alert" className="text-destructive text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="checkout-city" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.city} *</label>
                        <input
                          id="checkout-city"
                          type="text"
                          value={shippingData.city}
                          onChange={e => updateShipping("city", e.target.value)}
                          className={`${inputCls} ${errors.city ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                          placeholder={isRTL ? "القاهرة" : "Cairo"}
                          autoComplete="address-level2"
                          required
                          aria-invalid={!!errors.city}
                          aria-describedby={errors.city ? "err-city" : undefined}
                        />
                        {errors.city && <p id="err-city" role="alert" className="text-destructive text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label htmlFor="checkout-state" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.state}</label>
                        <input id="checkout-state" type="text" value={shippingData.state} onChange={e => updateShipping("state", e.target.value)} className={inputCls} placeholder={isRTL ? "القاهرة" : "Cairo"} autoComplete="address-level1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="checkout-zip" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.zip} *</label>
                        <input
                          id="checkout-zip"
                          type="text"
                          value={shippingData.zip}
                          onChange={e => updateShipping("zip", e.target.value)}
                          className={`${inputCls} ${errors.zip ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                          placeholder="11511"
                          autoComplete="postal-code"
                          required
                          aria-invalid={!!errors.zip}
                          aria-describedby={errors.zip ? "err-zip" : undefined}
                        />
                        {errors.zip && <p id="err-zip" role="alert" className="text-destructive text-xs mt-1">{errors.zip}</p>}
                      </div>
                      <div>
                        <label htmlFor="checkout-country" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.country}</label>
                        <select id="checkout-country" value={shippingData.country} onChange={e => updateShipping("country", e.target.value)} className={inputCls} autoComplete="country">
                          <option value="EG">{isRTL ? "مصر" : "Egypt"}</option>
                          <option value="SA">{isRTL ? "المملكة العربية السعودية" : "Saudi Arabia"}</option>
                          <option value="AE">{isRTL ? "الإمارات" : "UAE"}</option>
                          <option value="KW">{isRTL ? "الكويت" : "Kuwait"}</option>
                          <option value="GB">{isRTL ? "المملكة المتحدة" : "United Kingdom"}</option>
                          <option value="US">{isRTL ? "الولايات المتحدة" : "United States"}</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      onClick={handleContinueToPayment}
                      size="lg"
                      fullWidth
                      rightIcon={<CreditCard size={16} />}
                    >
                      {t.continueToPay}
                    </Button>
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
                      <label htmlFor="checkout-card-number" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.cardNumber} *</label>
                      <input
                        id="checkout-card-number"
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={e => updatePayment("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
                        className={`${inputCls} ${errors.cardNumber ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                        placeholder="1234 5678 9012 3456"
                        autoComplete="cc-number"
                        inputMode="numeric"
                        maxLength={19}
                        aria-invalid={!!errors.cardNumber}
                        aria-describedby={errors.cardNumber ? "err-card-number" : undefined}
                      />
                      {errors.cardNumber && <p id="err-card-number" role="alert" className="text-destructive text-xs mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div>
                      <label htmlFor="checkout-card-name" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.cardName} *</label>
                      <input
                        id="checkout-card-name"
                        type="text"
                        value={paymentData.cardName}
                        onChange={e => updatePayment("cardName", e.target.value)}
                        className={`${inputCls} ${errors.cardName ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                        placeholder={isRTL ? "محمد علي" : "John Doe"}
                        autoComplete="cc-name"
                        aria-invalid={!!errors.cardName}
                        aria-describedby={errors.cardName ? "err-card-name" : undefined}
                      />
                      {errors.cardName && <p id="err-card-name" role="alert" className="text-destructive text-xs mt-1">{errors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="checkout-card-expiry" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.expiry} *</label>
                        <input
                          id="checkout-card-expiry"
                          type="text"
                          value={paymentData.expiry}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                            updatePayment("expiry", val.length > 2 ? val.slice(0, 2) + "/" + val.slice(2) : val);
                          }}
                          className={`${inputCls} ${errors.expiry ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          inputMode="numeric"
                          maxLength={5}
                          aria-invalid={!!errors.expiry}
                          aria-describedby={errors.expiry ? "err-expiry" : undefined}
                        />
                        {errors.expiry && <p id="err-expiry" role="alert" className="text-destructive text-xs mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label htmlFor="checkout-card-cvv" className={labelCls} style={{ fontSize: "0.8rem" }}>{t.cvv} *</label>
                        <input
                          id="checkout-card-cvv"
                          type="text"
                          value={paymentData.cvv}
                          onChange={e => updatePayment("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                          className={`${inputCls} ${errors.cvv ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                          placeholder="123"
                          maxLength={4}
                          autoComplete="cc-csc"
                          inputMode="numeric"
                          aria-invalid={!!errors.cvv}
                          aria-describedby={errors.cvv ? "err-cvv" : undefined}
                        />
                        {errors.cvv && <p id="err-cvv" role="alert" className="text-destructive text-xs mt-1">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={() => setStep("shipping")}
                        variant="outline"
                        size="lg"
                        className="flex-none px-4"
                        leftIcon={<ChevronLeft size={16} className="rtl-flip" />}
                      >
                        {t.back}
                      </Button>
                      <Button
                        type="button"
                        onClick={handlePlaceOrder}
                        isLoading={isPlacingOrder}
                        variant="primary"
                        size="lg"
                        className="flex-1 text-sm sm:text-base"
                      >
                        {t.placeOrder} · {t.currency} {total.toFixed(2)}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order summary sidebar */}
            <div className="bg-card rounded-3xl p-5 h-fit space-y-4 border border-border">
              <h3 className="text-foreground" style={{ fontSize: "1rem" }}>{t.orderSummary}</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
                {items.map(item => {
                  const localizedName = isRTL && item.product.nameAr ? item.product.nameAr : item.product.name;
                  return (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden product-media-surface flex-shrink-0 flex items-center justify-center p-1">
                        <img src={item.product.image} alt={localizedName} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                        <span className="absolute -top-1 -end-1 w-5 h-5 bg-brand-terracotta text-white rounded-full flex items-center justify-center" style={{ fontSize: "0.65rem" }}>
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground line-clamp-1" style={{ fontSize: "0.8rem" }}>{localizedName}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{item.product.weight}</p>
                      </div>
                      <span className="text-foreground" style={{ fontSize: "0.8rem" }}>
                        {t.currency} {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border pt-4 space-y-2" style={{ fontSize: "0.875rem" }}>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.subtotal}</span>
                  <span>{t.currency} {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.shipping}</span>
                  <span>{shipping === 0 ? <span className="text-brand-sage-dark">{t.free}</span> : `${t.currency} ${shipping.toFixed(2)}`}</span>
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

              {/* Delivery Info Tag */}
              <div className="flex items-center gap-2.5 bg-brand-peach/40 dark:bg-zinc-800/40 border border-brand-terracotta/10 dark:border-white/5 py-2.5 px-3.5 rounded-xl text-[11px] font-semibold text-brand-forest dark:text-[#EFECE6] select-none shadow-sm leading-none justify-center">
                <Truck size={14} className="text-brand-terracotta flex-shrink-0" />
                <span>
                  {isRTL 
                    ? DELIVERY_NOTICE.ar 
                    : DELIVERY_NOTICE.en}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
