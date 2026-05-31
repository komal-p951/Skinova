import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import styles from "./styles.module.css";
import Image from "next/image";
export default function Navbar() {
  
  return (
    <div>
        {/* <CiMenuBurger /> Navbar */}
      <nav className={styles.navbar}>
        <div><Image src="/logo2.png" height={100} width={200} alt="logoimage"></Image> </div>
        <div className={styles.right}>
        <div className={styles.login}>Login</div> 
        <div className={styles.nav_ico}>AI</div>
        </div>
      </nav>
    </div>
  );
}
