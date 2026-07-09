import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import {
  CircleUser,
  Heart,
  Plus,
  ShoppingCart,
  EllipsisVertical,
  Search
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
      console.log(err.message);
    }
  }, [token]);

  return (
    <nav className={styles.navbar}>

      <div
        className={styles.logo}
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      >
        skinova
      </div>

      <div className={styles.desktopMenu}>
        {isLoggedIn ? (
          <>
            <div className={styles.search} onClick={() => router.push("/search")}>
              <span><input placeholder="search here" className={styles.searchInput} type="text"/> <Search height={16} width={16} /></span>
            </div>
            {isOwner && (
              <div
              className={styles.addproductbtn}
              onClick={() => router.push("/addProduct")}
              >
                <Plus size={18} />
                Add Product
              </div>
            )}

            <span onClick={() => router.push("/profile")}>
              <CircleUser />
            </span>

            <span onClick={() => router.push("/cart")}>
              <ShoppingCart />
            </span>

            <span onClick={() => router.push("/wishlist")}>
              <Heart />
            </span>
          </>
        ) : (
          <div
            className={styles.login}
            onClick={() => router.push("/login")}
          >
            Login
          </div>
        )}
      </div>

      <div
        className={styles.mobileMenu}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <EllipsisVertical />
      </div>

      {openMenu && (
        <div className={styles.dropdown}>

          {isLoggedIn ? (
            <>
              {isOwner && (
                <div
                  onClick={() => {
                    router.push("/addProduct");
                    setOpenMenu(false);
                  }}
                >
                 <Plus /> Add Product
                </div>
              )}

              <div
                onClick={() => {
                  router.push("/profile");
                  setOpenMenu(false);
                }}
              >
               <CircleUser /> Profile
              </div>

              <div
                onClick={() => {
                  router.push("/cart");
                  setOpenMenu(false);
                }}
              >
                <ShoppingCart /> Cart
              </div>

              <div
                onClick={() => {
                  router.push("/wishlist");
                  setOpenMenu(false);
                }}
              >
                 <Heart /> Wishlist
              </div>
            </>
          ) : (
            <div
              onClick={() => {
                router.push("/login");
                setOpenMenu(false);
              }}
            >
              Login
            </div>
          )}

        </div>
      )}

    </nav>
  );
}