import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { fadeIn } from '@shared/lib/motion';
import type { Banner } from '@shared/types';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './HeroBanner.module.scss';

interface HeroBannerProps {
  banners: Banner[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ banners }) => {
  if (!banners.length) return null;

  return (
    <motion.div
      className={styles.wrapper}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className={styles.swiper}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className={styles.slide}>
            <div className={styles.slideInner}>
              <img
                src={banner.image}
                alt={banner.title}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h2 className={styles.title}>{banner.title}</h2>
                <p className={styles.subtitle}>{banner.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};
