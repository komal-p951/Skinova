import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import {
  CircleUser,
  Heart,
  Plus,
  ShoppingCart,
  Search,
  Package,
  LayoutDashboard,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    try {
      const data = jwtDecode(token);

      if (data.role === "author") {
        setIsOwner(true);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }, [token]);

  return (
    <nav className={styles.navbar}>

      <div className={styles.topNav}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          Skinova
        </div>

        <div
          className={styles.searchBox}
          onClick={() => router.push("/search")}
        >
          <Search size={18} />
          <input
            type="text"
            placeholder="Search Skinova products..."
            readOnly
          />
        </div>

        {isLoggedIn ? <>
        <div className={styles.icons}>
          {isOwner && (
            <>
            <button 
            className={styles.mobileAddBtn}
            onClick={() => router.push("/authorDashboard")}
            ><LayoutDashboard size={20} /><span>Dashboard</span></button>
            </>
          )}

          <span onClick={() => router.push("/wishlist")}><Heart /></span>
          <span onClick={() => router.push("/cart")} ><ShoppingCart /></span>
          <span onClick={() => router.push("/profile")} ><CircleUser /></span>
        </div>
        </> : <div className={styles.login} onClick={() => router.push("/login")}> Login </div>
        }
      </div>

      <div className={styles.categoryBar}>
        <span onClick={() => router.push("/")}>All</span>

        <span onClick={() => router.push(`/category/${"Skincare"}`)}>Skincare</span>

        <span onClick={() => router.push(`/category/${"Makeup"}`)}>Makeup</span>

        <span onClick={() => router.push(`/category/${"Haircare"}`)}>Haircare</span>

        <span onClick={() => router.push(`/category/${"Fragrance"}`)}>Fragrance</span>

        <span onClick={() => router.push(`/category/${"Bath & Body"}`)}>Bath&nbsp;&&nbsp;Body</span>

        <span onClick={() => router.push(`/category/${"Tools & Accessories"}`)}>Tools&nbsp;&&nbsp;Accessories</span>

        <span onClick={() => router.push(`/category/${"Supplements"}`)}>Supplements</span>
      </div>
    </nav>
  );
}