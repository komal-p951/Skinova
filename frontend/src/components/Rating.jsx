import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';

export default function Rating({product}) {

    let totalReviewRatingCount = product?.reviews?.reduce((acc,review) => acc + review.rating,0);
  
  const reviewlength = product?.reviews?.length;

  const avgRating = reviewlength > 0 ? totalReviewRatingCount/reviewlength : 0;

  return (
    <div>
        {[...Array(5)].map((_,i) => 
            i < avgRating ? (
            <FaStar key={i} color='#a3748b'/>
            ) :
            (
            <FaRegStar key={i} color='gray'/>
        ))}
    </div>
  )
}
