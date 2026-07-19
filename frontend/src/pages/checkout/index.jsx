import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import {
  MapPin,
  Truck,
  Tag,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import DashboardLayout from "@/layout/DashboardLayout";
import { clientServer } from "@/index";
import Rating from "@/components/Rating";
import Loader from "@/components/Loader/Loader";
import { useCheckout } from "@/context/CheckoutContext";

const VALID_COUPON = "HAXFILDE1254";
const COUPON_DISCOUNT_PERCENT = 5;

export default function OrderSummary() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [loading,setLoading] = useState(true);
  const { setCheckoutData } = useCheckout();
  const router = useRouter();

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
      const res = await clientServer.get("/user", {
        headers: { Authorization: token },
      });
      const userCartProducts = await clientServer.get("/cart", {
        headers: { Authorization: token },
      });
      setUser(res.data);
      setCartProducts(userCartProducts.data);
      setLoading(false);
    } catch (error) {
      console.log(error); //?.response?.data?.message || error.message
    }
  };

  // Only fetch once we actually have a token - avoids a wasted call with an empty header
  useEffect(() => {
    if (token) {
      fetchdata();
    }
  }, [token]);
 

  const validProducts = cartProducts.filter((p) => p.product !== null);

  const totalItems = validProducts.reduce((acc, p) => acc + p.quantity, 0);

  const subtotal = validProducts.reduce(
    (acc, p) => acc + p.quantity * p.product.price,
    0
  );

  const shipping = subtotal >= 750 || subtotal === 0 ? 0 : 40;
  const bulkDiscount = subtotal >= 1000 ? + (subtotal * 0.05) : 0;
  const couponDiscount = appliedCoupon
    ? +(((subtotal - bulkDiscount + shipping) * COUPON_DISCOUNT_PERCENT) / 100)
    : 0;

  const totalDiscount = bulkDiscount + couponDiscount;
  const total = subtotal + shipping - totalDiscount;

  const couponApplyfun = () => {
    if (!coupon) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    if (appliedCoupon) {
      setCouponError("Coupon already applied.");
      return;
    }
    if (coupon.trim().toUpperCase() === VALID_COUPON) {
      setAppliedCoupon(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code.");
    }
    setCoupon("");
  };

  const handleContinue = () => {
    setCheckoutData({
      validProducts,
      user,
      subtotal,
      shipping,
      discount: totalDiscount,
      total,
    });

    router.push("/payment");
  }

  if(loading) {
    return <DashboardLayout> <Loader/> </DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Order Summary</h1>
          <p>Review your order before payment.</p>
        </div>

        {/* Stepper */}
        <div className={styles.stepper}>
          <div className={styles.activeStep}>Address</div>
          <div className={styles.line}></div>
          <div className={styles.activeStep}>Summary</div>
          <div className={styles.line}></div>
          <div className={styles.inactiveStep}>Payment</div>
        </div>

        <div className={styles.mainSection}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            {/* Address */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.title}>
                  <MapPin size={20} />
                  <h2>Delivery To:</h2>
                </div>
                <button onClick={() => router.push("/profile")} className={styles.changeBtn}>Change</button>
              </div>

              <div className={styles.address}>
                <h3>{user?.fullname}</h3>
                <p>{user?.address?.street}</p>
                <p>{user?.address?.city}</p>
                <p>
                  {user?.address?.state} - {user?.address?.country}
                </p>
                <p>{user?.phone}</p>
              </div>
            </div>

            {/* Products */}
            <div className={styles.card}>
              {validProducts.map((p) => (
                <div className={styles.productCard} key={p._id}>
                  <img
                    src={p?.product?.images?.[0]?.url || "/placeholder.png"}
                    alt={p?.product?.name || "product"}
                    className={styles.productImage}
                  />

                  <div className={styles.productInfo}>
                    <h2>{p?.product?.name}</h2>
                    <Rating product={p?.product}/>
                    <h3>₹ {p?.product?.price}</h3>

                    <div className={styles.quantity}>
                      <span>Quantity of Proudcts :{p.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.title}>
                  <Tag size={18} />
                  <h2>Apply Coupon</h2>
                </div>
              </div>

              <div className={styles.couponBox}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  disabled={appliedCoupon}
                />
                <button onClick={couponApplyfun} disabled={appliedCoupon}>
                  {appliedCoupon ? "Applied" : "Apply"}
                </button>
              </div>
              {couponError && <p className={styles.couponError}>{couponError}</p>}
              {appliedCoupon && (
                <p className={styles.couponSuccess}>
                  Coupon applied: {COUPON_DISCOUNT_PERCENT}% off
                </p>
              )}
            </div>

            {/* Promise */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.title}>
                  <ShieldCheck size={20} />
                  <h2>Skinova Promise</h2>
                </div>
              </div>

              <ul className={styles.promise}>
                <li>✔ Dermatologist Tested</li>
                <li>✔ 100% Authentic Products</li>
                <li>✔ Premium Secure Packaging</li>
                <li>✔ Easy Return & Refund</li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <div className={styles.priceCard}>
              <h2>Price Details</h2>

              <div className={styles.row}>
                <span>Price ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                <span>₹ {subtotal}</span>
              </div>

              <div className={styles.row}>
                <span>Discount</span>
                <span className={styles.discount}>₹ {Math.round(totalDiscount)}</span>
              </div>

              <div className={styles.row}>
                <span>Delivery</span>
                <span className={shipping === 0 ? styles.free : ""}>
                  {shipping === 0 ? "FREE" : `₹ ${shipping}`}
                </span>
              </div>

              <hr />

              <div className={styles.total}>
                <span>Total Amount</span>
                <span>₹ {Math.ceil(total)}</span>
              </div>

              <button onClick={handleContinue} disabled={ validProducts.length===0 || !user.address } className={styles.paymentBtn}>
                Continue to Payment
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom */}
        {/* <div className={styles.mobileBottom}>
          <div>
            <h3>₹ {total.toFixed(2)}</h3>
            <small>Total Amount</small>
          </div>

          <button className={styles.paymentBtn}>Continue</button>
        </div> */}
      </div>
    </DashboardLayout>
  );
}