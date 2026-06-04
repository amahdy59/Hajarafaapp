import { Navigate } from "react-router";

export function Wishlist() {
  return <Navigate to="/account?tab=wishlist" replace />;
}
