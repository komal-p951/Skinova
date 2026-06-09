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
  
  useEffect(() => {

    if(!id)return;

    let fetchdata = async()=> {

      let response = await clientServer.get(`/${id}`);

      // console.log("id is => ", id);
      setProduct(response.data);
    }
    fetchdata();
  },[id]);

  let originalPrice = Math.round(product.price*1.15);

  let price = product?.price;

  let totalReviewRatingCount = product?.reviews?.reduce((acc,review) => acc + review.rating,0);

  const avgRating = product?.reviews?.length > 0 ? totalReviewRatingCount/product?.reviews?.length : 0;
  // console.log(avgRating.toFixed(1));

  console.log(product.reviews)

  return (
    <DashboardLayout>
      
        <div className={styles.mainContainer}>
          <div className={styles.mainTopContainer}>

            <div className={styles.discount}><img src="/images/bar.jpeg" alt="" /></div>
            <div className={styles.path}>
              <span onClick={(e) => {
                e.preventDefault();
                router.push("/")
              }} style={{cursor:"pointer"}}>Home</span> /
              <span style={{cursor:"pointer"}}>{product.category
}</span> / 
              <span style={{cursor:"pointer"}}>{product.brand}</span> / 
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

          <div className={styles.mainReviewContainer}>
            <div className={styles.reviewName}>Ratings & Reviews</div>
            <div className={styles.reviewsContainer}>
              <div className={styles.averageReviews}>
                <div className={styles.first}>
                <span>{avgRating.toFixed(1)}</span>
                  <div>
                    {[...Array(5)].map((_,i) => 
                    i < avgRating ? (
                      <FaStar key={i}/>
                    ) :
                    (
                      <FaRegStar key={i}/>
                    ))}
                  </div>
                  <p>based on {product?.reviews?.length} reviews</p>
                </div>
                <div className={styles.second}>
                </div>
              </div>
              <div className={styles.allReviews}>
                {product?.reviews?.map((review) => <ReviewCard key={review._id} review={review}></ReviewCard>)}
              </div>
            </div>
          </div>

          {/* <ReviewCard/> */}
        </div>
    </DashboardLayout>
  );
}
// (console.log("comment = ",review.comment,"rating = ",review.rating))
export default Product;



                {/* <div>
                  <h3>Quantity</h3>

                  <div>
                    
                  </div>
                </div> */}

                
              {/* <div className={styles.addWishListIcon}></div>
              <div className={styles.productDetail}></div>
              <div className={styles.addTocartIcon}></div> */}





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







  
{/* <div className={styles.container}> */}
        {/* Breadcrumb */}
        {/* <div className={styles.breadcrumb}>
          <span onClick={() => router.push('/')}>Home</span>
          <span>/</span>
          <span onClick={() => router.push('/products')}>Products</span>
          <span>/</span> */}
          {/* *************** when we click on this, we entered in category products which have same category   ***************** */}
          {/* <span>{product.category}</span>
          <span>/</span>
          <span>{product.name}</span>
        </div> */}

        {/* <div className={styles.productWrapper}> */}
          {/* Left Section - Images */}
          {/* <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img
                src="/images/bathbody1.jpg"
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.discountBadge}>{discount}% OFF</div>
            </div> */}

            {/* Thumbnail Images */}
            {/* <div className={styles.thumbnails}>
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.active : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src="/images/bathbody1.jpg" alt={`View ${index + 1}`} />
                </div>
              ))}
            </div>
          </div> */}

          {/* Right Section - Details */}
          {/* <div className={styles.detailsSection}> */}
            {/* Header */}
            {/* <div className={styles.header}>
              <div className={styles.brandCategory}>
                <span className={styles.brand}>{product.brand}</span>
                <span className={styles.category}>{product.category}</span>
              </div>
              <button
                className={`${styles.wishlistBtn} ${
                  isWishlisted ? styles.wishlisted : ''
                }`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  size={24}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                />
              </button>
            </div> */}

            {/* Title */}
            {/* <h1 className={styles.title}>{product.name}</h1> */}

            {/* Rating */}
            {/* <div className={styles.ratingSection}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="#FFB800"
                    color="#FFB800"
                    className={styles.star}
                  />
                ))}
              </div>
              <span className={styles.reviewCount}>(128 Reviews)</span>
              <span className={styles.inStock}>In Stock</span>
            </div> */}

            {/* Price */}
            {/* <div className={styles.priceSection}>
              <span className={styles.currentPrice}>₹{product.price}</span>
              <span className={styles.originalPrice}>₹{originalPrice}</span>
              <span className={styles.savings}>You save ₹{originalPrice - product.price}</span>
            </div> */}

            {/* Description */}
            {/* <p className={styles.description}>{product.description}</p> */}

            {/* Ingredients */}
            {/* {product.ingredients && product.ingredients.length > 0 && (
              <div className={styles.ingredientsSection}>
                <h3 className={styles.sectionTitle}>Key Ingredients</h3>
                <div className={styles.ingredientsList}>
                  {product.ingredients.slice(0, 5).map((ingredient, index) => (
                    <span key={index} className={styles.ingredientTag}>
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )} */}

            {/* Quantity & Action Buttons */}
            {/* <div className={styles.actionSection}>
              <div className={styles.quantityControl}>
                <label>Quantity:</label>
                <div className={styles.quantitySelector}>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className={styles.quantityBtn}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className={styles.quantityInput}
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div> */}

              {/* Add to Cart Button */}
              {/* <button
                className={`${styles.addToCartBtn} ${
                  isAdded ? styles.addedState : ''
                }`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check size={20} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div> */}

            {/* Benefits/Features */}
            {/* <div className={styles.benefits}>
              <div className={styles.benefit}>
                <Check size={20} />
                <span>100% Authentic</span>
              </div>
              <div className={styles.benefit}>
                <Check size={20} />
                <span>Free Shipping on orders above ₹500</span>
              </div>
              <div className={styles.benefit}>
                <Check size={20} />
                <span>Easy Returns within 14 days</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Reviews Section */}
        {/* <div className={styles.reviewsSection}>
          <div className={styles.reviewsHeader}>
            <h2>Customer Reviews</h2>
            <button className={styles.writeReviewBtn}>Write a Review</button>
          </div>

          <div className={styles.reviewsContainer}>
            <div className={styles.ratingOverview}>
              <div className={styles.overallRating}>
                <div className={styles.rating}>4.5</div>
                <div className={styles.ratingText}>Based on 128 reviews</div>
              </div>

              <div className={styles.ratingBreakdown}>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className={styles.ratingRow}>
                    <span className={styles.starLabel}>{stars} ★</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{
                          width: `${(stars === 5 ? 70 : stars === 4 ? 20 : 5) + '%'}`,
                        }}
                      ></div>
                    </div>
                    <span className={styles.percentage}>
                      {stars === 5 ? '70' : stars === 4 ? '20' : '5'}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.reviewsList}>
              <ReviewCard
                reviewer="Sarah M."
                rating={5}
                date="2 days ago"
                title="Absolutely Amazing!"
                comment="This product has completely transformed my skincare routine. Highly recommended!"
              />
              <ReviewCard
                reviewer="John D."
                rating={4}
                date="1 week ago"
                title="Great Quality"
                comment="Very happy with my purchase. Good packaging and fast delivery."
              />
              <ReviewCard
                reviewer="Emma L."
                rating={5}
                date="2 weeks ago"
                title="Best Purchase Ever"
                comment="Worth every penny. Results are visible within a week of use."
              />
            </div>
          </div>
        </div> */}

        {/* Related Products Section */}
        {/* <div className={styles.relatedSection}>
          <h2>Related Products</h2>
          <div className={styles.relatedGrid}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={styles.relatedCard}>
                <img src="/images/bathbody1.jpg" alt={`Related ${item}`} />
                <p className={styles.relatedName}>Related Product {item}</p>
                <p className={styles.relatedPrice}>₹1,299</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}