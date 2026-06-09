import React from 'react';
import { Star } from 'lucide-react';
import styles from './style.module.css';
import { FaRegStar, FaStar } from 'react-icons/fa';


export default function ReviewCard({review}) {
  return (
    <>
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
      {review.user.fullname}
      </div>
      <p>{review.comment}</p>
      <p>{[...Array(5)].map((_,i) => 
        i < review.rating ? (
          <FaStar key={i}/>
        ) : (
          <FaRegStar key={i}/>
        )
      )}</p>
    </div>
    </>
  );
}
