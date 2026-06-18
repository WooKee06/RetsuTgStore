import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { favoriteStore } from "@store";
import { Badge } from "@shared/ui/badge";
import { Price } from "@shared/ui/price";
import { Rating } from "@shared/ui/rating";
import { cn } from "@shared/lib/utils";
import { cardHover, cardTap } from "@shared/lib/motion";
import type { Product } from "@shared/types";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
  className?: string;
}

const badgeVariantMap: Record<
  string,
  "gold" | "new" | "sale" | "hot" | "trending" | "limited" | "bestseller"
> = {
  NEW: "new",
  SALE: "sale",
  LIMITED: "limited",
  BESTSELLER: "bestseller",
  HOT: "hot",
  TRENDING: "trending",
};

export const ProductCard: React.FC<ProductCardProps> = observer(
  ({ product, layout = "grid", className }) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    const isFavorite = favoriteStore.isFavorite(product.id);

    const handleCardClick = () => {
      navigate(`/product/${product.id}`);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      favoriteStore.toggleFavorite(product);
    };

    const firstBadge = product.badges?.[0];

    if (layout === "list") {
      return (
        <motion.div
          className={cn(styles.card, styles.list, className)}
          onClick={handleCardClick}
          whileTap={cardTap}
          layout
        >
          <div className={styles.listImageWrap}>
            <img
              src={product.images[0]}
              alt={product.name}
              className={styles.listImage}
              loading="lazy"
            />
            {firstBadge && (
              <span className={styles.listBadge}>
                <Badge variant={badgeVariantMap[firstBadge] || "gold"}>
                  {firstBadge}
                </Badge>
              </span>
            )}
          </div>
          <div className={styles.listContent}>
            <span className={styles.brand}>{product.brand} </span>
            <h3 className={styles.name}>{product.name}</h3>
            <Rating
              value={product.rating}
              count={product.reviewCount}
              size="sm"
            />
            <Price
              price={product.price}
              oldPrice={product.oldPrice}
              size="md"
            />
          </div>
          <button
            className={cn(styles.heartBtn, styles.listHeart)}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              viewBox="0 0 24 24"
              className={cn(styles.heartIcon, isFavorite && styles.heartFilled)}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </motion.div>
      );
    }

    return (
      <motion.div
        className={cn(styles.card, styles.grid, className)}
        onClick={handleCardClick}
        whileHover={cardHover}
        whileTap={cardTap}
        layout
      >
        <div className={styles.imageWrap}>
          {!imageLoaded && <div className={styles.imagePlaceholder} />}
          <img
            src={product.images[0]}
            alt={product.name}
            className={cn(styles.image, imageLoaded && styles.imageLoaded)}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          <button
            className={styles.heartBtn}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              viewBox="0 0 24 24"
              className={cn(styles.heartIcon, isFavorite && styles.heartFilled)}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>
            {product.name.length >= 2
              ? product.name.slice(0, 10)
              : product.name}
          </h3>

          <p className={styles.description}>
            {product.description.slice(0, 30) + "..."}
          </p>
          <Price price={product.price} oldPrice={product.oldPrice} size="md" />
        </div>
      </motion.div>
    );
  },
);
