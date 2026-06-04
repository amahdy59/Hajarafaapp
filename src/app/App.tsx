import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AppSettingsProvider } from "./context/AppSettingsContext";

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  /* MARKER-MAKE-KIT-DISCOVERY-READ */
  /* MARKER-MAKE-KIT-TOKENS-READ */
  return (
    <AppSettingsProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </AppSettingsProvider>
  );
}
