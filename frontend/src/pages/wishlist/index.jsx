import DashboardLayout from "@/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ChevronRight, Dot, Heart, ShoppingBag, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { clientServer } from "@/index";

function WishList() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const storedtoken = localStorage.getItem("token");
    if (storedtoken) {
      setToken(storedtoken);
    } else {
      router.push("/login");
    }
  },[]);

  const fetchdata = async () => {
    try {
      const res = await clientServer.get("/wishlist", {
        headers: {
          Authorization: token,
        },
      });
      setUserData(res.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [token]);

  const addToCart = async(productId) => {
    try {
      let res = await clientServer.post(`/cart/${productId}`,{},{
        headers:{
          Authorization:token
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  const removeFromWishList = async(productId) => {
    try {
      let res = await clientServer.delete(`wishlist/${productId}`,{
        headers:{
          Authorization:token
        }
      });
      fetchdata();
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DashboardLayout>
      <div className={styles.mainContainer}>
        <h1>My Wishlist</h1>
        <div style={{color:"#0000008f",display:"flex",alignItems:"center"}}>
          <span>Home</span> <ChevronRight /> <span>wishlist</span>
        </div>

        {userData.length == 0 && <div className={styles.wishlistCardMessage}><span>Your List is Empty </span></div>}
        {userData.length > 0 && <div>
          <div className={styles.headBar}>
          <div className={styles.headLeft}>
            <Heart color="red" fill="#e4122f"/>
            <div className={styles.subheading}>
              <span>Your favorite skincare essentials</span>
              <h5>saved for later</h5>
            </div>
          </div>
          <div className={styles.headButton}>
            <ShoppingBag /> Move All to Cart
          </div>
        </div>

        <div className={styles.cardsContainer}>
          {userData?.map((product) => (

            <div className={styles.card} key={product._id} onClick={() => router.push(`/product/${product._id}`)}>
              <div className={styles.imageContainer}>
                {product?.images?.[0] && <img src={product?.images?.[0].url}/>}
              </div>

              <div className={styles.productDetail}>
                <h3>{product?.name}</h3>
                <p>₹{product?.price} </p>

                <p className={styles.stock}>
                  <span className={styles.dot}></span> inStock
                </p>

                <div className={styles.buttonsBar}>
                  <button className={styles.cartBtn} onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product._id)}}>
                    <ShoppingBag />
                    Add to Cart
                  </button>
                  <button className={styles.trash} onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishList(product._id);
                  }}>remove
                    <TrashIcon />
                  </button>
                </div>
              </div>

            </div>

          ))}

        </div>
          </div>}

      </div>
      
    </DashboardLayout>
  );
}

export default WishList;
