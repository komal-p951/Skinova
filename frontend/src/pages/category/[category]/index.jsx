import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from './styles.module.css';
import { clientServer } from '@/index';
import ProductCard from '@/components/ProductCard';

export default function index() {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const {category} = router.query;

    const findProductsByCategory = async() => {
        try {
            const res = await clientServer.get(`/category/${category}`);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (!router.isReady || !category) return;
        findProductsByCategory();
    },[category]);

  return (
    <DashboardLayout>
        {products.length < 1 && <div className={styles.mainContainer}>Product Not Found</div>}
        <div className={styles.mainContainer}>
            {products.length > 0 && products.map((p) => 
                <ProductCard key={p._id} product={p}/>
            )}
        </div>
    </DashboardLayout>
  )
}
