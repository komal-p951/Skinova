// import React from 'react'

// export default function Myorder() {
//   return (
//     <div>
//       myorders
//     </div>
//   )
// }
import React from "react";
import styles from "./styles.module.css";
import {
  Package,
  Truck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Myorder() {
  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h1>My Orders</h1>
        <p>Track and manage your Skinova orders.</p>
      </div>

      {/* Order Card */}

      <div className={styles.orderCard}>

        <div className={styles.imageSection}>
          <img
            src="/images/skincare6.jpg"
            alt="product"
            className={styles.productImage}
          />
        </div>

        <div className={styles.details}>

          <div className={styles.topRow}>
            <h2>Skinova Vitamin C Serum</h2>

            <span className={styles.statusDelivered}>
              <CheckCircle2 size={16} />
              Delivered
            </span>
          </div>

          <p className={styles.orderId}>
            Order ID : SKN24576812
          </p>

          <p className={styles.price}>
            ₹799
          </p>

          <div className={styles.infoRow}>

            <div>
              <Package size={18}/>
              <span>Ordered</span>
              <small>10 July 2026</small>
            </div>

            <ArrowRight/>

            <div>
              <Truck size={18}/>
              <span>Shipped</span>
              <small>11 July 2026</small>
            </div>

            <ArrowRight/>

            <div>
              <CheckCircle2 size={18}/>
              <span>Delivered</span>
              <small>13 July 2026</small>
            </div>

          </div>

          <div className={styles.buttons}>

            <button className={styles.trackBtn}>
              Track Order
            </button>

            <button className={styles.reviewBtn}>
              Write Review
            </button>

            <button className={styles.buyBtn}>
              Buy Again
            </button>

          </div>

        </div>

      </div>

      {/* Second Card */}

      <div className={styles.orderCard}>

        <div className={styles.imageSection}>
          <img
            src="/images/skincare2.jpg"
            alt="product"
            className={styles.productImage}
          />
        </div>

        <div className={styles.details}>

          <div className={styles.topRow}>
            <h2>Skinova Matte Foundation</h2>

            <span className={styles.statusShipped}>
              <Truck size={16}/>
              Shipped
            </span>
          </div>

          <p className={styles.orderId}>
            Order ID : SKN24576813
          </p>

          <p className={styles.price}>
            ₹1199
          </p>

          <div className={styles.buttons}>

            <button className={styles.trackBtn}>
              Track Order
            </button>

            <button className={styles.cancelBtn}>
              Cancel Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}