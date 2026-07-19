import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import {
  Package,
  Truck,
  CheckCircle2,
  ArrowRight,
  MoveLeft,
  ChevronRight,
} from "lucide-react";
import { clientServer } from "@/index";

export default function Myorder() {
  const [myOrders, setMyOrders] = useState([]);
  const [token, setToken] = useState("");
  const router = useRouter();
  
      
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/login");
    }
  }, []);

  const fetchdata = async() => {
    try {
      let res = await clientServer.get("/order/myorders",{
        headers: {
          Authorization: token
        }
      });

      setMyOrders(res.data.order);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchdata();
  },[token]);

  console.log("my order list", myOrders);

  return (

    <div className={styles.container}>

  <div className={styles.header}>
    <h1>My Orders</h1>
    <p>Track and manage your Skinova orders.</p>
  </div>

  {
    myOrders.length === 0 ? (

      <div className={styles.emptyOrder}>
        <img src="/empty-order.png" alt="" />
        <h2>No Orders Yet</h2>
        <p>You haven't placed any order.</p>

        <button
          onClick={() => router.push("/products")}
          className={styles.shopBtn}
        >
          Shop Now
        </button>
      </div>

    ) : (

      myOrders.map((order) => (

        <div className={styles.orderCard} key={order._id}>


          {/* ===========================
                ORDER HEADER
          ============================== */}

          <div className={styles.orderHeader}>

            <div>

              <h2>
                Order #
                {order._id.toUpperCase().slice(18)}
              </h2>

              <p>
                Ordered on{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

            </div>


            <div className={styles.orderStatus}>

              <span>{order.orderStatus}</span>

            </div>

          </div>


          {/* ======================
              PRODUCTS
          ======================= */}

          <div className={styles.products}>

            {
              order.products.map((item) => (

                <div
                  className={styles.product}
                  key={item._id}
                >

                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                  />

                  <div className={styles.productInfo}>

                    <h3>{item.product.name}</h3>

                    <p>
                      Quantity :
                      <strong>
                        {" "}
                        {item.quantity}
                      </strong>
                    </p>

                    <p>
                      ₹{item.price}
                    </p>

                  </div>

                </div>

              ))
            }

          </div>


          {/* =====================
                PRICE DETAILS
          ======================= */}

          <div className={styles.priceSection}>

            <div>
              <span>Subtotal</span>
              <span>₹ {order.subtotal}</span>
            </div>

            <div>
              <span>Discount</span>
              <span className={styles.discount}>
                - ₹ {Math.round(order.discount)}
              </span>
            </div>

            <div>
              <span>Shipping</span>

              <span>
                {order.shippingCharge === 0
                  ? "FREE"
                  : `₹ ${order.shippingCharge}`}
              </span>
            </div>

            <div className={styles.totalRow}>

              <span>Total</span>

              <span>
                ₹ {order.total}
              </span>

            </div>

          </div>


          {/* =====================
                FOOTER
          ======================= */}

          <div className={styles.footer}>


            <div>

              <p>

                <strong>Payment :</strong>{" "}

                {order.paymentMethod === "COD"
                  ? "Cash On Delivery"
                  : "Online"}

              </p>

              <p>

                <strong>Status :</strong>{" "}

                {order.paymentStatus}

              </p>

            </div>


            <div className={styles.buttons}>

              <button
                onClick={() =>
                  router.push(`/orders/${order._id}`)
                }
              >
                View Details
              </button>

              {
                order.orderStatus === "Placed" && (

                  <button className={styles.cancelBtn}>
                    Cancel Order
                  </button>

                )
              }

              {
                order.orderStatus === "Delivered" && (

                  <>
                    <button>
                      Buy Again
                    </button>

                    <button>
                      Write Review
                    </button>
                  </>

                )
              }

            </div>

          </div>

        </div>

      ))

    )
  }

</div>

    //my code is ======== =****** *** ==== 
    // <div className={styles.container}>

        
    //   <div className={styles.head}>
    //       <MoveLeft style={{marginBottom: "1.8rem"}}/>
    //     <div className={styles.header}>
    //       <h1>My Orders</h1>
    //       <p>Track and manage your Skinova orders.</p>
    //     </div>
    //   </div>

    //   {myOrders.map((orders) => orders.products.map((order) => 
    //     <div className={styles.orderCard}>

    //       <div className={styles.imageSection}>
    //         <img
    //           // src="/images/skincare6.jpg"
    //           src={order?.product?.images?.[0]?.url}
      
    //           alt="product"
    //           className={styles.productImage}
    //         />
    //       </div>

    //       <div className={styles.details}>

    //         <div >
    //           <div className={styles.topRow}>
    //             <h2>{orders?.orderStatus}</h2>

    //             {/* <span className={styles.statusDelivered}>
    //               <CheckCircle2 size={16} />
    //               Delivered
    //               </span> */}
    //           </div>
    //           <p>{order?.product?.name}</p>
              
    //           <p className={styles.price}>₹{order?.product?.price}</p>

    //           <p className={styles.orderId}>Order ID : {String(orders._id).toUpperCase().slice(6)}</p>
    //         </div>
    //         <div><ChevronRight /></div>

    //         {/* <div className={styles.infoRow}>

    //           <div>
    //             <Package size={18}/>
    //             <span>Ordered</span>
    //             <small>10 July 2026</small>
    //           </div>

    //           <ArrowRight/>

    //           <div>
    //             <Truck size={18}/>
    //             <span>Shipped</span>
    //             <small>11 July 2026</small>
    //           </div>

    //           <ArrowRight/>

    //           <div>
    //             <CheckCircle2 size={18}/>
    //             <span>Delivered</span>
    //             <small>13 July 2026</small>
    //           </div>

    //         </div> */}

    //         {/* <div className={styles.buttons}>

    //           <button className={styles.trackBtn}>
    //             Track Order
    //           </button>

    //           <button className={styles.reviewBtn}>
    //             Write Review
    //           </button>

    //           <button className={styles.buyBtn}>
    //             Buy Again
    //           </button>

    //         </div> */}

    //       </div>

    //     </div>
    //   ))}



    // </div>
  );
}
      {/* <div className={styles.orderCard}>

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

      </div> */}


