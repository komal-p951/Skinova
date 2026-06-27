import React, { useEffect, useState } from 'react'
import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Heart } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import Rating from './Rating';
import { clientServer } from '..';

export default function ProductCard({product}) {
  const [isAdded, setIsAdded] = useState(false);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [user, setUser] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if(storedToken){
      setToken(storedToken);
      setIsloggedIn(true);
    }else{
      setIsloggedIn(false);
    }
  },[]);

  useEffect(() => {
    const fetchdata = async() => {
      try {
      let res = await clientServer.get("/wishlist",{
        headers:{
          Authorization:token
        }
      });
      const exists = res.data.some((item) => item._id === product._id);
      if(exists){
        setIsAdded(exists);
      }
      } catch (error) {
        console.log(error);
      }
    }
    if(token){
      fetchdata();
    }
  },[token,product._id]);


  
  const addToWishList = async(e) => {
    e.stopPropagation();
    try {
      if(!token){
        router.push("/login");
      }
      let res = await clientServer.post(`/wishlist/${product._id}`,{},{
        headers: {
          Authorization: token
        }
      });
      
      setIsAdded(true);

    } catch (error) {
      console.log(error);
    }
  }

  const deleteFromwishList = async(e) => {
    e.stopPropagation();
    try {
      let res = await clientServer.delete(`/wishlist/${product._id}`,{
        headers: {
          Authorization:token
        }
      });
      setIsAdded(false);
    } catch (error) {
      console.log(error);
    }
  }


  const viewProductDetail = (id) => {
    router.push(`/product/${id}`);
  };



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
            <div onClick={isAdded ? deleteFromwishList : addToWishList} className={isAdded ? styles.liked : styles.like}> <Heart /> </div>
            </div>
        </div>

        <div className={styles.content} >
          
          <p className={styles.brand}>{product.brand}</p>
          
          <h3 className={styles.productName}>{product.name}</h3>

          <div className={styles.rating}>
            <span className={styles.stars}>
              <Rating product={product}/>
            </span>
            <span className={styles.reviews}>({product?.reviews?.length} reviews)</span>
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.price}>₹{product.price}</span>
            <span className={styles.originalPrice}>₹{Math.round(product.price * 1.15)}</span>
            <span className={styles.discount}>-15%</span>
          </div>

          {/* <p className={styles.description}>{product?.description}</p> */}
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