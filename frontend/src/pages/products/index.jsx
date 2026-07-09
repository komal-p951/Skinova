import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import styles from "./styles.module.css";
import Image from "next/image";
import Slider from "@/components/slider/slider";
import ProductCard from "@/components/ProductCard";
import { clientServer } from "@/index";
import Loader from "@/components/Loader/Loader";
import { MoveRight } from "lucide-react";
import Router from "next/router";

export default function Products() {
  
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const router = Router;


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


  return (
    <DashboardLayout>
      <div className={styles.homeContainer}>
        <div className={styles.topContainer}>
          <Slider />
        </div>

        <div className={styles.midContainer}>
          <img src="/images/bar.jpeg" alt="barImg" />
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.productContainer}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"2rem",paddingInline:"2rem"}}>
              <p className={styles.center}>Skincare</p>
              <div className={styles.explore}
              onClick={() => router.push(`/category/${"Skincare"}`)}
              >Explore more &nbsp; <MoveRight/></div>
            </div>
            <div className={styles.makeup}>
              {products
                .filter((product) => product.category === "Skincare")
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          
          <div className={styles.productContainer}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"2rem",paddingInline:"2rem"}}>
              <p className={styles.center}>MAKEUP & BEUTY</p>
              <div className={styles.explore} 
              onClick={() => router.push(`/category/${"Makeup"}`)}
              >Explore more &nbsp; <MoveRight/></div>
            </div>
            <div className={styles.makeup}>
              {products
                .filter((product) => product?.category === "Makeup")
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
            </div>
          </div>

          <div className={styles.productContainer}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"2rem",paddingInline:"2rem"}}>
              <p className={styles.center}>Tools & Accessories</p>
              <div className={styles.explore}
              onClick={() => router.push(`/category/${"Tools & Accessories"}`)}
              >Explore more &nbsp; <MoveRight/></div>
            </div>
            <div className={styles.makeup}>
              {products
                .filter((product) => product.category === "Tools & Accessories")
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
            </div>
          </div>

          <div className={styles.productContainer}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"2rem",paddingInline:"2rem"}}>
              <p className={styles.center}>Haircare Essentials</p>
              <div className={styles.explore}
              onClick={() => router.push(`/category/${"Haircare"}`)}
              >Explore more &nbsp; <MoveRight/></div>
            </div>
            <div className={styles.makeup}>
              {products
                .filter((product) => product.category === "Haircare")
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          <div className={styles.productContainer}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"2rem",paddingInline:"2rem"}}>
              <p className={styles.center}>Fragrance</p>
              <div className={styles.explore}
              onClick={() => router.push(`/category/${"Fragrance"}`)}
              >Explore more &nbsp; <MoveRight/></div>
            </div>
            <div className={styles.makeup}>
              {products
                .filter((product) => product.category === "Fragrance")
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          <div className={styles.productContainer}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"2rem",paddingInline:"2rem"}}>
              <p className={styles.center}>Bath & Body</p>
              <div className={styles.explore}
              onClick={() => router.push(`/category/${"Bath & Body"}`)}
              >Explore more &nbsp; <MoveRight/></div>
            </div>
            <div className={styles.makeup}>
              {products
                .filter((product) => product.category === "Bath & Body")
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          <div className={styles.productContainer}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"2rem",paddingInline:"1rem"}}>
              <p className={styles.center}>Supplements</p>
              <div className={styles.explore}
              onClick={() => router.push(`/category/${"Supplements"}`)}
              >Explore more &nbsp; <MoveRight/></div>
            </div>
            <div className={styles.makeup}>
              {products
                .filter((product) => product.category === "Supplements")
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
