import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import {
  CircleUser,
  Heart,
  Plus,
  ShoppingCart,
  Search,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  // const [openMenu, setOpenMenu] = useState(false);

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
            <button
              className={styles.mobileAddBtn}
              onClick={() => router.push("/addProduct")}
            >
              <Plus size={18} />
              <span>Add</span>
            </button>
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

// <nav className={styles.navbar}>

//   <div
//     className={styles.logo}
//     onClick={() => router.push("/")}
//     style={{ cursor: "pointer" }}
//   >
//     skinova
//   </div>

//   <div className={styles.search} onClick={() => router.push("/search")}>
//     <span><input placeholder="search here" className={styles.searchInput} type="text"/> <Search height={16} width={16} /></span>
//   </div>
//   <div className={styles.desktopMenu}>
//     {isLoggedIn ? (
//       <>
//         {isOwner && (
//           <div
//           className={styles.addproductbtn}
//           onClick={() => router.push("/addProduct")}
//           >
//             <Plus size={18} />
//             Add Product
//           </div>
//         )}

//         <span onClick={() => router.push("/profile")}>
//           <CircleUser />
//         </span>

//         <span onClick={() => router.push("/cart")}>
//           <ShoppingCart />
//         </span>

//         <span onClick={() => router.push("/wishlist")}>
//           <Heart />
//         </span>
//       </>
//     ) : (
//       <div
//         className={styles.login}
//         onClick={() => router.push("/login")}
//       >
//         Login
//       </div>
//     )}
//   </div>
//   <div
//     className={styles.mobileMenu}
//     onClick={() => setOpenMenu(!openMenu)}
//   >
//     <EllipsisVertical />
//   </div>
//   <span>filter</span>

//   {openMenu && (
//     <div className={styles.dropdown}>

//       {isLoggedIn ? (
//         <>
//           {isOwner && (
//             <div
//               onClick={() => {
//                 router.push("/addProduct");
//                 setOpenMenu(false);
//               }}
//             >
//              <Plus /> Add Product
//             </div>
//           )}

//           <div
//             onClick={() => {
//               router.push("/profile");
//               setOpenMenu(false);
//             }}
//           >
//            <CircleUser /> Profile
//           </div>

//           <div
//             onClick={() => {
//               router.push("/cart");
//               setOpenMenu(false);
//             }}
//           >
//             <ShoppingCart /> Cart
//           </div>

//           <div
//             onClick={() => {
//               router.push("/wishlist");
//               setOpenMenu(false);
//             }}
//           >
//              <Heart /> Wishlist
//           </div>
//         </>
//       ) : (
//         <div
//           onClick={() => {
//             router.push("/login");
//             setOpenMenu(false);
//           }}
//         >
//           Login
//         </div>
//       )}

//     </div>
//   )}

// </nav>