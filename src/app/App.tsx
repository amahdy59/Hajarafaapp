import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AppSettingsProvider } from "./context/AppSettingsContext";
import { LoyaltyProvider } from "./context/LoyaltyContext";

export default function App() {
  return (
    <AppSettingsProvider>
      <LoyaltyProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </LoyaltyProvider>
    </AppSettingsProvider>
  );
}
