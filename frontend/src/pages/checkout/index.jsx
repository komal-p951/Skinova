import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import {
  MapPin,
  Truck,
  Tag,
  ShieldCheck,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";
import DashboardLayout from "@/layout/DashboardLayout";
import { clientServer } from "@/index";

export default function OrderSummary() {
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [cartProducts, setCartProducts] = useState({});
  const router = useRouter();
  const product = {
    name: "Skinova Vitamin C Serum",
    image: "/products/serum.png", // Replace with your image
    price: 799,
    delivery: "18 July 2026",
  };

  useEffect(() => {
    const storedtoken = localStorage.getItem("token");
    if(storedtoken){
      setToken(storedtoken);
    }else{
      router.push("/login");
    }
  },[]);

  const fetchdata = async() => {
    try {
      const res = await clientServer.get("/user",{
      headers: {
        Authorization:token
      }
    });
    setUser(res.data);
    console.log(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchdata();
  },[token])

  const subtotal = product.price * quantity;
  const discount = 120;
  const deliveryCharge = 0;
  const total = subtotal - discount + deliveryCharge;

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

                <button className={styles.changeBtn}>Change</button>
              </div>

              <div className={styles.address}>
                <h3>{user?.fullname}</h3>
                <p>{user?.address?.street}</p>
                <p>{user?.address?.city}</p>
                <p>{user?.address?.state} - {user?.address?.country}</p>
                <p>{user?.phone}</p>
              </div>
            </div>

            {/* Product */}

            {user?.cart?.map((data,idx) => console.log(data))}
            <div className={styles.card}>
              <div className={styles.productCard}>
                <img
                  src={product.image}
                  alt="product"
                  className={styles.productImage}
                />

                <div className={styles.productInfo}>
                  <h2>{product.name}</h2>

                  <p className={styles.rating}>⭐⭐⭐⭐⭐ (248 Reviews)</p>

                  <h3>₹ {product.price}</h3>

                  <div className={styles.quantity}>
                    <button
                      onClick={() =>
                        quantity > 1 && setQuantity(quantity - 1)
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span>{quantity}</span>

                    <button onClick={() => setQuantity(quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* <div className={styles.delivery}>
                    <Truck size={18} />
                    <span>Expected Delivery : {product.delivery}</span>
                  </div> */}
                </div>
              </div>
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
                />

                <button>Apply</button>
              </div>
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
                <span>Price ({quantity} item)</span>

                <span>₹ {subtotal}</span>
              </div>

              <div className={styles.row}>
                <span>Discount</span>

                <span className={styles.discount}>- ₹ {discount}</span>
              </div>

              <div className={styles.row}>
                <span>Delivery</span>

                <span className={styles.free}>FREE</span>
              </div>

              <hr />

              <div className={styles.total}>
                <span>Total Amount</span>

                <span>₹ {total}</span>
              </div>

              <button className={styles.paymentBtn}>
                Continue to Payment
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom */}

        <div className={styles.mobileBottom}>
          <div>
            <h3>₹ {total}</h3>
            <small>Total Amount</small>
          </div>

          <button className={styles.paymentBtn}>
            Continue
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}