import React from 'react'
import Navbar from '@/components/Navbar/Navbar.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import styles from "./styles.module.css";

export default function DashboardLayout({children}) {
  return (
    <>
      <Navbar/>
      {children}
      <Footer/>
    </>
  )
}
