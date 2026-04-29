import { useState } from "react";
import { User, Package, Heart, Settings, ChevronRight, Bell, Shield, HelpCircle, LogOut, Star, MapPin, CreditCard, Gift, Award } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useWishlist } from "../context/WishlistContext";

const mockOrders = [
  { id: "HJR-823047", date: "Apr 15, 2025", status: "delivered", total: 67.98, items: 3, image: "https://images.unsplash.com/photo-1537035448858-6d703dbc320f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { id: "HJR-814523", date: "Mar 28, 2025", status: "shipped", total: 45.99, items: 2, image: "https://images.unsplash.com/photo-1761416351532-ede97c29fab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { id: "HJR-799102", date: "Mar 10, 2025", status: "delivered", total: 89.97, items: 4, image: "https://images.unsplash.com/photo-1602020381634-70afae19098c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
];

const statusColors: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
};

type Tab = "overview" | "orders" | "settings";

export function Account() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { items: wishlistItems } = useWishlist();

  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
  });

  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: true,
    newsletter: false,
  });

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile header */}
        <div className="bg-gradient-to-br from-[#C4622D] to-[#5C6F4A] rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
              👤
            </div>
            <div>
              <h2 className="text-white text-xl">{profile.firstName} {profile.lastName}</h2>
              <p className="text-white/70 text-sm">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-amber-400 text-amber-900 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award size={10} /> Gold Member
                </span>
                <span className="text-white/60 text-xs">3 orders this month</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3 mt-5">
            {[
              { label: "Orders", value: "12", icon: Package },
              { label: "Wishlist", value: wishlistItems.length.toString(), icon: Heart },
              { label: "Points", value: "240", icon: Star },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <stat.icon size={16} className="text-white/70 mx-auto mb-1" />
                <p className="text-white text-lg">{stat.value}</p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-2xl p-1.5 gap-1 mb-6 border border-gray-100">
          {(["overview", "orders", "settings"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm capitalize transition-all ${
                activeTab === tab
                  ? "bg-[#C4622D] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Quick actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Package, label: "My Orders", to: "#", color: "bg-blue-50 text-blue-600" },
                { icon: Heart, label: "Wishlist", to: "/wishlist", color: "bg-red-50 text-red-500" },
                { icon: MapPin, label: "Addresses", to: "#", color: "bg-amber-50 text-amber-600" },
                { icon: Gift, label: "Rewards", to: "#", color: "bg-purple-50 text-purple-600" },
              ].map(action => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow border border-gray-100 text-center"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                    <action.icon size={18} />
                  </div>
                  <span className="text-sm text-gray-700">{action.label}</span>
                </Link>
              ))}
            </div>

            {/* Recent orders */}
            <div className="bg-white rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Recent Orders</h3>
                <button onClick={() => setActiveTab("orders")} className="text-xs text-[#C4622D] hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                {mockOrders.slice(0, 2).map(order => (
                  <div key={order.id} className="flex items-center gap-3 bg-[#FBF7F1] rounded-xl p-3">
                    <img src={order.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-800">{order.id}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{order.date} · {order.items} items</p>
                    </div>
                    <span className="text-sm text-[#C4622D]">LE {order.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Loyalty points */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-5 border border-amber-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-amber-600 fill-amber-600" />
                  <h3 className="text-amber-900">Loyalty Points</h3>
                </div>
                <span className="text-2xl text-amber-700">240 pts</span>
              </div>
              <div className="bg-white/60 rounded-full h-2 mb-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "48%" }} />
              </div>
              <p className="text-xs text-amber-700">260 more points until Gold+ status</p>
            </div>
          </motion.div>
        )}

        {/* Orders tab */}
        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h2 className="text-gray-900 mb-4">My Orders</h2>
            {mockOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-gray-800">{order.id}</p>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{order.date} · {order.items} items</p>
                  </div>
                  <span className="text-[#C4622D]">LE {order.total.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={order.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-full h-1.5 mb-1">
                      <div
                        className={`h-1.5 rounded-full ${order.status === "delivered" ? "bg-green-500 w-full" : "bg-blue-500 w-2/3"}`}
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      {order.status === "delivered" ? "Delivered successfully" : "On the way · Est. 2-3 days"}
                    </p>
                  </div>
                  <button className="text-xs text-[#C4622D] hover:underline">Details</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Settings tab */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Profile settings */}
            <div className="bg-white rounded-2xl p-5">
              <h3 className="text-gray-900 mb-4">Profile Information</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#C4622D] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#C4622D] transition-colors"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1.5">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#C4622D] transition-colors"
                />
              </div>
              <button className="bg-[#C4622D] text-white px-6 py-2.5 rounded-xl text-sm hover:bg-[#9A4A20] transition-colors">
                Save Changes
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl p-5">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2"><Bell size={18} /> Notifications</h3>
              <div className="space-y-3">
                {Object.entries(notifications).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 capitalize">{key === "newsletter" ? "Newsletter" : key === "orders" ? "Order updates" : "Promotions & deals"}</span>
                    <div
                      className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${val ? "bg-[#C4622D]" : "bg-gray-200"}`}
                      onClick={() => setNotifications(n => ({ ...n, [key]: !val }))}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${val ? "translate-x-5" : "translate-x-1"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account actions */}
            <div className="bg-white rounded-2xl overflow-hidden">
              {[
                { icon: CreditCard, label: "Payment Methods", color: "text-gray-600" },
                { icon: MapPin, label: "Saved Addresses", color: "text-gray-600" },
                { icon: Shield, label: "Privacy & Security", color: "text-gray-600" },
                { icon: HelpCircle, label: "Help & Support", color: "text-gray-600" },
                { icon: LogOut, label: "Sign Out", color: "text-red-500" },
              ].map((item, i) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors ${i > 0 ? "border-t border-gray-100" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={item.color} />
                    <span className={`text-sm ${item.color}`}>{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
