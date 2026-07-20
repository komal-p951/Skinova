import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import {
  MoveLeft,
  Package,
  CalendarDays,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { clientServer } from "@/index";

export default function Myorder() {
  const [myOrders, setMyOrders] = useState([]);
  const [token, setToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
      return;
    }
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await clientServer.get("/order/myorders", {
        headers: {
          Authorization: token,
        },
      });
      setMyOrders(res.data.order);
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return styles.delivered;

      case "Shipped":
        return styles.shipped;

      case "Cancelled":
        return styles.cancelled;

      default:
        return styles.placed;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MoveLeft
          className={styles.back}
          onClick={() => router.back()}
        />

        <div>
          <h1>My Orders</h1>
          <p>{myOrders.length} Orders Found</p>
        </div>
      </div>

      {myOrders.length === 0 ? (
        <div className={styles.empty}>
          <Package size={70} />
          <h2>No Orders Yet</h2>
          <button onClick={() => router.push("/")}>Shop Now</button>
        </div>
      ) : (
        myOrders.map((order) => (
          <div key={order._id} className={styles.orderCard} >
            <div className={styles.orderHeader}>
              <div>
                <h3>Order # {order._id.slice(-6).toUpperCase()}</h3>

                <p><CalendarDays size={16} />
                  {new Date(
                    order?.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className={`${styles.status} ${getStatusClass(order?.orderStatus)}`}>{order.orderStatus}
              </div>
            </div>
            

            <div className={styles.products}>
              {order?.products?.map((item) => (
                <div key={item._id} className={styles.product} >
                  <img src={ item?.product?.images?.[0]?.url } alt="" />
                  <div className={styles.productInfo} >
                    <h4>{item?.product?.name}</h4>
                    <p>Qty :{item?.quantity}</p>
                    <span> ₹{item?.price} </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div>
                <p><CreditCard size={16} /> Payment : {order?.paymentStatus} </p>
                <h2> Total ₹ {order.total.toFixed(2)} </h2>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.detailsBtn}
                  onClick={() =>
                    router.push(
                      `/myorders/${order?._id}`
                    )
                  }
                > View Details <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}