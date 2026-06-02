import React from 'react';
import DashboardLayout from '@/layout/DashboardLayout';
import styles from './styles.module.css';
import Image from 'next/image';

export default function Products() {
  return (
      <DashboardLayout>
        <div className={styles.trending_products}>
          <div><Image src="/images/toolsaccessories1.jpg" width={500} height={500}></Image></div>
          <div><Image src="/images/supplements1.jpg" width={100} height={100}></Image></div>
          <div><Image src="/images/makeup1.jpg" width={100} height={100}></Image></div>
          <div><Image src="/images/haircare1.jpg" width={100} height={100}></Image></div>
          <div><Image src="/images/fragrance1.jpg" width={100} height={100}></Image></div>
          <div><Image src="/images/bathbody1.jpg" width={100} height={100}></Image></div>
        </div>
        <div className={styles.suggested_products}>
          
        </div>
      </DashboardLayout>
  )
}
