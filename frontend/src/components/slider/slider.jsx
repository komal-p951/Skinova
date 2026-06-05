import React from "react";
import styles from "./styles.module.css";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
function Slider() {
  return (
    <>
      <div className={styles.trending_products}>
        <Swiper
          // modules={[Autoplay]}
          loop={true}
          className={styles.swiper}
          spaceBetween={20}
          grabCursor={true}
          speed={850}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            920: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <div className={styles.sliderimg}>
              <img
                src="/herobanerimages/image1.png"
                loading="eager"
                alt="slideimg"
              ></img>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.sliderimg}>
              <img
                src="/herobanerimages/image2.png"
                loading="eager"
                alt="slideimg"
              ></img>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            {" "}
            <div className={styles.sliderimg}>
              <img
                src="/herobanerimages/image3.png"
                loading="eager"
                alt="slideimg"
              ></img>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            {" "}
            <div className={styles.sliderimg}>
              <img
                src="/herobanerimages/image4.png"
                loading="eager"
                alt="slideimg"
              ></img>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            {" "}
            <div className={styles.sliderimg}>
              <img
                src="/herobanerimages/image5.png"
                loading="eager"
                alt="slideimg"
              ></img>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.sliderimg}>
              <img
                src="/herobanerimages/image6.png"
                loading="eager"
                alt="slideimg"
              ></img>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            {" "}
            <div className={styles.sliderimg}>
              <img
                src="/herobanerimages/image7.png"
                loading="eager"
                alt="slideimg"
              ></img>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className={styles.sliderimg}>
              <img
                src="/herobanerimages/image8.png"
                loading="eager"
                alt="slideimg"
              ></img>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default Slider;
