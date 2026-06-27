import DashboardLayout from '@/layout/DashboardLayout';
import React, { useEffect, useState,useRef } from 'react'
import styles from './styles.module.css';
import { ChevronLeft, Delete, Handbag, Minus, Plus, RotateCcw, ShieldCheck, Trash, Truck, TruckIcon } from 'lucide-react';
import { clientServer } from '@/index';
import Rating from '@/components/Rating';
import { useRouter } from 'next/router';

function Cart() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const canvasRef = useRef(null);
  const animRef = useRef(null);

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
      console.log(res.data)
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const subtotal = products
  .filter((p) => p.product !== null)
  .reduce((acc, p) => acc + (p.quantity * p.product.price), 0);

  const shipping = subtotal >= 750 ? 0 : 40;
  const discount = subtotal >= 1000 ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  useEffect(() => {
    fetchdata();
  },[token]);

  useEffect(() => {
  if (subtotal - total >= 1) {
    fireConfetti();
  } else {
    stopConfetti();
  }
}, [subtotal, total]);

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




  //shower function
  const COLORS = ['#7F77DD','#1D9E75','#D85A30','#378ADD','#D4537E','#EF9F27'];

  function fireConfetti() {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  let particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 3 + 2,
      w: Math.random() * 10 + 5,
      h: Math.random() * 5 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.15,
      opacity: 1,
    });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.angle += p.spin;
      if (p.y > canvas.height * 0.75) p.opacity -= 0.02;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    particles = particles.filter(p => p.opacity > 0);
    animRef.current = requestAnimationFrame(loop);
  }
  loop();
}

function stopConfetti() {
  if (animRef.current) cancelAnimationFrame(animRef.current);
  const canvas = canvasRef.current;
  if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}


  return (
    <DashboardLayout>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.cartHead}>
            <div className={styles.left}>
              <p>Your Cart</p>
              <div style={{color:"#0000008f"}}>
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
                  <div className={styles.productimg}><img src="/images/skincare3.jpg" alt="" /></div>
                  <div className={styles.aboutProduct}>
                    <h2>{p?.product?.brand}</h2>
                    <h3 style={{fontSize:"1.5rem"}}>{p?.product?.name}</h3>
                    <p>{p?.product?.rating}</p>
                    <p>in stock</p>
                    <p style={{fontSize:"1.2rem"}}>₹{p?.product?.price}</p>
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
              {/* {subtotal-total >= 1 && <div className={styles.congrats}>Congratulations🎉 you save ₹{Math.round(subtotal-total)}</div>} */}
              {subtotal - total >= 1 && (
                <div className={styles.congrats}>
                  {/* Canvas — position: absolute, parent relative hona chahiye */}
                  <canvas
                    ref={canvasRef}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '100%', height: '100%',
                      pointerEvents: 'none',
                    }}
                  />
                  Congratulations 🎉 you save ₹{Math.round(subtotal - total)}
                </div>
              )}

            </div>
            <div className={styles.cartright}>
              <h2 className={styles.text}>Order Summary</h2>
              <div className={styles.flex}>
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>
              <div className={styles.flex}>
                <p>Shipping</p>
                <p>₹{shipping}</p>
              </div>
              <div className={styles.flex}>
                <p>Discount</p>
                <p>₹{discount}</p>
              </div>
              <hr className={styles.text} />
              <div className={styles.flex}>
                <h3>Total</h3>
                <h3 style={{color:'rgb(141 75 110)'}}>₹{total}</h3>
              </div>
              <div className={styles.btns}>
                <div className={styles.proceed}><Handbag />Proceed to Checkout</div>
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
