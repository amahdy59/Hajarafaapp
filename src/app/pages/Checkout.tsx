import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, Check, CreditCard, Truck, MapPin, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

type Step = "shipping" | "payment" | "confirmation";

export function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("shipping");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const shipping = totalPrice >= 500 ? 0 : 49;
  const tax = totalPrice * 0.14;
  const total = totalPrice + shipping + tax;

  const [shippingData, setShippingData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "US",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const updateShipping = (field: string, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
  };

  const updatePayment = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    await new Promise(r => setTimeout(r, 1500));
    clearCart();
    setStep("confirmation");
    setIsPlacingOrder(false);
    toast.success("Order placed successfully! 🎉");
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🛒</p>
          <h2 className="text-gray-800 mb-4">Your cart is empty</h2>
          <Link to="/products" className="bg-[#C4622D] text-white px-6 py-3 rounded-xl hover:bg-[#9A4A20] transition-colors text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { id: "shipping", label: "Shipping", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "confirmation", label: "Confirm", icon: Check },
  ];

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-[#C4622D] focus:ring-2 focus:ring-[#C4622D]/20 transition-all bg-white";
  const labelClass = "block text-xs text-gray-500 mb-1.5";

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => {
            const currentIndex = steps.findIndex(x => x.id === step);
            const isDone = i < currentIndex;
            const isCurrent = s.id === step;
            return (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isCurrent ? "bg-[#C4622D] text-white" :
                  isDone ? "bg-green-50 text-green-600" :
                  "text-gray-400"
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isCurrent ? "bg-white/20" :
                    isDone ? "bg-green-100" : "bg-gray-100"
                  }`}>
                    {isDone ? <Check size={12} /> : i + 1}
                  </div>
                  <span className="text-sm hidden sm:block">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${isDone || isCurrent ? "bg-[#C4622D]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        {step === "confirmation" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center bg-white rounded-3xl p-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={36} className="text-green-600" />
            </div>
            <h2 className="text-gray-900 text-2xl mb-2">Order Confirmed!</h2>
            <p className="text-gray-500 text-sm mb-2">Thank you for your order. We've sent a confirmation email to your inbox.</p>
            <div className="bg-[#F4E7DA] rounded-2xl p-4 my-6 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order number</span>
                <span className="text-gray-800">#HJR-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estimated delivery</span>
                <span className="text-gray-800">5-7 business days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total paid</span>
                <span className="text-[#C4622D]">LE {total.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Link to="/products" className="w-full block bg-[#C4622D] text-white py-3 rounded-xl hover:bg-[#9A4A20] transition-colors text-sm">
                Continue Shopping
              </Link>
              <Link to="/account" className="w-full block border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                Track My Order
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl p-6 space-y-5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Truck size={18} className="text-[#C4622D]" />
                      <h2 className="text-gray-900">Shipping Information</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>First Name *</label>
                        <input type="text" value={shippingData.firstName} onChange={e => updateShipping("firstName", e.target.value)} className={inputClass} placeholder="John" />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name *</label>
                        <input type="text" value={shippingData.lastName} onChange={e => updateShipping("lastName", e.target.value)} className={inputClass} placeholder="Doe" />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input type="email" value={shippingData.email} onChange={e => updateShipping("email", e.target.value)} className={inputClass} placeholder="john@example.com" />
                    </div>

                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="tel" value={shippingData.phone} onChange={e => updateShipping("phone", e.target.value)} className={inputClass} placeholder="+1 (555) 000-0000" />
                    </div>

                    <div>
                      <label className={labelClass}>Street Address *</label>
                      <input type="text" value={shippingData.address} onChange={e => updateShipping("address", e.target.value)} className={inputClass} placeholder="123 Main Street, Apt 4B" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>City *</label>
                        <input type="text" value={shippingData.city} onChange={e => updateShipping("city", e.target.value)} className={inputClass} placeholder="New York" />
                      </div>
                      <div>
                        <label className={labelClass}>State / Province</label>
                        <input type="text" value={shippingData.state} onChange={e => updateShipping("state", e.target.value)} className={inputClass} placeholder="NY" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>ZIP / Postal Code *</label>
                        <input type="text" value={shippingData.zip} onChange={e => updateShipping("zip", e.target.value)} className={inputClass} placeholder="10001" />
                      </div>
                      <div>
                        <label className={labelClass}>Country</label>
                        <select value={shippingData.country} onChange={e => updateShipping("country", e.target.value)} className={inputClass}>
                          <option value="US">United States</option>
                          <option value="GB">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="AE">UAE</option>
                          <option value="SA">Saudi Arabia</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep("payment")}
                      className="w-full bg-[#C4622D] text-white py-3.5 rounded-xl hover:bg-[#9A4A20] transition-colors flex items-center justify-center gap-2"
                    >
                      Continue to Payment <CreditCard size={16} />
                    </button>
                  </motion.div>
                )}

                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl p-6 space-y-5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard size={18} className="text-[#C4622D]" />
                      <h2 className="text-gray-900">Payment Details</h2>
                    </div>

                    <div className="bg-[#F4E7DA] rounded-xl p-3 flex items-center gap-2 text-sm text-[#C4622D]">
                      <Shield size={15} />
                      Your payment information is encrypted and secure
                    </div>

                    <div>
                      <label className={labelClass}>Card Number *</label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={e => updatePayment("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
                        className={inputClass}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Cardholder Name *</label>
                      <input type="text" value={paymentData.cardName} onChange={e => updatePayment("cardName", e.target.value)} className={inputClass} placeholder="John Doe" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Expiry Date *</label>
                        <input
                          type="text"
                          value={paymentData.expiry}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                            updatePayment("expiry", val.length > 2 ? val.slice(0, 2) + "/" + val.slice(2) : val);
                          }}
                          className={inputClass}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>CVV *</label>
                        <input type="text" value={paymentData.cvv} onChange={e => updatePayment("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))} className={inputClass} placeholder="123" maxLength={4} />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep("shipping")}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 border border-gray-200 px-4 py-3 rounded-xl text-sm transition-colors"
                      >
                        <ChevronLeft size={16} /> Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                        className="flex-1 bg-[#C4622D] text-white py-3 rounded-xl hover:bg-[#9A4A20] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {isPlacingOrder ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>Place Order · LE {total.toFixed(2)}</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order summary sidebar */}
            <div className="bg-white rounded-3xl p-5 h-fit space-y-4">
              <h3 className="text-gray-900">Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#F4E7DA] flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C4622D] text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-400">{item.product.weight}</p>
                    </div>
                    <span className="text-sm text-gray-800">LE {(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>LE {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `LE ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>LE {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-900 border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span className="text-[#C4622D]">LE {total.toFixed(2)}</span>
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
