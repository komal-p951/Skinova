import React, { useState } from 'react'
import styles from './style.module.css';
import { useRouter } from 'next/navigation';

export default function ProductCard({product}) {
  [...document.querySelectorAll('*')].forEach(el => {
  if (el.offsetWidth > window.innerWidth) {
    console.log(el, el.offsetWidth);
  }
});
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  const viewProductDetail = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <>
      <div 
        className={styles.productCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <img src="/images/bathbody1.jpg" alt={product.name} />
          {isHovered && (
            <div className={styles.overlay}>
              <button 
                className={`${styles.addToCartBtn} ${isAdded ? styles.added : ''}`}
                onClick={() => viewProductDetail(product._id)}
              >
                {isAdded ? ' ' : 'view Product'}
              </button>
            </div>
          )}
          <div className={styles.badge}>New</div>
        </div>

        {/* Content Container */}
        <div className={styles.content}>
          {/* Brand */}
          <p className={styles.brand}>{product.brand}</p>

          {/* Product Name */}
          <h3 className={styles.productName}>{product.name}</h3>

          {/* Rating */}
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.reviews}>(120 reviews)</span>
          </div>

          {/* Price Section */}
          <div className={styles.priceContainer}>
            <span className={styles.price}>₹{product.price}</span>
            <span className={styles.originalPrice}>₹{Math.round(product.price * 1.15)}</span>
            <span className={styles.discount}>-15%</span>
          </div>

          {/* Quick Info */}
          <p className={styles.description}>Premium skincare product</p>
        </div>
      </div>
    </>
  )
}