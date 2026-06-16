import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { Root } from "./Root";

const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const Products = lazy(() => import("./pages/Products").then(m => ({ default: m.Products })));
const ProductDetail = lazy(() => import("./pages/ProductDetail").then(m => ({ default: m.ProductDetail })));
const Category = lazy(() => import("./pages/Category").then(m => ({ default: m.Category })));
const Cart = lazy(() => import("./pages/Cart").then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import("./pages/Checkout").then(m => ({ default: m.Checkout })));
const Account = lazy(() => import("./pages/Account").then(m => ({ default: m.Account })));
const Wishlist = lazy(() => import("./pages/Wishlist").then(m => ({ default: m.Wishlist })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Branches = lazy(() => import("./pages/Branches").then(m => ({ default: m.Branches })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const Help = lazy(() => import("./pages/Help").then(m => ({ default: m.Help })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "category/:slug", Component: Category },
      { path: "search", Component: Products },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "account", Component: Account },
      { path: "wishlist", Component: Wishlist },
      { path: "about", Component: About },
      { path: "branches", Component: Branches },
      { path: "contact", Component: Contact },
      { path: "help", Component: Help },
      { path: "*", Component: NotFound },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
