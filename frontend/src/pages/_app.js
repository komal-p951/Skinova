import { CheckoutProvider } from "@/context/CheckoutContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return ( 
  <CheckoutProvider>
    <Toaster />
    <Component {...pageProps} />
  </CheckoutProvider>
  );
}
