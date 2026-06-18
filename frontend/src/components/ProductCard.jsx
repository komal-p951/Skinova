import React, { useEffect } from 'react'
import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Heart } from 'lucide-react';

export default function ProductCard({product}) {
  useEffect(() => {
    [...document.querySelectorAll('*')].forEach(el => {
  if (el.offsetWidth > window.innerWidth) {
    console.log(el, el.offsetWidth);
  }
});
  },[]);

  const router = useRouter();

  const viewProductDetail = (id) => {
    router.push(`/product/${id}`);
  };


  let totalReviewRatingCount = product?.reviews?.reduce((acc,review) => acc + review.rating,0);
  
  const reviewlength = product?.reviews?.length;

  const avgRating = product?.reviews?.length > 0 ? totalReviewRatingCount/reviewlength : 0;

  return (
    <>
      <div 
        className={styles.productCard}
        onClick={() => viewProductDetail(product._id)}
      >
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <img src="/images/bathbody1.jpg" alt={product.name} />
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div className={styles.badge}>New</div>
            <div className={styles.like}> <Heart /> </div>
            </div>
        </div>

        <div className={styles.content} >
          
          <p className={styles.brand}>{product.brand}</p>
          
          <h3 className={styles.productName}>{product.name}</h3>

          <div className={styles.rating}>
            <span className={styles.stars}>
              <div>
                {[...Array(5)].map((_,i) => 
                i < avgRating ? (
                  <FaStar key={i} color='#a3748b'/>
                ) :
                (
                  <FaRegStar key={i} color='gray'/>
                ))}
              </div>
            </span>
            <span className={styles.reviews}>({reviewlength} reviews)</span>
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.price}>₹{product.price}</span>
            <span className={styles.originalPrice}>₹{Math.round(product.price * 1.15)}</span>
            <span className={styles.discount}>-15%</span>
          </div>

          <p className={styles.description}>Premium skincare product</p>
        </div>
      </div>
    </>
  )
}



 {/* {isHovered && (
            <div className={styles.overlay}>
              <button 
                className={`${styles.addToCartBtn} ${isAdded ? styles.added : ''}`}
                onClick={() => viewProductDetail(product._id)}
              >
                {isAdded ? ' ' : 'view Product'}
              </button>
            </div>
          )} */}