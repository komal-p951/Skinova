import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Search, Clock3, TrendingUp, MoveUpLeft } from "lucide-react";
import DashboardLayout from "@/layout/DashboardLayout";
import Loader from "@/components/Loader/Loader";
import { clientServer } from "@/index";
import Rating from "@/components/Rating";
import { useRouter } from "next/router";

export default function Index() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const router = useRouter();


   const product = async () => {
      
      try {
        const products = await clientServer.get("/");
        setProducts(products.data);
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    };


  useEffect(() => {
    product();
  }, []);


   if(loading) {
    return <DashboardLayout> <Loader/> </DashboardLayout>;
   }

   let handleOnchange = (e) => {
    setSearch(e.target.value);
   }



  // const recentSearches = [
  //   "Vitamin C Serum",
  //   "Rosemary Hair Oil",
  //   "Lipstick",
  //   "Foundation",
  // ];

  // const trending = [
  //   "Sunscreen SPF 50",
  //   "Cleanser",
  //   "Compact Powder",
  //   "Moisturizer",
  // ];

  const categories = [
    "Skincare",
    "Makeup",
    "Haircare",
    "Fragrance",
    "Bath & Body",
    "Tools & Accessories",
    "Supplements",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <h1>Search Products</h1>
        <p>Find your favourite Skinova beauty essentials.</p>

        <div className={styles.inputBox}>
          <Search size={22} color="#A48499" />

          <input
            type="text"
            placeholder="Search Serum, Sunscreen, Lipstick..."
            value={search}
            onChange={handleOnchange}
          />

          <button>Search</button>
        </div>
      </div>
      {search && 
        <div className={styles.allCartProducts}>
              {products.filter(p => p?.name?.toLowerCase().includes(search.toLowerCase())).map((p) => 
              <div onClick={() => router.push(`/product/${p?._id}`)} className={styles.product} key={p?._id}>
                <div className={styles.productleftdata}>
                  <div className={styles.productimg}>
                    
                    {p?.images?.[0] && <img src={p?.images?.[0].url} alt="" />}
                  </div>
                  <div className={styles.aboutProduct}>
                    <p style={{fontSize:"1.2rem"}}>{p?.name}</p>
                  </div>
                </div>
                <div className={styles.rightarrow}><MoveUpLeft /></div>
              </div>
              )}
        </div>
      }

      {/* <div className={styles.section}>
        <h2>
          <Clock3 size={20} /> Recent Searches
        </h2>

        <div className={styles.tags}>
          {recentSearches.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div> */}

      {/* <div className={styles.section}>
        <h2>
          <TrendingUp size={20} /> Trending Searches
        </h2>

        <div className={styles.tags}>
          {trending.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div> */}

      <div className={styles.section}>
        <h2>Popular Categories</h2>

        <div className={styles.categoryGrid}>
          {categories.map((item, index) => (
            <div onClick={() => router.push(`/category/${item}`)} className={styles.categoryCard} key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}