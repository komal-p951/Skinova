import React from 'react'
import styles from './style.module.css';

export default function ProductCard({product}) {
  return (
    <>
      <div className={styles.prod}>
      <img src="/images/bathbody1.jpg" alt="" height={400} width={400}/>
        <h1>{product.name}</h1>
        <p>{product.brand}</p>
        <p>{product.price}</p>
      </div>
    </>
  )
}
