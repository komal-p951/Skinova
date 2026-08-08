import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import styles from "./styles.module.css";
import Slider from "@/components/slider/slider";
import ProductCard from "@/components/ProductCard";
import { clientServer } from "@/index";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";

let categories = ["Skincare", "Bath & Body", "Makeup", "Tools & Accessories", "Haircare", "Fragrance", "Supplements"];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);

   const product = async () => {
      
      try {
        const products = await clientServer.get("/");
        setProducts(products.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
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

  return (
    <DashboardLayout>
      <div className={styles.homeContainer}>
        <div className={styles.topContainer}>
          <Slider />
        </div>

        <div className={styles.midContainer}>
          <img src="/herobanerimages/skinova_banner.png" alt="barImg" />
        </div>
        <div className={styles.bottomContainer}>
          {categories.map((category,idx) => 
            <div className={styles.productContainer} key={idx}>
              <div className={styles.makeup}>
                {products
                  .filter((product) => product.category === category)
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

{/* <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"2rem",paddingInline:"2rem"}}>
              <p className={styles.center}>Skincare</p>
              <div className={styles.explore}
              onClick={() => router.push(`/category/${"Skincare"}`)}
              >Explore more &nbsp; <MoveRight/></div>
            </div> */}