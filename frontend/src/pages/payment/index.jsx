import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import {
  CreditCard,
  Smartphone,
  Landmark,
  Truck,
  ShieldCheck,
  Lock,
  MoveLeft,
  CircleQuestionMark,
} from "lucide-react";
import { clientServer } from "@/index";
import { useCheckout } from "@/context/CheckoutContext";

export default function Payment() {
  const [method, setMethod] = useState("cod");
  const router = useRouter();
    const [token, setToken] = useState("");
    const [cartProducts, setCartProducts] = useState([]);
    const { checkoutData } = useCheckout();

    
    // Load token once on mount
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        router.push("/login");
      }
    }, []);
    
    const fetchdata = async () => {
      try {
        // const res = await clientServer.get("/user", {
        //   headers: { Authorization: token },
        // });
        const userCartProducts = await clientServer.get("/cart", {
          headers: { Authorization: token },
        });
        // setUser(res.data);
        setCartProducts(userCartProducts.data);
        // setLoading(false);
      } catch (error) {
        console.log(error?.response?.data?.message || error.message);
      }
    };
  
   
    useEffect(() => {
      if (token) {
        fetchdata();
      }
    }, [token]);
    if(!checkoutData)return <h2>No Checkout data</h2>

    const handleOrderPlace = async () => {
      try {
        const res = await clientServer.post("/order/neworder",{},{
          headers:{
            Authorization: token
          }
        });
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.paymentCard}>
          <div className={styles.left}>
            <div style={{display:'flex',alignItems:'center',gap:'0.7rem'}} onClick={() => router.back("/checkout")}>
              <MoveLeft />
              &nbsp;
              <div>
                <p>step 3 of 3</p>
                <h1 className={styles.title}>Payment</h1>
              </div>
            </div>

            <p className={styles.subtitle}>
              Select your preferred payment method.
            </p>

            <div className={styles.methods}>
              <div
                className={`${styles.method} ${
                  method === "cod" ? styles.active : ""
                }`}
                onClick={() => setMethod("cod")}
              >
                <span><Truck />Cash On Delivery</span>
              </div>

              <div style={{opacity:'0.5',cursor:"no-drop"}}
                className={`${styles.method} ${
                  method === "card" ? styles.active : ""
                }`}
                // onClick={() => setMethod("card")}
              >
                <span><CreditCard />Credit / Debit Card</span>
                <span>unavailable<CircleQuestionMark /></span>
              </div>

              <div style={{opacity:'0.5',cursor:"no-drop"}}
                className={`${styles.method} ${
                  method === "upi" ? styles.active : ""
                }`}
                // onClick={() => setMethod("upi")}
              >
                <span><Smartphone />UPI</span>
                <span>unavailable<CircleQuestionMark /></span>
              </div>

              <div style={{opacity:'0.5',cursor:"no-drop"}}
                className={`${styles.method} ${
                  method === "bank" ? styles.active : ""
                }`}
                // onClick={() => setMethod("bank")}
              >
                <span><Landmark />Net Banking</span>
                <span>unavailable<CircleQuestionMark /></span>
              </div>

              
            </div>

            {method === "card" && (
              <div className={styles.form}>
                <input placeholder="Card Holder Name" />

                <input placeholder="Card Number" />

                <div className={styles.row}>
                  <input placeholder="MM/YY" />

                  <input placeholder="CVV" />
                </div>
              </div>
            )}

            {method === "upi" && (
              <div className={styles.form}>
                <input placeholder="Enter UPI ID" />
              </div>
            )}

            {method === "bank" && (
              <div className={styles.form}>
                <select>
                  <option>Select Bank</option>

                  <option>State Bank of India</option>

                  <option>HDFC Bank</option>

                  <option>ICICI Bank</option>

                  <option>Axis Bank</option>
                </select>
              </div>
            )}

            {method === "cod" && (
              <div className={styles.cod}>
                Cash on Delivery available for this address.
              </div>
            )}
          </div>

          <div className={styles.right}>
            <h2>Order Summary</h2>

            <div className={styles.priceRow}>
              <span>Subtotal</span>
              <span>₹ {checkoutData.subtotal}</span>
            </div>

            <div className={styles.priceRow}>
              <span>Discount</span>
              <span className={styles.discount}>₹{ checkoutData.discount.toFixed(2)}</span>
            </div>

            <div className={styles.priceRow}>
              <span>Delivery</span>
              <span className={checkoutData.shipping === 0 ? styles.free : ""}>{checkoutData.shipping}</span>
            </div>

            <hr />

            <div className={styles.total}>
              <span>Total</span>
              <span>₹ {checkoutData.total}</span>
            </div>

            <div className={styles.secure}>
              <ShieldCheck size={18} />
              100% Secure Payment
            </div>

            <button className={styles.payBtn} onClick={handleOrderPlace}>Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
}
