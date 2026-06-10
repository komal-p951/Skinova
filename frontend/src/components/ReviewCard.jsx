import React from 'react';
import { BadgeCheck, Pencil, Star } from 'lucide-react';
import styles from './style.module.css';
import { FaRegStar, FaStar } from 'react-icons/fa';


export default function ReviewCard({reviews}) {
console.log(reviews);

  let totalReviewRatingCount = reviews?.reduce((acc,review) => acc + review.rating,0);

  const avgRating = reviews?.length > 0 ? totalReviewRatingCount/reviews?.length : 0;

  const fiveStarsRatings = reviews?.filter((review) => review.rating === 5).length;
  const fourStarsRatings = reviews?.filter((review) => review.rating === 4).length;
  const threeStarsRatings = reviews?.filter((review) => review.rating === 3).length;
  const twoStarsRatings = reviews?.filter((review) => review.rating === 2).length;
  const oneStarsRatings = reviews?.filter((review) => review.rating === 1).length;
  const totalReviews = reviews?.length;

  function formatDate (dateString) {
    let now = Date.now();
    let past = new Date(dateString);
    let diff = Math.floor((now - past) / (1000 * 60 * 60 * 24))
    return `${diff} Days ago`;
  }
  console.log(formatDate("2026-05-28T08:07:43.309Z"))

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.topContainer}>
        <div className={styles.reviewLeftBox}>
          <h1>Customer Reviews </h1>
          <p>real reviews from our happy customers</p>
        </div>

        <hr />
        <div className={styles.reviewProgressCard}>
          <div className={styles.avgReview}>
            <p className={styles.avgRating}>{avgRating.toFixed(1)}</p>
            <div>
            {[...Array(5)].map((_,i) => 
            i < avgRating ? (
              <FaStar key={i} color='#a3748b'/>
            ) :
            (
              <FaRegStar key={i} color='gray'/>
            ))}
            </div>
            <p>based on {reviews?.length} reviews</p>
          </div>
          <div className={styles.reviewProgressBar}>
          <span>5 stars <progress className={styles.progress} value={(fiveStarsRatings / totalReviews) * 100} max={100} /></span>
          <span>4 stars <progress className={styles.progress} value={(fourStarsRatings / totalReviews) * 100} max={100}/></span>
          <span>3 stars <progress className={styles.progress} value={(threeStarsRatings / totalReviews) * 100} max={100}/></span>
          <span>2 stars <progress className={styles.progress} value={(twoStarsRatings / totalReviews) * 100} max={100}/></span>
          <span>1 stars <progress className={styles.progress} value={(oneStarsRatings / totalReviews) * 100} max={100}/></span>  
          </div>

        </div>
        <div className={styles.reviewAddBtn}><Pencil/>write a Review</div>

      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.allReviews}>
          {reviews?.map((review) => (
            <div className={styles.reviewCard}>
              <div className={styles.reviewCardhead}>
                <p className={styles.username}>{review?.user?.fullname.slice(0,1).toUpperCase()}</p>

                <div className={styles.userDetail}>
                  <p style={{fontSize:"1.3rem"}}>{review?.user?.fullname}</p>
                  <p style={{opacity:"0.6"}}>{formatDate(review?.createdAt)}</p>
                </div>

              </div>
              <div className={styles.reviewStar}>⭐⭐⭐⭐⭐</div>
              <div className={styles.reviewCardbody}>

                <p>{review?.comment}</p>

                <div className={styles.badges}>
                  <BadgeCheck /> verified Purchase
                </div>

              </div>
            </div>
            
          ))} 
        </div>
      </div>
    </div>
  );
}
