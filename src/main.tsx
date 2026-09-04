
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((reg) => {
        console.debug("Haj Arafa ServiceWorker registered:", reg.scope);
      })
      .catch((err) => {
        console.debug("Haj Arafa ServiceWorker registration failed:", err);
      });
  });
}

  