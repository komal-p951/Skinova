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
        findProductsByCategory();
    },[category]);

  return (
    <DashboardLayout>
        <div className={styles.mainContainer}>
            {products.map((p) => 
                <ProductCard key={p._id} product={p}/>
            )}
        </div>
    </DashboardLayout>
  )
}
