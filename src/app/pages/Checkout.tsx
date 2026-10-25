import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { 
  Check, CreditCard, Truck, MapPin, Shield, ArrowLeft, 
  Banknote, Smartphone, MessageCircle, Lock, AlertCircle 
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";
import { EGYPT_GOVERNORATES } from "../data/egyptLocations";
import { CloudflareTurnstile } from "../components/CloudflareTurnstile";
import { generateWhatsAppOrderLink } from "../config/cloudflare";
import { usePageMeta } from "../hooks/usePageMeta";

type Step = "shipping" | "payment" | "confirmation";
type PaymentMethod = "cod" | "instapay" | "card" | "fawry";

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { t, isRTL } = useAppSettings();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("shipping");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isBotVerified, setIsBotVerified] = useState(false);
  const [orderNumber] = useState(() => `HJR-${Date.now().toString().slice(-6)}`);

  // Selected Egyptian payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  usePageMeta({
    description: isRTL
      ? "إتمام الطلب والدفع مع خيارات مخصصة لمصر: الدفع عند الاستلام، إنستاباي، والمحافظ الإلكترونية، وحماية أمنية عبر Cloudflare."
      : "Complete order with Egypt-ready payment options: Cash on Delivery, InstaPay, Mobile Wallets, and Cloudflare edge security.",
    title: isRTL ? "الدفع وإتمام الطلب | حاج عرفة" : "Checkout | Haj Arafa",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [step]);

  const shipping = totalPrice >= 500 ? 0 : 49;
  const tax = totalPrice * 0.14;
  const total = totalPrice + shipping + tax;

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    governorate: "cairo",
    district: "",
    streetAddress: "",
    buildingInfo: "",
    landmark: "",
    notes: "",
  });

  const [paymentData, setPaymentData] = useState({
    walletPhone: "",
    instaPayUsername: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const updateShipping = (field: string, value: string) =>
    setShippingData(prev => ({ ...prev, [field]: value }));

  const updatePayment = (field: string, value: string) =>
    setPaymentData(prev => ({ ...prev, [field]: value }));

  const selectedGov = EGYPT_GOVERNORATES.find(g => g.id === shippingData.governorate) || EGYPT_GOVERNORATES[0];

  const validateShipping = () => {
    const { firstName, lastName, phone, district, streetAddress } = shippingData;
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !district.trim() || !streetAddress.trim()) {
      toast.error(isRTL ? "يرجى ملء جميع الحقول المطلوبة (*)" : "Please fill in all required fields (*)");
      return false;
    }
    // Egyptian mobile validation (010, 011, 012, 015)
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!/^(\+?20)?0?1[0125][0-9]{8}$/.test(cleanPhone)) {
      toast.error(isRTL ? "يرجى إدخال رقم هاتف محمول مصري صحيح (مثال: ٠١٠١٢٣٤٥٦٧٨)" : "Please enter a valid Egyptian mobile number (e.g. 01012345678)");
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === "card") {
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
    } else if (paymentMethod === "instapay") {
      if (!paymentData.instaPayUsername.trim() && !paymentData.walletPhone.trim()) {
        toast.error(isRTL ? "يرجى إدخال عنوان إنستاباي (IPA) أو رقم المحفظة المحول منها" : "Please provide your InstaPay handle or sender wallet number");
        return false;
      }
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
    await new Promise(r => setTimeout(r, 1200));
    clearCart();
    setStep("confirmation");
    setIsPlacingOrder(false);
    toast.success(isRTL ? "تم تأكيد طلبك بنجاح! 🎉" : "Order placed successfully! 🎉");
  };

  const handleWhatsAppCheckout = () => {
    const summaryItems = items.map(item => ({
      name: isRTL && item.product.nameAr ? item.product.nameAr : item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));
    const waUrl = generateWhatsAppOrderLink(summaryItems, total, t.currency, isRTL);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const inputCls = [
    "w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground",
    "outline-none focus:border-brand-terracotta focus:ring-2 focus:ring-brand-terracotta/20 transition-all text-sm",
  ].join(" ");
  const labelCls = "block text-foreground/80 font-semibold mb-1.5 text-xs";

  const steps = [
    { id: "shipping", label: isRTL ? "بيانات التوصيل" : "Delivery Address", icon: MapPin },
    { id: "payment", label: isRTL ? "طريقة الدفع" : "Payment Method", icon: CreditCard },
    { id: "confirmation", label: isRTL ? "تأكيد الطلب" : "Confirmation", icon: Check },
  ];

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <p className="text-5xl">🛒</p>
          <h2 className="text-foreground font-display text-xl font-bold">{t.cartEmpty}</h2>
          <p className="text-muted-foreground text-sm">{t.cartEmptyHint}</p>
          <Link
            to="/products"
            className="inline-block bg-brand-terracotta text-white px-6 py-3 rounded-xl hover:bg-brand-terracotta-dark transition-all text-sm font-bold shadow-soft"
          >
            {t.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 py-6">

        {/* Back navigation */}
        {step !== "confirmation" && (
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => step === "payment" ? setStep("shipping") : navigate("/cart")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-xs font-semibold"
            >
              <ArrowLeft size={16} className="rtl-flip" />
              <span>{step === "payment" ? t.back : t.shoppingCart}</span>
            </button>

            {/* Quick WhatsApp checkout link */}
            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-3 py-1 rounded-full text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle size={14} />
              <span>{isRTL ? "الطلب السريع عبر واتساب" : "Order via WhatsApp"}</span>
            </button>
          </div>
        )}

        {/* Step indicators */}
        <div className="flex items-center justify-center mb-8 gap-2">
          {steps.map((s, i) => {
            const currentIndex = steps.findIndex(x => x.id === step);
            const isDone = i < currentIndex;
            const isCurrent = s.id === step;
            return (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
                  isCurrent ? "bg-brand-terracotta text-white shadow-sm font-semibold" :
                  isDone ? "bg-brand-peach text-brand-terracotta font-semibold" :
                  "text-muted-foreground"
                }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    isCurrent ? "bg-white/20" :
                    isDone ? "bg-brand-terracotta/20" : "bg-muted"
                  }`}>
                    {isDone ? <Check size={12} className="text-brand-terracotta" /> : i + 1}
                  </div>
                  <span className="hidden sm:inline text-xs">
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-6 sm:w-10 h-0.5 mx-1 rounded-full ${isDone || isCurrent ? "bg-brand-terracotta" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        {step === "confirmation" ? (
          /* Confirmation Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-elev"
          >
            <div className="w-20 h-20 bg-brand-peach rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-terracotta/20">
              <Check size={38} className="text-brand-terracotta" />
            </div>
            <h2 className="text-foreground font-display text-2xl font-bold mb-2">{t.orderConfirmed}</h2>
            <p className="text-muted-foreground text-sm mb-6">
              {isRTL 
                ? "شكراً لتسوقك من حاج عرفة! تم استلام طلبك وسيتواصل معك مندوب التوصيل لتأكيد الموعد."
                : "Thank you for shopping with Haj Arafa! Your order has been received and our courier will contact you shortly."}
            </p>

            <div className="bg-brand-peach/40 dark:bg-zinc-800/60 rounded-2xl p-4 mb-6 text-start space-y-3 border border-brand-terracotta/10">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t.orderNumber}</span>
                <span className="font-bold text-foreground">#{orderNumber}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{isRTL ? "المحافظة ووقت التوصيل" : "Delivery Governorate"}</span>
                <span className="font-semibold text-foreground">
                  {isRTL ? selectedGov.nameAr : selectedGov.nameEn} ({selectedGov.deliveryHours} {isRTL ? "ساعة" : "hrs"})
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{isRTL ? "طريقة الدفع المختارة" : "Payment Method"}</span>
                <span className="font-semibold text-foreground">
                  {paymentMethod === "cod" ? (isRTL ? "الدفع عند الاستلام" : "Cash on Delivery") :
                   paymentMethod === "instapay" ? "InstaPay / Mobile Wallet" :
                   paymentMethod === "card" ? "Credit / Debit Card" : "Fawry Pay"}
                </span>
              </div>
              <div className="flex justify-between border-t border-border/60 pt-3 text-sm">
                <span className="font-bold text-foreground">{t.totalPaid}</span>
                <span className="font-extrabold text-brand-terracotta">{t.currency} {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-all font-bold text-sm shadow-sm"
              >
                <MessageCircle size={18} />
                <span>{isRTL ? "متابعة الطلب عبر واتساب" : "Confirm Order on WhatsApp"}</span>
              </button>

              <Link
                to="/products"
                className="w-full block bg-brand-terracotta text-white py-3 rounded-xl hover:bg-brand-terracotta-dark transition-all text-sm font-semibold"
              >
                {t.continueShopping}
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    className="bg-card rounded-3xl p-5 sm:p-6 space-y-4 border border-border shadow-soft"
                  >
                    <div className="flex items-center justify-between border-b border-border/50 pb-3">
                      <div className="flex items-center gap-2">
                        <Truck size={20} className="text-brand-terracotta" />
                        <h2 className="text-foreground font-display text-lg font-bold">
                          {isRTL ? "بيانات الشحن والتوصيل في مصر" : "Egyptian Shipping Information"}
                        </h2>
                      </div>
                      <span className="text-xs text-brand-terracotta font-semibold bg-brand-peach px-2.5 py-1 rounded-full">
                        {isRTL ? "توصيل سريع" : "Express Delivery"}
                      </span>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="checkout-first-name" className={labelCls}>{t.firstName} *</label>
                        <input
                          id="checkout-first-name"
                          type="text"
                          value={shippingData.firstName}
                          onChange={e => updateShipping("firstName", e.target.value)}
                          className={inputCls}
                          placeholder={isRTL ? "أحمد" : "Ahmed"}
                          autoComplete="given-name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="checkout-last-name" className={labelCls}>{t.lastName} *</label>
                        <input
                          id="checkout-last-name"
                          type="text"
                          value={shippingData.lastName}
                          onChange={e => updateShipping("lastName", e.target.value)}
                          className={inputCls}
                          placeholder={isRTL ? "عرفة" : "Arafa"}
                          autoComplete="family-name"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="checkout-phone" className={labelCls}>
                          {isRTL ? "رقم الهاتف المحمول (مصر) *" : "Mobile Phone (Egypt) *"}
                        </label>
                        <input
                          id="checkout-phone"
                          type="tel"
                          value={shippingData.phone}
                          onChange={e => updateShipping("phone", e.target.value)}
                          className={inputCls}
                          placeholder="010XXXXXXXX"
                          autoComplete="tel"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="checkout-email" className={labelCls}>{t.email} ({isRTL ? "اختياري" : "Optional"})</label>
                        <input
                          id="checkout-email"
                          type="email"
                          value={shippingData.email}
                          onChange={e => updateShipping("email", e.target.value)}
                          className={inputCls}
                          placeholder="name@example.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    {/* Egyptian Governorate & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="checkout-gov" className={labelCls}>
                          {isRTL ? "المحافظة *" : "Governorate *"}
                        </label>
                        <select
                          id="checkout-gov"
                          value={shippingData.governorate}
                          onChange={e => updateShipping("governorate", e.target.value)}
                          className={inputCls}
                        >
                          {EGYPT_GOVERNORATES.map(gov => (
                            <option key={gov.id} value={gov.id}>
                              {isRTL ? gov.nameAr : gov.nameEn} ({isRTL ? `خلال ${gov.deliveryHours} ساعة` : `${gov.deliveryHours} hrs`})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="checkout-district" className={labelCls}>
                          {isRTL ? "المدينة / الحي *" : "District / Area *"}
                        </label>
                        <input
                          id="checkout-district"
                          type="text"
                          value={shippingData.district}
                          onChange={e => updateShipping("district", e.target.value)}
                          className={inputCls}
                          placeholder={isRTL ? "المعادي، التجمع الخامس، الدقي، الشيخ زايد..." : "Maadi, Tagamoa, Dokki, Zayed..."}
                          required
                        />
                      </div>
                    </div>

                    {/* Detailed Street Address */}
                    <div>
                      <label htmlFor="checkout-street" className={labelCls}>
                        {isRTL ? "اسم الشارع والعنوان بالتفصيل *" : "Street Address *"}
                      </label>
                      <input
                        id="checkout-street"
                        type="text"
                        value={shippingData.streetAddress}
                        onChange={e => updateShipping("streetAddress", e.target.value)}
                        className={inputCls}
                        placeholder={isRTL ? "شارع ٩، متفرع من شارع النصر" : "Street 9, off El Nasr St"}
                        autoComplete="street-address"
                        required
                      />
                    </div>

                    {/* Building, Floor, Apartment & Landmark */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="checkout-building" className={labelCls}>
                          {isRTL ? "رقم العمارة، الدور، الشقة" : "Building No, Floor, Apt"}
                        </label>
                        <input
                          id="checkout-building"
                          type="text"
                          value={shippingData.buildingInfo}
                          onChange={e => updateShipping("buildingInfo", e.target.value)}
                          className={inputCls}
                          placeholder={isRTL ? "عمارة ١٥، الدور ٣، شقة ٦" : "Bldg 15, Floor 3, Apt 6"}
                        />
                      </div>

                      <div>
                        <label htmlFor="checkout-landmark" className={labelCls}>
                          {isRTL ? "علامة مميزة (اختياري)" : "Nearest Landmark (Optional)"}
                        </label>
                        <input
                          id="checkout-landmark"
                          type="text"
                          value={shippingData.landmark}
                          onChange={e => updateShipping("landmark", e.target.value)}
                          className={inputCls}
                          placeholder={isRTL ? "بجوار سوبر ماركت سعودي / أمام المسجد" : "Next to Seoudi Supermarket"}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleContinueToPayment}
                      size="lg"
                      fullWidth
                      className="mt-2 text-sm font-bold h-12"
                      rightIcon={<CreditCard size={17} />}
                    >
                      {isRTL ? "متابعة لاختيار طريقة الدفع" : "Continue to Payment"}
                    </Button>
                  </motion.div>
                )}

                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    className="bg-card rounded-3xl p-5 sm:p-6 space-y-5 border border-border shadow-soft"
                  >
                    <div className="flex items-center justify-between border-b border-border/50 pb-3">
                      <div className="flex items-center gap-2">
                        <CreditCard size={20} className="text-brand-terracotta" />
                        <h2 className="text-foreground font-display text-lg font-bold">
                          {isRTL ? "طرق الدفع المعتمدة" : "Select Payment Method"}
                        </h2>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                        <Shield size={12} /> {isRTL ? "دفع آمن ومعتمد" : "Secure Payment"}
                      </span>
                    </div>

                    {/* Egyptian Payment Methods Radio Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* 1. Cash on Delivery */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`flex items-start gap-3 p-3.5 rounded-2xl border text-start transition-all ${
                          paymentMethod === "cod"
                            ? "border-brand-terracotta bg-brand-peach/40 shadow-sm"
                            : "border-border hover:border-brand-sage bg-card"
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${paymentMethod === "cod" ? "bg-brand-terracotta text-white" : "bg-muted text-foreground"}`}>
                          <Banknote size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">
                            {isRTL ? "الدفع عند الاستلام (COD)" : "Cash on Delivery (COD)"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {isRTL ? "ادفع نقداً أو ببطاقتك للمندوب عند وصول الطلب" : "Pay with cash or card upon delivery"}
                          </p>
                        </div>
                      </button>

                      {/* 2. InstaPay & Mobile Wallets */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("instapay")}
                        className={`flex items-start gap-3 p-3.5 rounded-2xl border text-start transition-all ${
                          paymentMethod === "instapay"
                            ? "border-brand-terracotta bg-brand-peach/40 shadow-sm"
                            : "border-border hover:border-brand-sage bg-card"
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${paymentMethod === "instapay" ? "bg-brand-terracotta text-white" : "bg-muted text-foreground"}`}>
                          <Smartphone size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">
                            {isRTL ? "إنستاباي ومحافظ المحمول" : "InstaPay & Mobile Wallets"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {isRTL ? "فودافون كاش، أورنج كاش، InstaPay IPA" : "Vodafone Cash, Orange, InstaPay"}
                          </p>
                        </div>
                      </button>

                      {/* 3. Credit / Debit / Meeza Cards */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`flex items-start gap-3 p-3.5 rounded-2xl border text-start transition-all ${
                          paymentMethod === "card"
                            ? "border-brand-terracotta bg-brand-peach/40 shadow-sm"
                            : "border-border hover:border-brand-sage bg-card"
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${paymentMethod === "card" ? "bg-brand-terracotta text-white" : "bg-muted text-foreground"}`}>
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">
                            {isRTL ? "البطاقات البنكية وميزة" : "Bank Cards & Meeza"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {isRTL ? "فيزا، ماستركارد، بطاقة ميزة الوطنية" : "Visa, Mastercard, Egyptian Meeza"}
                          </p>
                        </div>
                      </button>

                      {/* 4. Fawry Pay */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("fawry")}
                        className={`flex items-start gap-3 p-3.5 rounded-2xl border text-start transition-all ${
                          paymentMethod === "fawry"
                            ? "border-brand-terracotta bg-brand-peach/40 shadow-sm"
                            : "border-border hover:border-brand-sage bg-card"
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${paymentMethod === "fawry" ? "bg-brand-terracotta text-white" : "bg-muted text-foreground"}`}>
                          <span className="font-bold text-xs">فوري</span>
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">
                            {isRTL ? "دفع فوري (Fawry Pay)" : "Fawry Pay Kiosk"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {isRTL ? "رمز دفع صالح في أي ماكينة فوري" : "Pay via any Fawry outlet/kiosk"}
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Method details */}
                    {paymentMethod === "instapay" && (
                      <div className="bg-brand-peach/60 dark:bg-zinc-800/80 p-4 rounded-2xl border border-brand-terracotta/20 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-terracotta">
                          <Smartphone size={16} />
                          <span>{isRTL ? "بيانات التحويل الفوري" : "InstaPay & Wallet Details"}</span>
                        </div>
                        <div className="bg-card p-3 rounded-xl border border-border text-xs space-y-1.5">
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">InstaPay Address (IPA):</span>
                            <span className="font-mono font-bold text-foreground">hajarafa@instapay</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Vodafone Cash Hotline:</span>
                            <span className="font-mono font-bold text-foreground">01123456789</span>
                          </p>
                        </div>
                        <div>
                          <label className={labelCls}>
                            {isRTL ? "رقم الهاتف أو اسم الحساب المحول منه *" : "Sender Phone or Account Handle *"}
                          </label>
                          <input
                            type="text"
                            value={paymentData.walletPhone}
                            onChange={e => updatePayment("walletPhone", e.target.value)}
                            placeholder="010XXXXXXXX / name@instapay"
                            className={inputCls}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="space-y-3.5 bg-brand-peach/30 p-4 rounded-2xl border border-border">
                        <div>
                          <label htmlFor="checkout-card-number" className={labelCls}>{t.cardNumber} *</label>
                          <input
                            id="checkout-card-number"
                            type="text"
                            value={paymentData.cardNumber}
                            onChange={e => updatePayment("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
                            className={inputCls}
                            placeholder="1234 5678 9012 3456"
                            autoComplete="cc-number"
                          />
                        </div>
                        <div>
                          <label htmlFor="checkout-card-name" className={labelCls}>
                            {isRTL ? "الاسم المطبوع على البطاقة *" : "Name on Card *"}
                          </label>
                          <input
                            id="checkout-card-name"
                            type="text"
                            value={paymentData.cardName}
                            onChange={e => updatePayment("cardName", e.target.value)}
                            className={inputCls}
                            placeholder="AHMED ARAFA"
                            autoComplete="cc-name"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="checkout-expiry" className={labelCls}>
                              {isRTL ? "تاريخ الانتهاء (MM/YY) *" : "Expiry Date (MM/YY) *"}
                            </label>
                            <input
                              id="checkout-expiry"
                              type="text"
                              value={paymentData.expiry}
                              onChange={e => updatePayment("expiry", e.target.value)}
                              className={inputCls}
                              placeholder="MM/YY"
                              maxLength={5}
                              autoComplete="cc-exp"
                            />
                          </div>
                          <div>
                            <label htmlFor="checkout-cvv" className={labelCls}>{t.cvv} *</label>
                            <input
                              id="checkout-cvv"
                              type="password"
                              value={paymentData.cvv}
                              onChange={e => updatePayment("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                              className={inputCls}
                              placeholder="123"
                              maxLength={4}
                              autoComplete="cc-csc"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 p-4 rounded-2xl flex items-start gap-3">
                        <Check size={18} className="text-emerald-700 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-foreground space-y-1">
                          <p className="font-bold text-emerald-800 dark:text-emerald-300">
                            {isRTL ? "جاهز للتسليم خلال 24-48 ساعة" : "Ready for dispatch within 24-48 hours"}
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            {isRTL
                              ? "سيصلك مندوبنا لتسليم الطلب عند باب المنزل ويمكنك الدفع نقداً أو ببطاقة ميزة البنكية."
                              : "Our courier will deliver to your doorstep. You can pay with cash or card upon receiving."}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Cloudflare Turnstile Verification Widget */}
                    <CloudflareTurnstile
                      onVerify={() => setIsBotVerified(true)}
                      isRTL={isRTL}
                    />

                    {/* Submit Order Buttons */}
                    <div className="space-y-2.5 pt-2">
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                        size="lg"
                        fullWidth
                        className="text-sm font-bold h-12"
                        leftIcon={<Check size={18} />}
                      >
                        {isPlacingOrder
                          ? (isRTL ? "جاري تأكيد الطلب..." : "Processing Order...")
                          : `${isRTL ? "تأكيد الطلب الآن" : "Confirm Order"} • ${t.currency} ${total.toFixed(2)}`}
                      </Button>

                      <button
                        type="button"
                        onClick={handleWhatsAppCheckout}
                        className="w-full flex items-center justify-center gap-2 border border-emerald-600/40 text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20 py-2.5 rounded-xl hover:bg-emerald-100/60 transition-colors text-xs font-bold"
                      >
                        <MessageCircle size={16} />
                        <span>{isRTL ? "أو أرسل هذا الطلب إلى واتساب مباشرة" : "Or send order directly via WhatsApp"}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="bg-card rounded-3xl p-5 border border-border sticky top-24 shadow-soft space-y-4">
                <h3 className="font-display font-bold text-base text-foreground border-b border-border/50 pb-2">
                  {t.orderSummary}
                </h3>

                {/* Items preview list */}
                <div className="space-y-2.5 max-h-60 overflow-y-auto pe-1">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-2.5 text-xs">
                      <div className="w-10 h-10 rounded-lg bg-background border border-border/40 p-1 flex-shrink-0 flex items-center justify-center">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground truncate">{isRTL && item.product.nameAr ? item.product.nameAr : item.product.name}</p>
                        <p className="text-muted-foreground">{item.quantity} × {t.currency} {item.product.price.toFixed(2)}</p>
                      </div>
                      <span className="font-bold text-brand-forest">
                        {t.currency} {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-border/60 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.subtotal}</span>
                    <span className="text-foreground font-semibold">{t.currency} {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.shipping}</span>
                    <span className="text-foreground font-semibold">
                      {shipping === 0 ? <span className="text-emerald-700 dark:text-emerald-400 font-bold">{t.free}</span> : `${t.currency} ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.tax} (14% VAT)</span>
                    <span className="text-foreground font-semibold">{t.currency} {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/60 pt-2.5 text-sm font-bold text-foreground">
                    <span>{t.total}</span>
                    <span className="text-brand-terracotta text-base">{t.currency} {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Estimation Badge */}
                <div className="bg-brand-peach/40 dark:bg-zinc-800/60 p-3 rounded-xl border border-brand-terracotta/10 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-brand-terracotta font-bold">
                    <Truck size={14} />
                    <span>{isRTL ? "مدة التوصيل التقديرية" : "Estimated Delivery"}</span>
                  </div>
                  <p className="text-muted-foreground">
                    {isRTL 
                      ? `${selectedGov.nameAr}: خلال ${selectedGov.deliveryHours} ساعة عمل`
                      : `${selectedGov.nameEn}: within ${selectedGov.deliveryHours} business hours`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
