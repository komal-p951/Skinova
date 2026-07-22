import DashboardLayout from '@/layout/DashboardLayout';
import React, { useEffect, useState,useRef } from 'react'
import styles from './styles.module.css';
import { ChevronLeft, Delete, Handbag, Minus, Plus, RotateCcw, ShieldCheck, Trash, Truck, TruckIcon } from 'lucide-react';
import { clientServer } from '@/index';
import Rating from '@/components/Rating';
import { useRouter } from 'next/router';
import FireConfetti from '@/components/FireConfetti';
import { useCheckout } from '@/context/CheckoutContext';

function Cart() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const { setCheckoutData } = useCheckout();

  const router = useRouter();

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
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log("products = ",products);

  const subtotal = products
  .filter((p) => p.product !== null)
  .reduce((acc, p) => acc + (p?.quantity * p?.product?.price), 0);

  let productOriginalPrice = products
  .filter((p) => p.product !== null)
  .reduce((acc, p) => acc + Math.ceil(p?.product?.price * 1.15 * p?.quantity), 0);

  console.warn(productOriginalPrice)

  productOriginalPrice = productOriginalPrice - subtotal;

  const shipping = subtotal >= 750 ? 0 : 40;
  const discount = subtotal >= 1000 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - discount;

  useEffect(() => {
    fetchdata();
  },[token]);

  const handleContinue = () => {
    setCheckoutData ({
      productOriginalPrice,
      subtotal,
      shipping,
      discount,
      total,
    });

    router.push("/checkout");
  }

  const removeFromCart = async (id) => {
    try {
      let res = await clientServer.delete(`/cart/${id}`,{
      headers:{
        Authorization:token
      }
    });
    
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
              <div style={{color:"#0000008f",display:"flex",alignItems:"center"}}>
                <span style={{cursor:'pointer'}} onClick={() => router.push("/")}>Home</span>&nbsp; / &nbsp;
                <span style={{cursor:'pointer'}}>Cart</span></div>
            </div>
            {!subtotal-total >= 1 && 
            <div className={styles.right}>
              <Truck color='#714f65'/>
              <div><p style={{fontWeight:"600"}}>Congratulations! You are eligible for free shipping</p><p style={{opacity:"0.6"}}>Add $2D more to your cart and get free shipping</p></div>
            </div>
            }
          </div>
          {!products.length && <div className={styles.EmptyCartMessage}><span>Your Cart is Empty </span></div>}
          {products.length >= 1 && 
          <div>
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
                  <div className={styles.productimg}>
                    
                    {p?.product?.images?.[0] && <img src={p?.product?.images?.[0].url} alt="" />}
                  </div>
                  <div className={styles.aboutProduct}>
                    <p>{p?.product?.brand}</p>
                    <h3 style={{fontSize:"1.5rem"}}>{p?.product?.name}</h3>
                    <p>{p?.product?.rating}</p>
                    <p className={styles.stock}>in stock</p>
                    <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                      <span style={{textDecoration:'line-through',opacity:'0.8'}}>₹{Math.round(p?.product?.price * 1.15) * p?.quantity}</span><span style={{fontSize:"1.2rem"}}>₹{p?.quantity * p?.product?.price || 0}</span>
                    </div>
                    <Rating product={p?.product}/>
                  </div>
                </div>
                <div className={styles.productrightdata}>
                  <div className={styles.quantityBox}>Quantity : {p?.quantity}</div>

                  <p style={{fontSize:"1.2rem",fontWeight:"600"}}>₹{p?.quantity * p?.product?.price || 0}</p>
                  <p ><span className={styles.btn} onClick={() => removeFromCart(p?.product?._id)}>remove <Trash/></span></p>
                </div>
              </div>
              )}
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <div>
              <div className={styles.cartleft}>
              <div className={styles.orderbanefits}>
                <span><TruckIcon/></span>
                <div>
                  <p style={{fontSize:'1.2rem',fontWeight:'bold'}}>Free Shipping</p>
                  <p>on order over 550</p>
                </div>
              </div>
              <div className={styles.orderbanefits}>
                <span><ShieldCheck /></span>
                <div>
                  <p style={{fontSize:'1.2rem',fontWeight:'bold'}}>Secure Payment</p>
                  <p>100% secure checkout</p>
                </div>
              </div>
              <div className={styles.orderbanefits}>
                <span><RotateCcw /></span>
                <div>
                  <p style={{fontSize:'1.2rem',fontWeight:'bold'}}>Easy Returns</p>
                  <p>30-day return policy</p>
                </div>
              </div>            
              </div>
              {subtotal - total >= 1 && (
                <div className={styles.congrats}>
                  {/* Canvas — position: absolute, parent relative hona chahiye */}
                  <FireConfetti subtotal={subtotal} total={total}/>
                  Congratulations 🎉 you save ₹{Math.floor(subtotal - total + productOriginalPrice)}
                </div>
              )}

            </div>
            <div className={styles.cartright}>
              <h2 className={styles.text}>Order Summary</h2>
              <div className={styles.flex}>
                <p>Subtotal</p>
                <p>₹{subtotal+productOriginalPrice}</p>
              </div>
              <div className={styles.flex}>
                <p>Shipping</p>
                <p>₹{shipping}</p>
              </div>
              <div className={styles.flex}>
                <p>Discount</p>
                <p>₹{Math.floor(discount+productOriginalPrice)}</p>
              </div>
              <hr className={styles.text} />
              <div className={styles.flex}>
                <h3>Total</h3>
                <h3 style={{color:'rgb(141 75 110)'}}>₹{Math.ceil(total)}</h3>
              </div>
              <div className={styles.btns}>
                <div onClick={handleContinue} className={styles.proceed}><Handbag />Proceed to Checkout</div>
                <div onClick={() => router.push("/")} className={styles.continueS}><ChevronLeft />Continue Shopping</div>
              </div>
            </div>
          </div>
          </div>
          }
        </div>
      </div>

    </DashboardLayout>
  )
}

export default Cart;
