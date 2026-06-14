import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { CircleUser, Heart, Plus, ShoppingCart } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { clientServer } from "@/index";

export default function Navbar() {
  const [isloggedIn,setIsloggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isOwner ,setIsOwner] = useState(false);
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
    if(token){
      try {
        let data = jwtDecode(token);
        if(data.role === 'author'){
          setIsOwner(true);
        } 
      } catch (error) {
        console.log(error.message);
      }
    }
  },[token]);


{/* <Image src="/skinova.png" height={100} width={200} alt="logoimage" loading="eager"></Image> */}
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>skinova</div>
        <div className={styles.right}>
        {isloggedIn ? 
        <>
          {isOwner && <div onClick={() => router.push("/addProduct")} className={styles.addproductbtn} style={{cursor:"pointer"}}><Plus />Add New Product</div>}
           <span onClick={() => router.push("/profile")} style={{cursor:"pointer"}}><CircleUser/></span>
           <span onClick={()=> router.push("/cart")} style={{cursor:"pointer"}}><ShoppingCart /> </span>
           <span onClick={() => router.push("/wishlist")} style={{cursor:"pointer"}}><Heart /></span>
        </> 
        : 
        <div className={styles.login} onClick={() => {
          router.push("/login");
        }}>Login</div>
        }
        {/* <div className={styles.nav_ico}>AI</div> */}
        </div>
      </nav>
    </div>
  );
}
