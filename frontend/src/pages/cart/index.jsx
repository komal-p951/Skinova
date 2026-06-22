import DashboardLayout from '@/layout/DashboardLayout';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import { Delete, Minus, Plus, Trash, Truck } from 'lucide-react';
import { clientServer } from '@/index';

function Cart() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  let [count,setCount] = useState(1);

  useEffect(() => {
    const storedtoken = localStorage.getItem("token");
    if(storedtoken){
      setToken(storedtoken);
    }else {
      router.push("/login");
    }
  },[]);

  let fetchdata = async() => {
    try {
      let res = await clientServer.get("/cart",{
        headers:{
          Authorization : token
        }
      });
      console.log(res.data)
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchdata();
  },[token]);

  const removeFromCart = async (id) => {
    try {
      let res = await clientServer.delete(`/cart/${id}`,{
      headers:{
        Authorization:token
      }
    });
    console.log(res.data);
    fetchdata();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DashboardLayout>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.cartHead}>
            <div className={styles.left}>
              <p>Your Cart</p>
              <div style={{color:"#0000008f"}}><span>Home</span>&nbsp; / &nbsp;<span>Cart</span></div>
            </div>
            <div className={styles.right}>
              <Truck color='#714f65'/>
              <div><p style={{fontWeight:"600"}}>Congratulations! You are eligible for free shipping</p><p style={{opacity:"0.6"}}>Add $2D more to your cart and get free shipping</p></div>
            </div>
          </div>
          <div className={styles.products}>
            <div className={styles.productheading}>
              <div>
                <p>PRODUCT</p>
              </div>
              <div className={styles.prname}>
                <p>QUANTITY</p>
                <p>TOTAL</p>
                <p>ACTION</p>
              </div>
            </div>
            <div className={styles.allCartProducts}>
              {products.filter((p) =>  p.product !== null).map((p) => 
              <div className={styles.product} key={p?._id}>
                <div className={styles.productleftdata}>
                  <div className={styles.productimg}><img src="/images/skincare3.jpg" alt="" /></div>
                  <div className={styles.aboutProduct}>
                    <h3 style={{fontSize:"1.5rem"}}>{p?.product?.name}</h3>
                    <p>{p?.product?.rating}</p>
                    <p>in stock</p>
                    <p style={{fontSize:"1.2rem"}}>₹{p?.product?.price}</p>
                  </div>
                </div>
                <div className={styles.productrightdata}>
                    <div className={styles.quantityBox}>
                      <span onClick={() => setCount(Math.max(1, count - 1))}> <Minus height={"15px"} width={"15px"}/></span>
                      <p>{count}</p>
                      <span onClick={() => setCount(count + 1)}> <Plus  height={"15px"} width={"15px"}/> </span>
                    </div>
                  <p style={{fontSize:"1.2rem",fontWeight:"600"}}>₹{count * p?.product?.price}</p>
                  <p ><span className={styles.btn} onClick={() => removeFromCart(p?.product?._id)}>remove <Trash/></span></p>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </DashboardLayout>
  )
}

export default Cart;
