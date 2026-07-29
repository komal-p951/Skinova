import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Search, Eye } from "lucide-react";
import { useRouter } from "next/router";
import { clientServer } from "@/index";

export default function Orders() {

    const router = useRouter();

    const [orders,setOrders]=useState([]);
    const [loading,setLoading]=useState(true);
    const [search,setSearch]=useState("");

    const fetchOrders=async()=>{

        try{

            const token=localStorage.getItem("token");

            const res=await clientServer.get("/order/allorders",{
                headers:{
                    Authorization:token
                }
            });

            setOrders(res.data.orders);

        }catch(err){

            console.log(err);

        }finally{

            setLoading(false);

        }

    }

    useEffect(()=>{

        fetchOrders();

    },[]);

    const filteredOrders=orders.filter((item)=>{

        return(
            item._id.toLowerCase().includes(search.toLowerCase()) ||
            item.user?.name?.toLowerCase().includes(search.toLowerCase())
        )

    });

    if(loading){

        return <h2 className={styles.loading}>Loading...</h2>

    }

    return(

        <div className={styles.container}>

            <div className={styles.header}>

                <div>

                    <h1>Orders</h1>

                    <p>Manage all customer orders</p>

                </div>

                <div className={styles.searchBox}>

                    <Search size={18}/>

                    <input
                    placeholder="Search Order..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    />

                </div>

            </div>

            <div className={styles.tableContainer}>

                <table>

                    <thead>

                        <tr>

                            <th>Order ID</th>

                            <th>Customer</th>

                            <th>Total</th>

                            <th>Payment</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                    {filteredOrders.map((order)=>(

                        <tr key={order._id}>

                            <td>

                                {order._id.slice(-8).toUpperCase()}

                            </td>

                            <td>

                                {order.user?.name || "Customer"}

                            </td>

                            <td>

                                ₹{order.total}

                            </td>

                            <td>

                                <span
                                className={
                                    order.paymentStatus==="Paid"
                                    ?styles.paid
                                    :styles.pending
                                }
                                >

                                    {order.paymentStatus}

                                </span>

                            </td>

                            <td>

                                <span
                                className={
                                    order.orderStatus==="Delivered"
                                    ?styles.delivered
                                    :order.orderStatus==="Cancelled"
                                    ?styles.cancelled
                                    :styles.processing
                                }
                                >

                                    {order.orderStatus}

                                </span>

                            </td>

                            <td>

                                <button
                                className={styles.viewBtn}
                                onClick={()=>router.push(`/admin/orders/${order._id}`)}
                                >

                                    <Eye size={18}/>

                                    View

                                </button>

                            </td>

                        </tr>

                    ))}
                    </tbody>

                </table>

                {filteredOrders.length===0 && (

                    <div className={styles.empty}>

                        <img
                        src="/images/empty-orders.png"
                        alt="No Orders"
                        />

                        <h2>No Orders Found</h2>

                        <p>
                            There are no orders matching your search.
                        </p>

                    </div>

                )}

            </div>

            {/* Order Summary */}

            <div className={styles.summaryGrid}>

                <div className={styles.summaryCard}>

                    <h3>Total Orders</h3>

                    <h2>{orders.length}</h2>

                </div>

                <div className={styles.summaryCard}>

                    <h3>Delivered</h3>

                    <h2>

                        {
                            orders.filter(
                                (item)=>item.orderStatus==="Delivered"
                            ).length
                        }

                    </h2>

                </div>

                <div className={styles.summaryCard}>

                    <h3>Pending</h3>

                    <h2>

                        {
                            orders.filter(
                                (item)=>item.orderStatus!=="Delivered"
                            ).length
                        }

                    </h2>

                </div>

                <div className={styles.summaryCard}>

                    <h3>Total Revenue</h3>

                    <h2>

                        ₹{

                            orders.reduce(
                                (acc,item)=>acc+item.total,
                                0
                            )

                        }

                    </h2>

                </div>

            </div>

        </div>

    )

}
