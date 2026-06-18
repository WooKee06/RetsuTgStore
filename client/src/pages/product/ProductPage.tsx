import React, { useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { cartStore, favoriteStore } from "@store";
import { ProductGallery } from "@widgets/product-gallery";
import { ProductCarousel } from "@widgets/product-carousel";
import { Footer } from "@widgets/footer";
import { Button } from "@shared/ui/button";
import { Rating } from "@shared/ui/rating";
import { Price } from "@shared/ui/price";
import { Skeleton } from "@shared/ui/skeleton";
import { ErrorState } from "@shared/ui/error-state";
import { staggerContainer, staggerItem } from "@shared/lib/motion";
import { useProduct, useProducts } from "@api/hooks";
import { formatPrice } from "@shared/lib/utils";
import type { Color, Product } from "@shared/types";
import styles from "./ProductPage.module.scss";

const ProductPage: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(id || "");
  const { data: productsResponse } = useProducts();
  const allProducts: Product[] = productsResponse?.data ?? [];

  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [addedToCart, setAddedToCart] = useState(false);

  const isFavorite = product ? favoriteStore.isFavorite(product.id) : false;

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.categoryId === product.categoryId ||
            p.brandId === product.brandId),
      )
      .slice(0, 6);
  }, [product, allProducts]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleToggleFavorite = useCallback(() => {
    if (product) {
      favoriteStore.toggleFavorite(product);
    }
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product || !selectedSize || !selectedColor) return;
    cartStore.addItem(product, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, selectedSize, selectedColor]);

  const handleBuyNow = useCallback(() => {
    if (!product || !selectedSize || !selectedColor) return;
    cartStore.addItem(product, selectedSize, selectedColor);
    navigate("/cart");
  }, [product, selectedSize, selectedColor, navigate]);

  const handleColorSelect = useCallback((color: Color) => {
    setSelectedColor(color);
  }, []);

  const handleSizeSelect = useCallback((size: string) => {
    setSelectedSize(size);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={handleGoBack}
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className={styles.headerActions}>
            <div className={styles.headerBtnPlaceholder} />
          </div>
        </header>
        <main className={styles.content}>
          <Skeleton width="100%" height="400px" borderRadius={0} />
          <div className={styles.skeletonInfo}>
            <Skeleton width={80} height={14} borderRadius={4} />
            <Skeleton width="70%" height={28} borderRadius={4} />
            <Skeleton width={120} height={18} borderRadius={4} />
            <Skeleton width={100} height={24} borderRadius={4} />
            <Skeleton width="100%" height={60} borderRadius={4} />
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={handleGoBack}
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className={styles.headerActions} />
        </header>
        <main className={styles.content}>
          <ErrorState
            title="Товар не найден"
            description="Товар, который вы ищете, не существует или был удалён."
          />
        </main>
      </div>
    );
  }

  const firstColor = product.colors[0];
  const effectiveColor = selectedColor || firstColor;
  const canAddToCart = selectedSize && effectiveColor;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={handleGoBack} type="button">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className={styles.headerActions}>
          <button
            className={`${styles.favBtn} ${isFavorite ? styles.favActive : ""}`}
            onClick={handleToggleFavorite}
            type="button"
            aria-label={
              isFavorite ? "Убрать из избранного" : "Добавить в избранное"
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <ProductGallery images={product.images} productName={product.name} />

        <motion.div
          className={styles.info}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.brandRow} variants={staggerItem}>
            <span className={styles.brand}>{product.brand}</span>
          </motion.div>

          <motion.h1 className={styles.name} variants={staggerItem}>
            {product.name}
          </motion.h1>

          <motion.div className={styles.ratingRow} variants={staggerItem}>
            <Rating value={product.rating} count={product.reviewCount} />
          </motion.div>

          <motion.div className={styles.priceRow} variants={staggerItem}>
            <Price
              price={product.price}
              oldPrice={product.oldPrice}
              size="lg"
            />
          </motion.div>

          <motion.p className={styles.description} variants={staggerItem}>
            {product.description}
          </motion.p>

          {product.colors.length > 0 && (
            <motion.div className={styles.section} variants={staggerItem}>
              <h3 className={styles.sectionTitle}>
                Цвет
                {effectiveColor && (
                  <span className={styles.sectionValue}>
                    {effectiveColor.name}
                  </span>
                )}
              </h3>
              <div className={styles.colorOptions}>
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    className={`${styles.colorSwatch} ${effectiveColor?.hex === color.hex ? styles.colorActive : ""}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorSelect(color)}
                    type="button"
                    aria-label={`Выбрать цвет: ${color.name}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {product.sizes.length > 0 && (
            <motion.div className={styles.section} variants={staggerItem}>
              <h3 className={styles.sectionTitle}>Размер</h3>
              <div className={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeOption} ${selectedSize === size ? styles.sizeActive : ""}`}
                    onClick={() => handleSizeSelect(size)}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {similarProducts.length > 0 && (
          <ProductCarousel
            title="Вам может понравиться"
            products={similarProducts}
          />
        )}

        <Footer />
      </main>

      <div className={styles.bottomBar}>
        <div className={styles.bottomBarInner}>
          <div className={styles.bottomPrice}>
            <span className={styles.bottomPriceLabel}>Итого</span>
            <span className={styles.bottomPriceValue}>
              {formatPrice(product.price)}
            </span>
          </div>
          <div className={styles.bottomActions}>
            <Button
              variant="gold"
              fullWidth
              onClick={handleAddToCart}
              disabled={!canAddToCart || addedToCart}
              loading={addedToCart}
              icon={
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              }
            >
              {addedToCart ? "Добавлено" : ""}
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={handleBuyNow}
              disabled={!canAddToCart}
              icon={
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              }
            >
              {""}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductPage;
