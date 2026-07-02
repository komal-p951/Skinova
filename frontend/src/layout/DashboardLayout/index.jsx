import React from 'react'
import Navbar from '@/components/Navbar/Navbar.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import styles from "./styles.module.css";

export default function DashboardLayout({children}) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.navDiv}><Navbar/></div>
      <div className={styles.midDiv}>{children}</div>
      <div className={styles.footerDiv}><Footer/></div>
    </div>
  )
}
