import React from 'react'
import styles from "./styles.module.css"
import "swiper/css";
import { Autoplay } from 'swiper/modules';


import { Swiper , SwiperSlide } from 'swiper/react';
function Slider() {
  return (
    <>
      <div className={styles.trending_products}>
        <Swiper 
          // modules={[Autoplay]}
          loop={true}
          speed={850}
          autoplay={
            {
              delay:2000,
              disableOnInteraction:false,
              pauseOnMouseEnter:false,
            }
          }
        >

          <SwiperSlide><div className={styles.sliderimg}>
          <div className={styles.aboutProduct}> 
            <div className={styles.first}>Glow Naturally</div>
            <div className={styles.second}>Skinova Vitamin C Serum</div>
            <div className={styles.third} >Best Seller Serum</div>
            <div>Deep hydration and skin brightening<br /> for a fresh, radiant look.</div>
          </div>
          <img
            src="/images/skincare4.jpg"
            loading="eager"
            alt="slideimg"
          ></img>
          </div></SwiperSlide>

          <SwiperSlide><div className={styles.sliderimg}>
          <div>
            <div>NICE PRODUCT</div>
            <div>BEAUTY PRODUCTS</div>
          </div>
          <img
            src="/images/supplements1.jpg"
            loading="eager"
            alt="slideimg"
          ></img>
        </div></SwiperSlide>

          <SwiperSlide> <div className={styles.sliderimg}>
          <div>
            <div>NICE PRODUCT</div>
            <div>BEAUTY PRODUCTS</div>
          </div>
          <img
            src="/images/supplements2.jpg"
            loading="eager"
            alt="slideimg"
          ></img>
        </div></SwiperSlide>

          <SwiperSlide> <div className={styles.sliderimg}>
          <div>
            <div>NICE PRODUCT</div>
            <div>BEAUTY PRODUCTS</div>
          </div>
          <img src="/images/makeup1.jpg" loading="eager" alt="slideimg"></img>
        </div></SwiperSlide>

          <SwiperSlide> <div className={styles.sliderimg}>
          <div>
            <div>NICE PRODUCT</div>
            <div>BEAUTY PRODUCTS</div>
          </div>
          <img src="/images/haircare1.jpg" loading="eager" alt="slideimg"></img>
        </div>
          </SwiperSlide>

          <SwiperSlide><div className={styles.sliderimg}>
          <div>
            <div>NICE PRODUCT</div>
            <div>BEAUTY PRODUCTS</div>
          </div>
          <img
            src="/images/fragrance1.jpg"
            loading="eager"
            alt="slideimg"
          ></img>
          </div></SwiperSlide>

          <SwiperSlide> <div className={styles.sliderimg}>
          <div>
            <div>NICE PRODUCT</div>
            <div>BEAUTY PRODUCTS</div>
          </div>
          <img src="/images/bathbody1.jpg" loading="eager" alt="slideimg"></img>
        </div></SwiperSlide>
        
        </Swiper>
      </div>
    </>
  )
}

export default Slider;
