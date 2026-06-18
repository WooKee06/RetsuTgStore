import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@widgets/header";
import { BottomNav } from "@widgets/bottom-nav";
import { ProductCarousel } from "@widgets/product-carousel";
import { Footer } from "@widgets/footer";
import { Skeleton } from "@shared/ui/skeleton";
import { staggerContainer, staggerItem } from "@shared/lib/motion";
import {
  useNewProducts,
  useFeaturedProducts,
  useSaleProducts,
  useTrendingProducts,
  useBrands,
} from "@api/hooks";
import styles from "./HomePage.module.scss";

function BannerSkeleton() {
  return (
    <div className={styles.bannerSkeleton}>
      <Skeleton width="100%" height="220px" borderRadius={16} />
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className={styles.categorySkeleton}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.categoryItemSkeleton}>
          <Skeleton width={56} height={56} borderRadius={28} />
          <Skeleton width={40} height={12} borderRadius={4} />
        </div>
      ))}
    </div>
  );
}

function CarouselSkeleton() {
  return (
    <div className={styles.carouselSkeleton}>
      <div className={styles.carouselHeader}>
        <Skeleton width={120} height={20} borderRadius={4} />
      </div>
      <div className={styles.carouselScroll}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.carouselItemSkeleton}>
            <Skeleton width={160} height={213} borderRadius={12} />
            <Skeleton width={120} height={12} borderRadius={4} />
            <Skeleton width={80} height={12} borderRadius={4} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandSkeleton() {
  return (
    <div className={styles.brandSkeleton}>
      <Skeleton width={140} height={20} borderRadius={4} />
      <div className={styles.brandScroll}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.brandItemSkeleton}>
            <Skeleton width={80} height={48} borderRadius={8} />
            <Skeleton width={60} height={12} borderRadius={4} />
          </div>
        ))}
      </div>
    </div>
  );
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const { data: newProducts = [], isLoading: newLoading } = useNewProducts();
  const { data: featuredProducts = [], isLoading: featuredLoading } =
    useFeaturedProducts();
  const { data: saleProducts = [], isLoading: saleLoading } = useSaleProducts();
  const { data: trendingProducts = [], isLoading: trendingLoading } =
    useTrendingProducts();

  const handleSearchFocus = useCallback(() => {
    navigate("/search");
  }, [navigate]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={styles.sections}
        >
          <motion.section variants={staggerItem}>
            {newLoading ? (
              <CarouselSkeleton />
            ) : (
              <ProductCarousel
                title="New Collection"
                products={newProducts}
                viewAllLink="/catalog?sort=newest"
              />
            )}
          </motion.section>

          <motion.section variants={staggerItem}>
            {featuredLoading ? (
              <CarouselSkeleton />
            ) : (
              <ProductCarousel
                title="Popular"
                products={featuredProducts}
                viewAllLink="/catalog?sort=popular"
              />
            )}
          </motion.section>

          <motion.section variants={staggerItem}>
            {saleLoading ? (
              <CarouselSkeleton />
            ) : (
              <ProductCarousel
                title="Sale"
                products={saleProducts}
                viewAllLink="/catalog?filter=sale"
              />
            )}
          </motion.section>

          <motion.section variants={staggerItem}>
            {trendingLoading ? (
              <CarouselSkeleton />
            ) : (
              <ProductCarousel
                title="Trending"
                products={trendingProducts}
                viewAllLink="/catalog?sort=rating"
              />
            )}
          </motion.section>
        </motion.div>

        <Footer />
      </main>
      <BottomNav />
    </div>
  );
};

export default HomePage;
