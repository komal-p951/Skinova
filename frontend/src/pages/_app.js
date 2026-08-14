import { CheckoutProvider } from "@/context/CheckoutContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { scheduleTokenExpiry } from "@/utils/auth";

export default function App({ Component, pageProps }) {
  
  useEffect(() => {
    scheduleTokenExpiry();
  }, []);

  return ( 
  <CheckoutProvider>
    <Toaster />
    <Component {...pageProps} />
  </CheckoutProvider>
  );
}
