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

//   document.querySelectorAll('*').forEach(el => {
//   if (el.offsetWidth > document.documentElement.offsetWidth) {
//     console.log(el, el.offsetWidth);
//   }
// });

  let [count,setCount] = useState(1);
  const [product, setProduct] = useState({images:[]});
  const router = useRouter();
  const { id } = router.query;
  const [loading,setLoading] = useState(true);
  const [isowner ,setIsOwner] = useState(false);
  const [message, setMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [token ,setToken] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedInWishlist, setIsAddedInWishlist] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlistProducts, setWishListProducts] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  },[]);
  
  let fetchdata = async()=> {
  try {
  let response = await clientServer.get(`/${id}`);
  let getCartProducts  = await clientServer.get("/cart",{
    headers:{
      Authorization:token
    }
  });
  let getWishlistProducts  = await clientServer.get("/wishlist",{
    headers:{
      Authorization:token
    }
  });
  // console.log(getWishlistProducts.data)
  setCartProducts(getCartProducts.data);
  setWishListProducts(getWishlistProducts.data);
  setProduct(response.data);

  } catch (error) {
  console.log(error);
  }
  finally{
  setLoading(false);
  }
}
  
  
  useEffect(() => {
    if(!token) return;
    let data = jwtDecode(token);
    if(data.role === "author"){
      setIsOwner(true);
    }
  },[token]);


  useEffect(() => {
  if ((product?._id && cartProducts.length > 0) || (product._id && wishlistProducts.length > 0)) {
    const existsInCart = cartProducts.some((item) => item?.product?._id === product._id);
    if (existsInCart) setIsAdded(true);
    const existsInWishlist = wishlistProducts.some((item) => item._id == product._id);
    if (existsInWishlist) setIsAddedInWishlist(true);
  }
}, [cartProducts, product._id, wishlistProducts]);

  useEffect (() => {
    if(!id) return;
    if(!token) return;
    fetchdata();
  },[id,token]);

  useEffect(() => {
    if (message || errormessage) {
      const timer = setTimeout(() => {
        setMessage("");
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, errormessage]);


  const addTocart = async(productId) => {
    try {
      let res = await clientServer.post(`/cart/${productId}`,{
        quantity : count
      },{
      headers:{
        Authorization:token
      }
    });
    setIsAdded(true);
    // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
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

  const addToWishList = async() => {
    try {
      let res = await clientServer.post(`/wishlist/${product._id}`,{},{
      headers:{
        Authorization: token
      }
    });
    setIsAddedInWishlist(true);
    } catch (error) {
      console.log(error);
    }
  }

  const removeFromWishlist = async() => {
    try {
      let res = await clientServer.delete(`/wishlist/${product._id}`,{
        headers:{
          Authorization : token
        }
      });
      setIsAddedInWishlist(false);
    } catch (error) {
      console.log(error);
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
                {product?.images?.[0] && (<img src={product.images[0].url} alt="" />) }
                
              </div>
              <div className={styles.similarImage}>
                {product?.images?.slice(1).map((image,idx) => (
                  <img src={image?.url} alt={image?.filename} key={idx}/>
                ))}
              </div>
            </div>
            <div className={styles.rightContainer}>

              <div className={styles.topBar}>
                <div className={styles.productInfo}>
                  <span className={styles.brand}>{product.brand}</span>
                  <span className={styles.catagory}> {product.category
} </span>
                </div>
                <div className={isAddedInWishlist ? styles.liked : styles.like}  onClick={isAddedInWishlist ? removeFromWishlist : addToWishList}><Heart /></div>
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
              <div className={styles.addToCartBtn} onClick={() => addTocart(product._id)}><ShoppingCart/>{isAdded ? <p onClick={() => router.push("/cart")}>Go to cart</p> : <p>Add to cart</p>}</div>

            </div>
          </div>

          <div className={styles.mainReviewContainer}>
          <div className={styles.reviewName}>Ratings & Reviews</div>
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

