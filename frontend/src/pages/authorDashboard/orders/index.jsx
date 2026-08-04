import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Search, MoveLeft } from "lucide-react";
import { useRouter } from "next/router";
import { clientServer } from "@/index";

export default function Orders() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    else router.push("/login");
  },[]);
  const fetchOrders = async () => {
    try {
      const res = await clientServer.get("/order/getallorders", {
        headers: {
          Authorization: token,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const filteredOrders = orders.filter((item) => {
    return (
      item._id.toLowerCase().includes(search.toLowerCase()) ||
      item.user?.fullname?.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return <h2 className={styles.loading}>Loading...</h2>;
  }
  console.log(orders);
  const handleStatusChange = async(id,newStatus,payStatus) => {
    const previousOrders  = [...orders];
    try {
      setOrders(prevOrders => 
        prevOrders.map((order) => 
          order._id === id ? {...order, 
            orderStatus: newStatus ?? order.orderStatus,
            paymentStatus: payStatus ?? order.paymentStatus
          }
          :
          order
        )
      );

      await clientServer.patch("/order/updatestatus",{
        orderId:id,
        status:newStatus,
        paymentStatus : payStatus
      },{
        headers: {
          Authorization: token
        }
      });
      
      fetchOrders();
    } catch (error) {
      console.log(error);
      setOrders(previousOrders);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{display:'flex',alignItems:'center',gap:'1.5rem'}}>
          <MoveLeft style={{cursor:'pointer',color:'#714f65'}} onClick={() => router.back()}/>
          <div>
            <h1>Orders</h1>
            <p>Manage all customer orders</p>
          </div>
        </div>

        <div className={styles.searchBox}>
          <Search size={18} />

          <input
            placeholder="Search Order..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-8).toUpperCase()}</td>
                <td>{order?.user?.fullname || "Customer"}</td>
                <td>₹{order.total}</td>
                <td>
                  <span >
                  <select
                    onChange={(e) => handleStatusChange(order._id,order.orderStatus,e.target.value)} className={order.paymentStatus === "Paid" ? styles.paid : styles.pending} value={order.paymentStatus}>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                  </span>
                </td>
                <td>
                  <span >
                  <select
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value,order.paymentStatus)
                    }
                    className={styles.statusSelect}
                    value={order.orderStatus}
                  >
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out For Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Returned">Returned</option>
                  </select>
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString("en-IN",{
                    day:"numeric",
                    month:"2-digit",
                    year:"numeric"
                })}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className={styles.empty}>
            <img src="/herobanerimages/image.png" alt="No Orders" />

            <h2>No Orders Found</h2>

            <p>There are no orders matching your search.</p>
          </div>
        )}
      </div>


      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <h3>Total Orders</h3>
          <h2>{orders.length}</h2>
        </div>

        <div className={styles.summaryCard}>
          <h3>Delivered</h3>
          <h2>{orders.filter((item) => item.orderStatus === "Delivered").length}</h2>
        </div>

        <div className={styles.summaryCard}>
          <h3>Pending</h3>
          <h2>{orders.filter((item) => item.orderStatus !== "Delivered").length}</h2>
        </div>

        <div className={styles.summaryCard}>
          <h3>Total Revenue</h3>
          <h2>₹{orders.reduce((acc, item) => acc + item.total, 0)}</h2>
        </div>
      </div>
    </div>
  );
}
