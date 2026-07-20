import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import {
  MoveLeft,
  CalendarDays,
  CreditCard,
  MapPin,
  Package,
  CircleCheckBig,
  Truck,
} from "lucide-react";
import { clientServer } from "@/index";
import Loader from "@/components/Loader/Loader";


export default function OrderDetails() {

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
      return;
    }
    setToken(storedToken);
  }, []);

    const fetchOrder = async () => {
    try {
      const res = await clientServer.get(
        `/order/getorder/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("resdata = ",res.data);
      setOrder(res.data.order);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || !token) return;
    fetchOrder();
  }, [id, token]);



  if (loading) {
    return (<Loader/>);
  }

  if (!order) {
    return (
      <div className={styles.loading}>
        Order not found
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MoveLeft className={styles.back} onClick={() => router.back()} />
        <div>
          <h1>Order Details</h1>
          <p>Track your Skinova order</p>
        </div>
      </div>

      <div className={styles.orderCard}>
        <div className={styles.orderTop}>
          <div>
            <h2>Order #{order._id.slice(-8).toUpperCase()}</h2>
            <p>
              <CalendarDays size={16} />
              {new Date(
                order.createdAt
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <div className={styles.statusBox}>
            <span className={styles.orderStatus}>{order.orderStatus}</span>
            <span className={styles.paymentStatus}>{order.paymentStatus}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3><MapPin size={20} />Delivery Address</h3>
          <div className={styles.addressCard}>

            <h4>{order?.user?.fullname}</h4>
            <p>{order?.user?.address?.street}</p>
            <p>{order?.user?.address?.city},{order?.user?.address?.state}</p>
            <p>{order?.user?.address?.country}</p>
            <p>{order?.user?.phone}</p>

          </div>
        </div>

        <div className={styles.section}>

          <h3><Package size={20} />Ordered Products</h3>
          <div className={styles.products}>
            {order?.products?.map((item) => (
              <div className={styles.productCard} key={item._id} >
                <img src={item?.product?.images[0]?.url } alt="" className={styles.productImage } />

                <div className={styles.productInfo}>
                  <h4>{item?.product?.name}</h4>
                  <p>{item?.product?.brand}</p>
                  <span>Qty : {item?.quantity}</span>
                  <h3>₹{item?.price}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className={styles.section}>
          <h3><CreditCard size={20} />Price Details</h3>

          <div className={styles.priceCard}>
            <div className={styles.priceRow}>
              <span>Subtotal</span>
              <span>₹{order?.subtotal}</span>
            </div>

            <div className={styles.priceRow}>
              <span>Discount</span>
              <span>- ₹{order?.discount?.toFixed(2)}</span>
            </div>

            <div className={styles.priceRow}>
              <span>Shipping</span>
              <span> {order.shippingCharge === 0 ? "FREE" : `₹${order?.shippingCharge}`} </span>
            </div>

            <div className={styles.totalRow}>
              <span>Total</span>
              <span>₹{order?.total?.toFixed(2)}</span>
            </div>

          </div>
        </div>


        <div className={styles.section}>
          <h3><Truck size={20} />Order Timeline</h3>

          <div className={styles.timeline}>

            <div className={styles.timelineItem}>

              <CircleCheckBig className={styles.activeIcon} />

              <div>
                <h4>Order Placed</h4>
                <p>
                  {new Date(order?.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>

            </div>

            <div className={styles.timelineItem}>

              <CircleCheckBig className={order?.orderStatus !== "Cancelled" ? styles.activeIcon : styles.inactiveIcon } />
              <div>
                <h4>Processing</h4>
                <p>Your order is being prepared.</p>
              </div>

            </div>

            <div className={styles.timelineItem}>

              <Truck
                className={
                  order?.orderStatus === "Shipped" ||
                  order?.orderStatus === "Delivered"
                    ? styles.activeIcon
                    : styles.inactiveIcon
                }
              />

              <div>
                <h4>Shipped</h4>
                <p>Courier partner picked up your order.</p>
              </div>

            </div>

            <div className={styles.timelineItem}>

              <CircleCheckBig
                className={
                  order.orderStatus === "Delivered"
                    ? styles.activeIcon
                    : styles.inactiveIcon
                }
              />

              <div>
                <h4>Delivered</h4>
                <p>Enjoy your Skinova products ❤️</p>
              </div>
            </div>
          </div>
        </div>


        <div className={styles.buttonContainer}>

          <button className={styles.buyAgainBtn} > Buy Again </button>

          {order.orderStatus === "Delivered" && (
            <button className={styles.reviewBtn} >Write Review </button>
          )}

          {(order.orderStatus === "Placed" ||
            order.orderStatus === "Processing") && (

            <button className={styles.cancelBtn}> Cancel Order </button>
          )}

          <button className={styles.invoiceBtn} > Download Invoice </button>
        </div>
      </div>
    </div>
  );
}