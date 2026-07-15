// import React from 'react'

// export default function Payment() {
//   return (
//     <div>
//       payment
//     </div>
//   )
// }
import React, { useState } from "react";
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
} from "lucide-react";

export default function Payment() {
  const [method, setMethod] = useState("card");
  const router = useRouter();
  return (
    <>
      {/* <span className={styles.moveLeft}><MoveLeft /></span> */}
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
                  method === "card" ? styles.active : ""
                }`}
                onClick={() => setMethod("card")}
              >
                <CreditCard />
                Credit / Debit Card
              </div>

              <div
                className={`${styles.method} ${
                  method === "upi" ? styles.active : ""
                }`}
                onClick={() => setMethod("upi")}
              >
                <Smartphone />
                UPI
              </div>

              <div
                className={`${styles.method} ${
                  method === "bank" ? styles.active : ""
                }`}
                onClick={() => setMethod("bank")}
              >
                <Landmark />
                Net Banking
              </div>

              <div
                className={`${styles.method} ${
                  method === "cod" ? styles.active : ""
                }`}
                onClick={() => setMethod("cod")}
              >
                <Truck />
                Cash On Delivery
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
              <span>₹1599</span>
            </div>

            <div className={styles.priceRow}>
              <span>Discount</span>
              <span>- ₹100</span>
            </div>

            <div className={styles.priceRow}>
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className={styles.total}>
              <span>Total</span>
              <span>₹1499</span>
            </div>

            <div className={styles.secure}>
              <ShieldCheck size={18} />
              100% Secure Payment
            </div>

            <button className={styles.payBtn}>
              <Lock size={18} />
              Pay ₹1499
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
