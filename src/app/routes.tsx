import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Category } from "./pages/Category";
import { Search } from "./pages/Search";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Account } from "./pages/Account";
import { Wishlist } from "./pages/Wishlist";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "category/:slug", Component: Category },
      { path: "search", Component: Search },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "account", Component: Account },
      { path: "wishlist", Component: Wishlist },
      { path: "*", Component: NotFound },
    ],
  },
]);
