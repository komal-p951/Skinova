import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import styles from "./styles.module.css";
import Image from "next/image";
import Slider from "@/components/slider/slider";
import ProductCard from "@/components/ProductCard";
import { clientServer } from "@/index";


export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const product = async() => {
      const products = await clientServer.get("/");
      setProducts(products.data);
      console.log(products.data);
    }

    product();
  },[]);


  return (
    <DashboardLayout>
      <Slider/>
      {/* <div className={styles.suggested_products}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div> */}
    </DashboardLayout>
  );
}
