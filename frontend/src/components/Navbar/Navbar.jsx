import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isloggedIn,setIsloggedIn] = useState(false);
  const router = useRouter();
  return (
    <div>
      <nav className={styles.navbar}>
        <div><Image src="/logo2.png" height={100} width={200} alt="logoimage" loading="eager"></Image></div>
        <div className={styles.right}>
        {isloggedIn ? <div>hii</div> : <div className={styles.login} onClick={() => {
          router.push("/login");
        }}>Login</div>}
        <div className={styles.nav_ico}>AI</div>
        </div>
      </nav>
    </div>
  );
}
