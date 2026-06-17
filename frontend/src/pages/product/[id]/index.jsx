import DashboardLayout from '@/layout/DashboardLayout';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { clientServer } from '@/index';
import { Heart, ShoppingCart, Plus, Minus, Trash, PenIcon } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import Loader from '@/components/Loader/Loader';
import { jwtDecode } from 'jwt-decode';

function Product() {
  let [count,setCount] = useState(1);
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const [loading,setLoading] = useState(true);
  const [isowner ,setIsOwner] = useState(false);
  const [message, setMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [token ,setToken] = useState("");

  // console.log("product price " , product.price);
  
  let fetchdata = async()=> {
  if(!id)return;
  try {
  let response = await clientServer.get(`/${id}`);
  setProduct(response.data);
  } catch (error) {
  console.log(error);
  }finally{
  setLoading(false);
  }
    
  }
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  },[]);
  
  useEffect(() => {
    if(!token) return;
    let data = jwtDecode(token);
    if(data.role === "author"){
      setIsOwner(true);
    }
  },[token]);

  useEffect (() => {
    fetchdata();
  },[id]);

  useEffect(() => {
    if (message || errormessage) {
      const timer = setTimeout(() => {
        setMessage("");
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, errormessage]);


  const handleDelete = async (id) => {
    if(token){
      try {
      let res = await clientServer.delete(`/${id}`,{
      headers:{
        Authorization:token
      }
    });

    setMessage(res?.data?.message);
    router.push("/");

    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
    }
    }else{
      router.push("/login");
    }
  }

  
  let originalPrice = Math.round(product.price*1.15);
  
  let price = product?.price || 0;

  if(loading) {
    return <DashboardLayout> <Loader/> </DashboardLayout>;
  }

  
  return (
    <DashboardLayout>
      
        <div className={styles.mainContainer}>
          {message.length > 0 ? (
          <p
            style={{ background: "#b3fdb0", border: "1px solid #337433" }}
            className={styles.message}
          >
            {message}
          </p>
        ) : (
          <></>
        )}
        {errormessage.length > 0 ? (
          <p
            className={styles.message}
            style={{ background: "#ffbaba", border: "1px solid #f72b2b" }}
          >
            {errormessage}{" "}
          </p>
        ) : (
          <></>
        )}
          <div className={styles.mainTopContainer}>

            <div className={styles.discount}><img src="/images/bar.jpeg" alt="" /></div>
            <div className={styles.path}>
              <span onClick={(e) => {
                e.preventDefault();
                router.push("/")
              }} style={{cursor:"pointer"}}>Home</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp;
              <span style={{cursor:"pointer"}}>{product.category
}</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp;
              <span style={{cursor:"pointer"}}>{product.brand}</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp; 
              <span>{product.name}</span>
            </div>

          </div>

          <div className={styles.mainMidContainer}>

            <div className={styles.leftContainer}>
              <div className={styles.mainImage}>
                <img src="/images/fragrance2.jpg" alt="" />
              </div>
              <div className={styles.similarImage}>
                <img src="/images/fragrance2.jpg" alt="" />
                <img src="/images/fragrance2.jpg" alt="" />
                <img src="/images/fragrance2.jpg" alt="" />
              </div>
            </div>
            <div className={styles.rightContainer}>

              <div className={styles.topBar}>
                <div className={styles.productInfo}>
                  <span className={styles.brand}>{product.brand}</span>
                  <span className={styles.catagory}> {product.category
} </span>
                </div>
                <div className={styles.icon}><Heart/></div>
              </div>

              <div className={styles.productMidBar}>
                <h1 className={styles.productName}>{product.name}</h1>
                <h4 style={{marginTop:'1rem'}}>{product.description}</h4>
                <div className={styles.reviewStar}>
                  <span>⭐⭐⭐⭐⭐</span>
                  <span>(120+ review )</span>
                  <span className={styles.stock}>in stock</span>
                </div>
              </div>

              <div style={{borderBottom:"2px solid wheat",marginInline:"16px"}}></div>


              <div className={styles.priceBar}>
                <div className={styles.priceDev}>
                  <span className={styles.price}>₹{price}</span>
                  <span className={styles.originalPrice}>₹{Math.round(price * 1.15)}</span>
                  <span className={styles.savePrice}>you save ₹{originalPrice-price}</span>
                </div>
                  <span style={{opacity:'0.8',paddingLeft:'1rem'}}>inclusive of all taxes</span>
                
              </div>

              <div className={styles.quantity}>
                <h4>Quantity: </h4>
                <div className={styles.quantityBox}>
                  <span onClick={() => setCount(Math.max(1, count - 1))}> <Minus /></span>
                  <p>{count}</p>
                  <span onClick={() => setCount(count + 1)}> <Plus/> </span>
                </div>
              </div>
              <div className={styles.addToCartBtn}><ShoppingCart/>Add to cart</div>

            </div>
          </div>

          <div className={styles.reviewName}>Ratings & Reviews</div>
          <div className={styles.mainReviewContainer}>
            <ReviewCard  reviews={product?.reviews} fetchReviews={fetchdata}/>
            {isowner && 
              <div className={styles.authorbtns}>
                <div className={styles.btns} onClick={() => router.push(`/editproduct/${id}`)}> <PenIcon/> edit product</div>
                <div className={styles.btns} type="button" onClick={() => handleDelete(id)}> <Trash/> delete product</div>
              </div>
            }
          </div>
        </div>
    </DashboardLayout>
  );
}
export default Product;

