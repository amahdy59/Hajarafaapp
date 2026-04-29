import { useState, useEffect } from "react";
import { ArrowRight, Shield, Truck, Leaf, Award, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { products, getBestSellers, getNewProducts, getDiscountedProducts, getProductsByCategory } from "../data/products";
import { categories, departments } from "../data/categories";
import { ProductCard } from "../components/ProductCard";

const heroSlides = [
  {
    id: 1,
    title: "Nature, Bottled.\nDelivered to your door.",
    subtitle: "Coffee, spices, nuts, honey, cosmetics & more — sourced and packed with care.",
    cta: "Shop the collection",
    ctaLink: "/products",
    image: "https://images.unsplash.com/photo-1770782773560-2b8180f9032d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    accent: "#C4622D",
    badge: "Curated for you",
  },
  {
    id: 2,
    title: "Arabic Coffee,\nlike grandmother made it.",
    subtitle: "Hand-blended with cardamom and saffron, freshly ground in small batches.",
    cta: "Shop coffee",
    ctaLink: "/category/coffee-drinks",
    image: "https://images.unsplash.com/photo-1559525839-d9acfd03e0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    accent: "#4A2C1A",
    badge: "Best seller",
  },
  {
    id: 3,
    title: "Yemeni Sidr Honey,\na rare harvest.",
    subtitle: "From pristine mountain valleys — bold, golden, and naturally raw.",
    cta: "Discover honey",
    ctaLink: "/category/honey",
    image: "https://images.unsplash.com/photo-1761416351532-ede97c29fab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    accent: "#B8860B",
    badge: "Limited stock",
  },
];

const trustBadges = [
  { icon: Shield, text: "Lab Tested", sub: "Quality guaranteed" },
  { icon: Leaf, text: "100% Natural", sub: "No additives" },
  { icon: Truck, text: "Free Shipping", sub: "Orders over LE 500" },
  { icon: Award, text: "Premium Quality", sub: "Ethically sourced" },
];

export function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"bestsellers" | "new" | "deals">("bestsellers");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const tabProducts = {
    bestsellers: getBestSellers(),
    new: getNewProducts(),
    deals: getDiscountedProducts(),
  };

  const currentProducts = tabProducts[activeTab];

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      {/* Hero Carousel */}
      <section className="relative h-[60vh] min-h-[380px] max-h-[560px] sm:h-[520px] overflow-hidden sm:rounded-none rounded-b-[28px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[activeSlide].image}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-lg"
                >
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full mb-4">
                    <Sparkles size={12} />
                    {heroSlides[activeSlide].badge}
                  </span>
                  <h1 className="text-white text-3xl sm:text-5xl leading-tight mb-4 whitespace-pre-line">
                    {heroSlides[activeSlide].title}
                  </h1>
                  <p className="text-white/80 text-sm sm:text-base mb-6 max-w-sm">
                    {heroSlides[activeSlide].subtitle}
                  </p>
                  <Link
                    to={heroSlides[activeSlide].ctaLink}
                    className="inline-flex items-center gap-2 bg-white text-[#C4622D] px-6 py-3 rounded-xl text-sm hover:bg-[#F4E7DA] transition-colors"
                  >
                    {heroSlides[activeSlide].cta}
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`transition-all duration-300 rounded-full ${i === activeSlide ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"}`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setActiveSlide(prev => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustBadges.map(badge => (
              <div key={badge.text} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#F4E7DA] rounded-xl flex items-center justify-center flex-shrink-0">
                  <badge.icon size={18} className="text-[#C4622D]" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{badge.text}</p>
                  <p className="text-xs text-gray-400">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-900">Shop by Category</h2>
            <Link to="/products" className="text-sm text-[#C4622D] flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 hover:border-[#C4622D]/30 hover:shadow-md transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: cat.bgColor }}
                  >
                    {cat.icon}
                  </div>
                  <span className="text-xs text-center text-gray-700 leading-tight">{cat.name}</span>
                  <span className="text-xs text-gray-400">{cat.count}+</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Deal banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C4622D] to-[#5C6F4A] p-6 sm:p-8">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute right-16 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs px-3 py-1 rounded-full mb-3">
                🔥 Limited Time Offer
              </span>
              <h2 className="text-white text-2xl sm:text-3xl mb-2">Up to 30% Off</h2>
              <p className="text-white/80 text-sm max-w-xs">On our best-selling herbal oils, teas, and superfoods. Shop while stocks last.</p>
            </div>
            <Link
              to="/products?filter=deals"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#C4622D] px-6 py-3 rounded-xl text-sm hover:bg-[#F4E7DA] transition-colors"
            >
              Grab Deals <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Featured products with tabs */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <h2 className="text-gray-900">Featured Products</h2>
            <div className="flex bg-white border border-gray-100 rounded-xl p-1 gap-1">
              {(["bestsellers", "new", "deals"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${
                    activeTab === tab
                      ? "bg-[#C4622D] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "bestsellers" ? "Best Sellers" : tab === "new" ? "New Arrivals" : "On Sale"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-[#C4622D] text-[#C4622D] px-8 py-3 rounded-xl text-sm hover:bg-[#C4622D] hover:text-white transition-all"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Foods vs Non-Food department split */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-900">Browse departments</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {departments.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={d.children.length === 1 ? `/category/${d.children[0]}` : `/products?dept=${d.slug}`}
                  className="group block bg-white rounded-3xl overflow-hidden border border-[#ECE6DC] hover:border-[#C4622D]/40 hover:shadow-lg transition-all"
                >
                  <div className="aspect-[5/4] bg-[#F4E7DA] overflow-hidden">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs uppercase tracking-wide text-[#C4622D]">
                      {d.group === "foods" ? "Foods" : "Non-Food"}
                    </p>
                    <p className="text-gray-900 mt-0.5">{d.icon} {d.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{d.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HajArafa themed rails */}
        {[
          { slug: "coffee-drinks", title: "For Coffee Lovers", icon: "☕", accent: "#4A2C1A" },
          { slug: "nuts", title: "Shop Nuts", icon: "🌰", accent: "#7B5E3A" },
          { slug: "cosmetics", title: "All Natural Cosmetics", icon: "✨", accent: "#8B5C7A" },
          { slug: "yamish-dates", title: "Yamish & Dates", icon: "🌴", accent: "#9A4A20" },
          { slug: "incense", title: "Traditional Incense", icon: "🪔", accent: "#7B5E3A" },
          { slug: "snacks", title: "Snacks on the Go", icon: "🍿", accent: "#C4622D" },
        ].map(rail => {
          const items = getProductsByCategory(rail.slug).slice(0, 8);
          if (!items.length) return null;
          return (
            <section key={rail.slug} className="bg-white rounded-3xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{rail.icon}</span>
                  <h2 className="text-gray-900">{rail.title}</h2>
                </div>
                <Link
                  to={`/category/${rail.slug}`}
                  className="text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: rail.accent }}
                >
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto sm:overflow-visible scrollbar-hide -mx-1 px-1">
                {items.map(p => (
                  <div key={p.id} className="flex-shrink-0 w-44 sm:w-auto">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Category feature cards */}
        <section>
          <h2 className="text-gray-900 mb-5">Explore Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(0, 3).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-2xl mb-2 block">{cat.icon}</span>
                    <h3 className="text-white text-lg">{cat.name}</h3>
                    <p className="text-white/70 text-sm">{cat.count}+ products</p>
                    <span className="inline-flex items-center gap-1 text-white/90 text-xs mt-2 group-hover:gap-2 transition-all">
                      Shop now <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reviews section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-gray-900 mb-2">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm">4.9 from 2,400+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Sarah M.", review: "The black seed oil is incredible. I've been using it for a month and my immunity has noticeably improved. The quality is outstanding!", rating: 5, product: "Black Seed Oil" },
              { name: "Ahmed K.", review: "Authentic Sidr honey exactly as described. You can taste the difference compared to supermarket honey. Worth every penny!", rating: 5, product: "Sidr Honey" },
              { name: "Emma L.", review: "The rose water is divine. My skin has never felt more hydrated. I use it morning and night as a toner.", rating: 5, product: "Bulgarian Rose Water" },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#FBF7F1] rounded-2xl p-4"
              >
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-3 italic">"{review.review}"</p>
                <div>
                  <p className="text-gray-900 text-sm">{review.name}</p>
                  <p className="text-gray-400 text-xs">Verified · {review.product}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="relative overflow-hidden rounded-3xl bg-[#1B1B1B] p-8 sm:p-10 text-center">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #C4622D 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <span className="text-4xl mb-4 block">🌿</span>
            <h2 className="text-white text-2xl mb-2">Join the Natural Living Movement</h2>
            <p className="text-white/60 text-sm mb-6 max-w-sm mx-auto">
              Subscribe for exclusive offers, wellness tips, and early access to new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 text-sm outline-none focus:border-white/40 transition-colors"
              />
              <button className="bg-[#C4622D] text-white px-6 py-3 rounded-xl text-sm hover:bg-[#5C6F4A] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-white/40 text-xs mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </section>
      </div>

      {/* Bottom padding for mobile nav */}
      <div className="h-20 sm:h-4" />
    </div>
  );
}
