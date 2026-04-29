import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

const SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 49;

export function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const discount = couponApplied ? totalPrice * 0.1 : 0;
  const shipping = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = totalPrice - discount + shipping;
  const suggestedProducts = products.filter(p => !items.find(i => i.product.id === p.id)).slice(0, 4);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "NATURE10") {
      setCouponApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag size={22} className="text-[#C4622D]" />
          <h1 className="text-gray-900">Shopping Cart</h1>
          {totalItems > 0 && (
            <span className="bg-[#F4E7DA] text-[#C4622D] text-sm px-3 py-1 rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl">
            <ShoppingBag size={56} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Add some natural goodness to your cart!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#C4622D] text-white px-6 py-3 rounded-xl hover:bg-[#9A4A20] transition-colors"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3">
              {/* Free shipping progress */}
              {totalPrice < SHIPPING_THRESHOLD && (
                <div className="bg-[#F4E7DA] rounded-2xl p-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[#C4622D]">🚚 Add LE {(SHIPPING_THRESHOLD - totalPrice).toFixed(2)} more for free shipping</span>
                  </div>
                  <div className="bg-white/50 rounded-full h-2">
                    <div
                      className="bg-[#C4622D] h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((totalPrice / SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="bg-white rounded-2xl p-4 flex gap-4"
                  >
                    <Link to={`/products/${item.product.id}`} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#F4E7DA] flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 pr-2">
                          <Link to={`/products/${item.product.id}`}>
                            <h3 className="text-gray-900 text-sm line-clamp-2 hover:text-[#C4622D] transition-colors">{item.product.name}</h3>
                          </Link>
                          <p className="text-gray-400 text-xs mt-0.5">{item.product.weight} · {item.product.origin}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-200 rounded-xl">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-l-xl transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-r-xl transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-[#C4622D] text-sm">LE {(item.product.price * item.quantity).toFixed(2)}</p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-400">LE {item.product.price.toFixed(2)} each</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 space-y-4">
                <h2 className="text-gray-900">Order Summary</h2>

                {/* Coupon */}
                {!couponApplied ? (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#C4622D] transition-colors"
                      />
                    </div>
                    <button
                      onClick={applyCoupon}
                      className="bg-[#C4622D] text-white px-4 py-2.5 rounded-xl text-sm hover:bg-[#9A4A20] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 rounded-xl p-3 text-sm">
                    <span className="text-green-700">✓ NATURE10 applied — 10% off</span>
                    <button onClick={() => { setCouponApplied(false); setCouponCode(""); }} className="text-gray-400 hover:text-gray-600 text-xs">Remove</button>
                  </div>
                )}
                <p className="text-xs text-gray-400">Try: NATURE10 for 10% off</p>

                <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>LE {totalPrice.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-LE {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `LE ${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 border-t border-gray-100 pt-2">
                    <span>Total</span>
                    <span className="text-[#C4622D]">LE {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-[#C4622D] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#9A4A20] transition-colors"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
                  <span>🔒 Secure checkout</span>
                  <span>·</span>
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested products */}
        {suggestedProducts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-gray-900 mb-5">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {suggestedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
