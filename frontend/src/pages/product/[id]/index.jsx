import DashboardLayout from '@/layout/DashboardLayout';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { clientServer } from '@/index';
import { Heart, ShoppingCart, Plus, Minus, Trash, PenIcon } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import Loader from '@/components/Loader/Loader';
import { jwtDecode } from 'jwt-decode';
import Rating from '@/components/Rating';
import toast from 'react-hot-toast';

function Product() {


  const router = useRouter();
  let [count,setCount] = useState(1);
  const [product, setProduct] = useState({images:[]});
  const { id } = router.query;
  const [loading,setLoading] = useState(true);
  const [isowner ,setIsOwner] = useState(false);
  const [token ,setToken] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedInWishlist, setIsAddedInWishlist] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlistProducts, setWishListProducts] = useState([]);
  const [displayImages,setdisplayImages] = useState([]);
  const [isDescription, setIsDescription] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }else{
      router.push("/login");
    }
  },[]);
  
  let fetchdata = async()=> {
  if(!id) return;
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
  setCartProducts(getCartProducts.data);
  setWishListProducts(getWishlistProducts.data);
  setProduct(response.data);

  } catch (error) {
  toast.error(error?.response?.data?.message || "Something went wrong");
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
  if ((product?._id && cartProducts.length > 0) || (product?._id && wishlistProducts.length > 0)) {
    const existsInCart = cartProducts.some((item) => item?.product?._id === product?._id);
    if (existsInCart) setIsAdded(true);
    const existsInWishlist = wishlistProducts.some((item) => item._id == product?._id);
    if (existsInWishlist) setIsAddedInWishlist(true);
  }
}, [cartProducts, product._id, wishlistProducts]);

  useEffect (() => {
    if(id && token) fetchdata();
  },[id,token]);



  useEffect(() => {
    if(product?.images?.length){
      setdisplayImages(product.images);
    }
  },[product]);

  const addTocart = async(productId) => {
    try {
      let res = await clientServer.post(`/cart/${productId}`,{
        quantity : count
      },{
      headers:{
        Authorization:token
      }
    });
    toast.success(res.data?.message,{position: "bottom-center"});
    setIsAdded(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
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

    toast.success(res?.data?.message || "Product deleted!",{position:"bottom-center"});
    router.push("/");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
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
    toast.success(res.data?.message || "added to wishlist",{position: "bottom-center"});
    setIsAddedInWishlist(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  const removeFromWishlist = async() => {
    try {
      let res = await clientServer.delete(`/wishlist/${product._id}`,{
        headers:{
          Authorization : token
        }
      });
      toast.success(res.data?.message || "product removed from wishList!",{position:"bottom-center"});
      setIsAddedInWishlist(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
  
  let originalPrice = Math.round(product.price*1.15);
  
  let price = product?.price || 0;

  if(loading) {
    return <DashboardLayout> <Loader/> </DashboardLayout>;
  }

  const swap = (index) => {
    if(index == 0)return;
    const updatedImages = [...displayImages];
    let temp = updatedImages[0];
    updatedImages[0] = updatedImages[index];
    updatedImages[index] = temp;
    setdisplayImages(updatedImages);
  }
 
  
  return (
    <DashboardLayout>
      
        <div className={styles.mainContainer}>
          
          <div className={styles.mainTopContainer}>
            <div className={styles.discount}><img src="/herobanerimages/skinova_banner.png" alt="" /></div>
            <div className={styles.path}>
              <span onClick={(e) => {
                e.preventDefault();
                router.push("/")
              }} style={{cursor:"pointer"}}>Home</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp;
              <span style={{cursor:"pointer"}}>{product.category
}</span> &nbsp;&nbsp;&gt;&nbsp;&nbsp;
              <span style={{cursor:"pointer"}}>{product.brand}</span> 
            </div>

          </div>

          <div className={styles.mainMidContainer}>

            <div className={styles.leftContainer}>
              <div className={styles.mainImage}>
                {displayImages?.[0] && (<img src={displayImages[0].url} alt={displayImages[0].filename}/>) }
              </div>
              <div className={styles.similarImage}>
                {displayImages.slice(1).map((image,idx) => (
                  <img src={image?.url} key={idx} alt={image?.filename} onClick={() => swap(idx+1)} />
                ))}
              </div>
            </div>
            <div className={styles.rightContainer}>

              <div className={styles.topBar}>
                <div className={styles.productInfo}>
                  <span className={styles.brand}>{product.brand}</span>
                  <span className={styles.catagory}> {product.category} </span>
                </div>
                <div className={isAddedInWishlist ? styles.liked : styles.like}  onClick={isAddedInWishlist ? removeFromWishlist : addToWishList}><Heart /></div>
              </div>

              <div className={styles.productMidBar}>
                <h1 className={styles.productName}>{product.name}</h1>
                {/* <h4 style={{marginTop:'1rem',opacity:"0.7"}}>{product.description}</h4> */}
                <div className={styles.reviewStar}>
                  <span><Rating product={product}/></span>
                  <span>({product?.reviews?.length}+ review )</span>
                  {product.quantity > 0 ? <span className={styles.stock}>in stock</span> : <span className={styles.outofstock}>out of Stock</span>}
                </div>
                  {product.quantity <= 20 && <p className={styles.leftItems}>Only {product.quantity} left!</p>}
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

              <div className={styles.aboutProduct}>
                <div className={styles.tabs}>
                  <button className={isDescription ? styles.active : ""} onClick={() => setIsDescription(true)} >Description</button>
                  <button onClick={() => setIsDescription(false)} className={!isDescription ? styles.active : ""}>Ingrediants</ button>
                </div>
              {isDescription ? <p>{product?.description}</p> : product?.ingredients.map((e,idx) => <span key={idx}>{e}{" , "}</span>)}
              </div>

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

