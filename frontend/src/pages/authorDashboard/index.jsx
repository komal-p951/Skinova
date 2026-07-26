import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import {
  ShoppingBag,
  IndianRupee,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState({
  SKN1024: "Placed",
  SKN1025: "Pending",
  SKN1026: "Delivered",
  SKN1027: "Processing",
});

  const handleStatusChange = (orderId, value) => {
  setOrderStatus((prev) => ({
    ...prev,
    [orderId]: value,
  }));
};


  return (
    <div className={styles.container}>
      {/* ================= HEADER ================= */}

      <div className={styles.header}>

        <div>
          <h1 className={styles.title}>
            Welcome Back 👋
          </h1>

          <p className={styles.subtitle}>
            Here's what's happening with your Skinova Store today.
          </p>
        </div>

        <div style={{display:'flex',gap:'1rem'}}>
          <button className={styles.exportBtn}>
          Export Report
        </button>
        {/* <button className={styles.exportBtn} onClick={() => router.push("/authorDashboard/orders")}>
          Orders
        </button> */}
        </div>

      </div>

      {/* ================= STATS ================= */}

      <div className={styles.statsGrid}>

        {/* Orders */}

        <div className={styles.card}>

          <div className={styles.iconBox}>
            <ShoppingBag size={28} />
          </div>

          <div>
            <p className={styles.cardTitle}>
              Total Orders
            </p>

            <h2>1,254</h2>

            <span className={styles.green}>
              <TrendingUp size={15} />
              +12%
            </span>

          </div>

        </div>

        {/* Revenue */}

        <div className={styles.card}>

          <div className={styles.iconBoxPink}>
            <IndianRupee size={28} />
          </div>

          <div>

            <p className={styles.cardTitle}>
              Revenue
            </p>

            <h2>₹2,84,500</h2>

            <span className={styles.green}>
              <TrendingUp size={15} />
              +8%
            </span>

          </div>

        </div>

        {/* Customers */}

        <div className={styles.card}>

          <div className={styles.iconBoxPurple}>
            <Users size={28} />
          </div>

          <div>

            <p className={styles.cardTitle}>
              Customers
            </p>

            <h2>846</h2>

            <span className={styles.green}>
              <TrendingUp size={15} />
              +15%
            </span>

          </div>

        </div>

        {/* Products */}

        <div className={styles.card}>

          <div className={styles.iconBoxOrange}>
            <Package size={28} />
          </div>

          <div>

            <p className={styles.cardTitle}>
              Products
            </p>

            <h2>82</h2>

            <span className={styles.red}>
              <TrendingDown size={15} />
              -2%
            </span>

          </div>

        </div>

      </div>

      {/* ================= CHART + SUMMARY ================= */}

      <div className={styles.chartGrid}>

        {/* Revenue Chart */}

        <div className={styles.chartCard}>

          <div className={styles.cardHeader}>

            <h2>Revenue Overview</h2>

            <select className={styles.select}>

              <option>Last 7 Days</option>

              <option>Last Month</option>

              <option>This Year</option>

            </select>

          </div>

          <div className={styles.chartPlaceholder}>

            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
            <div className={styles.bar3}></div>
            <div className={styles.bar4}></div>
            <div className={styles.bar5}></div>
            <div className={styles.bar6}></div>
            <div className={styles.bar7}></div>

          </div>

        </div>

        {/* Revenue Summary */}

        <div className={styles.summaryCard}>

          <h2>Revenue Summary</h2>

          <div className={styles.summaryItem}>

            <span>Total Revenue</span>

            <strong>₹2,84,500</strong>

          </div>

          <div className={styles.summaryItem}>

            <span>Today's Sales</span>

            <strong>₹12,420</strong>

          </div>

          <div className={styles.summaryItem}>

            <span>Total Orders</span>

            <strong>1,254</strong>

          </div>

          <div className={styles.summaryItem}>

            <span>Cancelled</span>

            <strong>12</strong>

          </div>

          <div className={styles.summaryItem}>

            <span>Pending</span>

            <strong>31</strong>

          </div>

          <div className={styles.summaryItem}>

            <span>Delivered</span>

            <strong>1,211</strong>

          </div>

          <div className={styles.progressSection}>

            <p>Monthly Target</p>

            <div className={styles.progress}>

              <div className={styles.progressFill}></div>

            </div>

            <small>82% Completed</small>

          </div>

        </div>

      </div>

      {/* Part 2 me niche Recent Orders aur Top Selling Products aayenge */}

      {/* ================= RECENT ORDERS ================= */}

      <div className={styles.bottomGrid}>

        <div className={styles.orderCard}>

          <div className={styles.cardHeader}>
            <h2>Recent Orders</h2>
            <button className={styles.viewBtn}>
              View All
            </button>
          </div>

          <table className={styles.orderTable}>

            <thead>

              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              <tr>

                <td>#SKN1024</td>

                <td>Priya Sharma</td>

                <td>₹1,250</td>

                <td>

                  <span
                    className={`${styles.statusBadge} ${
                      orderStatus["SKN1024"] === "Placed"
                        ? styles.placed
                        : orderStatus["SKN1024"] === "Confirmed"
                        ? styles.confirmed
                        : orderStatus["SKN1024"] === "Packed"
                        ? styles.packed
                        : orderStatus["SKN1024"] === "Shipped"
                        ? styles.shipped
                        : orderStatus["SKN1024"] === "Out for Delivery"
                        ? styles.outForDelivery
                        : orderStatus["SKN1024"] === "Delivered"
                        ? styles.delivered
                        : styles.cancelled
                    }`}
                  >
                    {orderStatus["SKN1024"]}
                  </span>

                  <br />
                  <br />

                  <select
                    className={styles.statusSelect}
                    value={orderStatus["SKN1024"]}
                    onChange={(e) =>
                      handleStatusChange("SKN1024", e.target.value)
                    }
                  >
                    <option value="Placed">Placed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                </td>

              </tr>

              <tr>

                <td>#SKN1025</td>

                <td>Rahul Verma</td>

                <td>₹899</td>

                <td>
                  <span className={styles.pending}>
                    Pending
                  </span>
                </td>

              </tr>

              <tr>

                <td>#SKN1026</td>

                <td>Simran Kaur</td>

                <td>₹2,499</td>

                <td>
                  <span className={styles.completed}>
                    Delivered
                  </span>
                </td>

              </tr>

              <tr>

                <td>#SKN1027</td>

                <td>Aman Singh</td>

                <td>₹599</td>

                <td>
                  <span className={styles.processing}>
                    Processing
                  </span>
                </td>

              </tr>

              <tr>

                <td>#SKN1028</td>

                <td>Neha Patel</td>

                <td>₹1,799</td>

                <td>
                  <span className={styles.cancelled}>
                    Cancelled
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* ================= TOP PRODUCTS ================= */}

        <div className={styles.productCard}>

          <div className={styles.cardHeader}>

            <h2>Top Selling Products</h2>

          </div>

          <div className={styles.productItem}>

            <img
              src="/images/skincare1.jpg"
              alt=""
            />

            <div>

              <h4>Vitamin C Serum</h4>

              <p>420 Sold</p>

            </div>

            <span className={styles.price}>
              ₹597
            </span>

          </div>

          <div className={styles.productItem}>

            <img
              src="/images/skincare2.jpg"
              alt=""
            />

            <div>

              <h4>Hydra Moisturizer</h4>

              <p>392 Sold</p>

            </div>

            <span className={styles.price}>
              ₹325
            </span>

          </div>

          <div className={styles.productItem}>

            <img
              src="/images/skincare3.jpg"
              alt=""
            />

            <div>

              <h4>SPF 50 Sunscreen</h4>

              <p>351 Sold</p>

            </div>

            <span className={styles.price}>
              ₹529
            </span>

          </div>

          <div className={styles.productItem}>

            <img
              src="/images/skincare4.jpg"
              alt=""
            />

            <div>

              <h4>Rosemary Hair Oil</h4>

              <p>280 Sold</p>

            </div>

            <span className={styles.price}>
              ₹449
            </span>

          </div>

        </div>

      </div>

      {/* ================= LOW STOCK + REVIEWS ================= */}

      <div className={styles.lastGrid}>

        {/* Low Stock */}

        <div className={styles.lowStockCard}>

          <div className={styles.cardHeader}>
            <h2>Low Stock Products</h2>
          </div>

          <div className={styles.stockItem}>

            <div>
              <h4>Vitamin C Serum</h4>
              <p>SKU : SKN-001</p>
            </div>

            <span className={styles.lowStock}>
              8 Left
            </span>

          </div>

          <div className={styles.stockItem}>

            <div>
              <h4>Hydra Moisturizer</h4>
              <p>SKU : SKN-002</p>
            </div>

            <span className={styles.lowStock}>
              5 Left
            </span>

          </div>

          <div className={styles.stockItem}>

            <div>
              <h4>SPF 50 Sunscreen</h4>
              <p>SKU : SKN-003</p>
            </div>

            <span className={styles.lowStock}>
              11 Left
            </span>

          </div>

        </div>

        {/* Reviews */}

        <div className={styles.reviewCard}>

          <div className={styles.cardHeader}>
            <h2>Recent Reviews</h2>
          </div>

          <div className={styles.reviewItem}>

            <div>

              <h4>Priya Sharma</h4>

              <div className={styles.stars}>
                ⭐⭐⭐⭐⭐
              </div>

              <p>
                Amazing quality. Loved the Vitamin C Serum.
              </p>

            </div>

          </div>

          <div className={styles.reviewItem}>

            <div>

              <h4>Rahul Verma</h4>

              <div className={styles.stars}>
                ⭐⭐⭐⭐☆
              </div>

              <p>
                Sunscreen texture is very lightweight.
              </p>

            </div>

          </div>

          <div className={styles.reviewItem}>

            <div>

              <h4>Neha Patel</h4>

              <div className={styles.stars}>
                ⭐⭐⭐⭐⭐
              </div>

              <p>
                Moisturizer is perfect for dry skin.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= TODAY OVERVIEW ================= */}

      <div className={styles.activityCard}>

        <div className={styles.cardHeader}>
          <h2>Today's Activity</h2>
        </div>

        <div className={styles.activityGrid}>

          <div className={styles.activityItem}>
            <h3>26</h3>
            <p>New Orders</p>
          </div>

          <div className={styles.activityItem}>
            <h3>₹12,420</h3>
            <p>Today's Revenue</p>
          </div>

          <div className={styles.activityItem}>
            <h3>8</h3>
            <p>New Customers</p>
          </div>

          <div className={styles.activityItem}>
            <h3>4</h3>
            <p>Pending Deliveries</p>
          </div>

        </div>

      </div>

      
    </div>
  );
}