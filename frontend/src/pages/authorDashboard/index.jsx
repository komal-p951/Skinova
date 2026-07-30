import React, { useEffect, useState } from "react";
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
  Plus,
} from "lucide-react";
import Link from "next/link";
import { clientServer } from "@/index";

export default function Dashboard() {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState({
  SKN1024: "Placed",
  SKN1025: "Pending",
  SKN1026: "Delivered",
  SKN1027: "Processing",
});
  const [token, setToken] = useState("");
  const [orders,setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newUser, setNewUser] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if(storedToken){
      setToken(storedToken);
    }else{
      router.push("/login");
    }
  },[])


  const handleStatusChange = (orderId, value) => {
  setOrderStatus((prev) => ({
    ...prev,
    [orderId]: value,
  }));
};

  const getAllorders = async() => {
    try {
      let res = await clientServer.get("/order/getallorders",{
        headers:{
          Authorization:token
        }
      });
      console.log(res.data)
      let users = await clientServer.get("/getallusers",{
        headers:{
          Authorization:token
        }
      })

      let product = await clientServer.get("/",{
        headers:{
          Authorization:token
        }
      });

      let newUsers = await clientServer.get("/user/newUser",{
        headers:{
          Authorization:token
        }
      });

      
      setOrders(res.data.orders);
      setUsers(users.data);
      setProducts(product.data);
      setNewUser(newUsers.data);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllorders();
  },[token]);

  const pendingDelieveries = orders.filter((o) => ["Order Confirmed","Shipped","Out For Delivery"].includes(o.orderStatus));
  const todayNewOrders = orders.filter((o) => o.orderStatus == "Order Confirmed");

 
  
  return (
    <div className={styles.container}>

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
          {/* <button className={styles.exportBtn}>
          Export Report
        </button> */}
        <button className={styles.exportBtn} onClick={() => router.push("/authorDashboard/orders")}>
          View Orders
        </button>
        <button className={styles.mobileAddBtn} onClick={() => router.push("/addProduct")}>
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
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

            <h2>{orders.length}</h2>

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

            <h2>{users.length}</h2>

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

            <h2>{products.length}</h2>

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

        {/* <div className={styles.chartCard}>

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

        </div> */}

        {/* Revenue Summary */}

        {/* <div className={styles.summaryCard}>

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

        </div> */}

      </div>

      {/* Part 2 me niche Recent Orders aur Top Selling Products aayenge */}

      {/* ================= RECENT ORDERS ================= */}

      {/* {orders.slice(0,5).map((data,idx) => ( */}
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
              
              {orders.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5).map((data,idx) => (
              <tr key={idx}>
                <td>#{data._id.slice(-6).toUpperCase()}</td>
                <td>{data?.user?.fullname}</td>
                <td>₹{Math.ceil(data?.total)}</td>
                <td>
                <span className={styles.pending}>
                  {data.orderStatus}
                </span>

                  <br />
                  <br />

                  {/* <select
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
                  </select> */}

                </td>

              </tr>
              ))
              }

              {/* <tr>

                <td>#SKN1025</td>

                <td>Rahul Verma</td>

                <td>₹899</td>

                <td>
                  <span className={styles.pending}>
                    Pending
                  </span>
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
                </td>

              </tr>
              */}
            </tbody>

          </table>
        </div>

      </div>

      {/* ================= TOP PRODUCTS ================= */}

        <div className={styles.productCard}>

          <div className={styles.cardHeader}>

            <h2>Top Selling Products</h2>

          </div>

          {products.sort((a,b) => b.sold - a.sold).slice(0,5).map((data, idx) => (
        
              <div className={styles.productItem} key={idx}>
              <img src={data?.images?.[0]?.url} alt="productImages"/>
              <div>
                <h4>{data?.name}</h4>
                <p>{data?.sold}</p>
              </div>
              <span className={styles.price}>₹ {data?.price} </span>
            </div>
          )) 
          }
        </div>
        

      {/* ================= LOW STOCK + REVIEWS ================= */}

      <div className={styles.lastGrid}>

        {/* Low Stock */}

        <div className={styles.lowStockCard}>

          <div className={styles.cardHeader}>
            <h2>Low Stock Products</h2>
          </div>
          
          {products.filter((p) => p.quantity <= 20).map((product) => (
            <div className={styles.stockItem}>
            <div>
              <h4>{product?.name}</h4>
              <p>{product?.category}</p>
            </div>
            <span className={styles.lowStock}>{product?.quantity} Left</span>
            <span onClick={() => router.push(`/product/${product._id}`)} style={{cursor:"pointer",background:"pink",padding:"0.8rem",borderRadius:"12px"}}>See Details</span>
          </div>
          ))}


        </div>

        {/* Reviews */}

        {/* <div className={styles.reviewCard}>

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

        </div> */}

      </div>

      {/* ================= TODAY OVERVIEW ================= */}

      <div className={styles.activityCard}>

        <div className={styles.cardHeader}>
          <h2>Today's Activity</h2>
        </div>

        <div className={styles.activityGrid}>

          <div className={styles.activityItem}>
            <h3>{todayNewOrders?.length}</h3>
            <p>New Orders</p>
          </div>

          <div className={styles.activityItem}>
            <h3>₹12,420</h3>
            <p>Today's Revenue</p>
          </div>

          <div className={styles.activityItem}>
            <h3>{newUser}</h3>
            <p>New Customers</p>
          </div>

          <div className={styles.activityItem}>
            <h3>{pendingDelieveries?.length}</h3>
            <p>Pending Deliveries</p>
          </div>

        </div>

      </div>

      
    </div>
  );
}
