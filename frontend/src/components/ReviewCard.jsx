import React, { useEffect, useState } from 'react';
import { BadgeCheck, EllipsisVertical, Pencil, Star, Trash } from 'lucide-react';
import styles from './style.module.css';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { clientServer } from '..';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

export default function ReviewCard({reviews,fetchReviews}) {
  const [open,setOpen] = useState(false);
  const[token,setToken] = useState("");
  const router = useRouter();
  const [userId,setUserId] = useState("");
  const[reviewdata,setReviewdata] = useState({
    rating:1,
    comment:""
  });
  const [isOwner, setIsOwner] = useState(false);
 
  useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
  }
}, []);

useEffect(() => {
  if (token) {
    try {
      let data = jwtDecode(token);
      console.log(data);
      const role = data.role;
      if(role == "author"){
        setIsOwner(true);
      }
      setUserId(data.id);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }
}, [token]);



  const handlesubmit = async() => {
    try {
      const id = router.query.id;

      let res = await clientServer.post(`/reviews/${id}`, {
        rating:reviewdata.rating,
        comment:reviewdata.comment
      }, {
        headers: {
          Authorization: token
        }
      });
      setReviewdata({
        rating:1,
        comment:""
      });
      fetchReviews();
      setOpen(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  const handleDeleteReview = async(reviewId) => {
    try {
      const productId = router.query.id;

      let res = await clientServer.delete(`/reviews/${productId}/${reviewId}`,{
        headers: {
          Authorization: token
        }
      })
      fetchReviews();

    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  let totalReviewRatingCount = reviews?.reduce((acc,review) => acc + review.rating,0);

  const avgRating = reviews?.length > 0 ? totalReviewRatingCount/reviews?.length : 0;

  const fiveStarsRatings = reviews?.filter(review => review.rating === 5)?.length;
  const fourStarsRatings = reviews?.filter(review => review.rating === 4)?.length;
  const threeStarsRatings = reviews?.filter(review => review.rating === 3)?.length;
  const twoStarsRatings = reviews?.filter(review => review.rating === 2)?.length;
  const oneStarsRatings = reviews?.filter(review => review.rating === 1)?.length;
  const totalReviews = reviews?.length;

  function formatDate (dateString) {
    let now = Date.now();
    let past = new Date(dateString);
    let diff = Math.floor((now - past) / (1000 * 60 * 60 * 24))
    if(diff < 1) return "Today";
    else if(diff > 1 &&diff < 7) return `${diff} Days ago`;
    else if(diff >= 7 && diff < 30) return `${Math.floor(diff/7)} Weeks ago`;
    else if(diff >= 30 && diff < 365) return `${Math.floor(diff/30)} Months ago`;
    else return `${Math.floor(diff/365)} Years ago`;
  }


  return (
    <div className={styles.reviewContainer}>
      <div className={styles.topContainer}>
        <div className={styles.reviewLeftBox}>
          <h1>Customer Reviews </h1>
          <p>real reviews from our happy customers</p>
        </div>

        <hr className={styles.hr}/>
        <div className={styles.reviewProgressCard}>
          <div className={styles.avgReview}>
            <p className={styles.avgRating}>{avgRating.toFixed(1)}</p>
            <div>
            {[...Array(5)].map((_,i) => 
            i < avgRating ? (
              <FaStar key={i} color='#a3748b'/>
            ) :
            (
              <FaRegStar key={i} color='grey'/>
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
        {token && <div className={styles.reviewAddBtn} onClick={() => 
          setOpen(true)}><Pencil/>write a Review</div>}

        {open &&  (
          <div className={styles.overlay} onClick={() => {
            setOpen(false);
          }}>
            <div onClick={(e) => e.stopPropagation()} className={styles.commentContainer}>
              <div className={styles.addreview}>
                <div className={styles.heading}>
                  <h2>Write a Review</h2>
                  <p>Share your experience with this product</p>
                </div>
                <div className={styles.writereview}>
                  
                  <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={25}
                      onClick={() => setReviewdata({...reviewdata,rating:star})}
                      style={{ cursor: "pointer", marginRight: "5px" }}
                      color={star <= reviewdata.rating ? "#a3748b" : "#d3d3d3"}
                    />
                  ))}

                </div>

                  <label htmlFor="review">Your Review</label>
                  <textarea rows={8} cols={5} type="text" id='review' placeholder='write your review here' value={reviewdata.comment} onChange={(e) => {
                    setReviewdata({
                      ...reviewdata,
                      comment:e.target.value
                    })
                  }}/>
                </div>
                <div className={styles.addreviewbtn} onClick={handlesubmit}>add review</div>
              </div>
            </div>
          </div> 
        )}

      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.allReviews}>
          {reviews?.map((review) => (
            <div key={review._id} className={styles.reviewCard} >
              <div className={styles.reviewCardhead}>
                <p className={styles.username}>{review?.user?.fullname.slice(0,1).toUpperCase()}</p>

                <div className={styles.userDetail}>
                  <p style={{fontSize:"1.3rem"}}>{review?.user?.fullname}</p>
                  <p style={{opacity:"0.6"}}>{formatDate(review?.createdAt)}</p>
                </div>

                {(userId === review?.user?._id || isOwner) &&  <div style={{marginLeft:"1.5rem",color:"#c1586a",cursor:"pointer"}} onClick={() => handleDeleteReview(review._id)}><Trash /></div>}

              </div>
              <div className={styles.reviewStar}>
                {[...Array(5)].map((_,i) => 
                i < review?.rating ? (
                  <FaStar color='#a3748b' key={i}/>
                ) : (
                  <FaRegStar color='grey' key={i}/>
                ))}
              </div>
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
