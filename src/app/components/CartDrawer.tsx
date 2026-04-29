import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";

export function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#C4622D]" />
                <h2 className="text-gray-900">Your Cart</h2>
                {totalItems > 0 && (
                  <span className="bg-[#C4622D] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-gray-200 mb-4" />
                  <p className="text-gray-500 mb-1">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add some natural goodness!</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-6 bg-[#C4622D] text-white px-6 py-2.5 rounded-xl text-sm hover:bg-[#9A4A20] transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 bg-[#FBF7F1] rounded-2xl p-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 text-sm line-clamp-2 mb-0.5">{item.product.name}</p>
                        <p className="text-gray-400 text-xs mb-2">{item.product.weight}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#C4622D] text-sm">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#C4622D] transition-colors"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-sm w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#C4622D] transition-colors"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="self-start text-gray-300 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Free shipping on orders over LE 500</span>
                  {totalPrice < 500 && (
                    <span className="text-[#C4622D]">LE {(500 - totalPrice).toFixed(2)} away</span>
                  )}
                </div>
                {totalPrice < 500 && (
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[#C4622D] h-1.5 rounded-full transition-all"
                      style={{ width: `${Math.min((totalPrice / 500) * 100, 100)}%` }}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">LE {totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full bg-[#C4622D] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#9A4A20] transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
