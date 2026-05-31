import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
// import styles from "@/pages";
import {useRouter} from "next/router";
import Navbar from "@/components/Navbar/Navbar";


export default function Home() {
  const router = useRouter();
  return (
   <>
    <div>
      <Navbar/>
    </div>
   </>
  );
}


{/* <a
              className={styles.secondary}
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a> */}