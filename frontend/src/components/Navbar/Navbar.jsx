import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleUser, Heart, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isloggedIn,setIsloggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      setIsloggedIn(true);
    }else{
      setIsloggedIn(false);
    }
  },[]);
{/* <Image src="/skinova.png" height={100} width={200} alt="logoimage" loading="eager"></Image> */}
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>skinova</div>
        <div className={styles.right}>
        {isloggedIn ? 
        <>
           <span onClick={() => router.push("/profile")}><CircleUser/></span>
           <span onClick={()=> router.push("/cart")}><ShoppingCart /> </span>
           <span onClick={() => router.push("/wishlist")}><Heart /></span>
        </> 
        : 
        <div className={styles.login} onClick={() => {
          router.push("/login");
        }}>Login</div>
        }
        <div className={styles.nav_ico}>AI</div>
        </div>
      </nav>
    </div>
  );
}
