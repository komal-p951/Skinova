import DashboardLayout from '@/layout/DashboardLayout';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { clientServer } from '@/index';
import { Heart, ShoppingCart, Star, Check, Plus, Minus } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import { FaRegStar, FaStar } from 'react-icons/fa';


function Product() {
  let [count,setCount] = useState(1);
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;
  
  
  let fetchdata = async()=> {

    if(!id)return;
    let response = await clientServer.get(`/${id}`);
    setProduct(response.data);

  }
  useEffect(() => {
    fetchdata();
  },[id]);

  let originalPrice = Math.round(product.price*1.15);

  let price = product?.price;

  return (
    <DashboardLayout>
      
        <div className={styles.mainContainer}>
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
                  <span className={styles.price}>₹{product.price}</span>
                  <span className={styles.originalPrice}>₹{Math.round(product.price * 1.15)}</span>
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
          </div>
        </div>
    </DashboardLayout>
  );
}
export default Product;




// const router = useRouter();
//   const { id } = router.query;
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isAdded, setIsAdded] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await clientServer.get(`/${id}`);
//         setProduct(response.data);
//         console.log('Product data:', response.data);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     setIsAdded(true);
//     setTimeout(() => setIsAdded(false), 2000);
//   };

//   const handleQuantityChange = (delta) => {
//     setQuantity(Math.max(1, quantity + delta));
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className={styles.loadingContainer}>
//           <div className={styles.spinner}></div>
//           <p>Loading product details...</p>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (!product) {
//     return (
//       <DashboardLayout>
//         <div className={styles.errorContainer}>
//           <p>Product not found</p>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const discount = 15;
//   const originalPrice = Math.round(product.price * 1.15);
