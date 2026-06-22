import DashboardLayout from '@/layout/DashboardLayout';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import { Truck } from 'lucide-react';
import { clientServer } from '@/index';

function Cart() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

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
              <div className={styles.productHeading}>
                <p>PRODUCT</p>
              </div>
              <div className={styles.prname}>
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>TOTAL</p>
                <p>ACTION</p>
              </div>
            </div>
            <div className={styles.allCartProducts}>
              {products.map((p) => console.log(p?.product?.name))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Cart;
