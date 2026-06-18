import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { cartStore } from '@store';
import { Header } from '@widgets/header';
import { BottomNav } from '@widgets/bottom-nav';
import { CartItem } from '@widgets/cart-item';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { EmptyState } from '@shared/ui/empty-state';
import { staggerContainer, staggerItem } from '@shared/lib/motion';
import { formatPrice } from '@shared/lib/utils';
import styles from './CartPage.module.scss';

const bagIcon = (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CartPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const cartItems = cartStore.items;
  const totalItems = cartStore.totalItems;

  const subtotal = cartStore.totalPrice;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const handleBrowse = useCallback(() => {
    navigate('/catalog');
  }, [navigate]);

  const handleApplyPromo = useCallback(() => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  }, [promoCode]);

  const handleCheckout = useCallback(() => {
    // TODO: implement checkout flow
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <div className={styles.titleRow}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Корзина
          </motion.h1>
          {totalItems > 0 && (
            <motion.span
              className={styles.count}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {totalItems} {totalItems === 1 ? 'товар' : 'товаров'}
            </motion.span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            className={styles.emptyWrap}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <EmptyState
              icon={bagIcon}
              title="Ваша корзина пуста"
              description="Похоже, вы ещё ничего не добавили. Начните изучать нашу коллекцию."
              action={
                <Button variant="gold" onClick={handleBrowse}>
                  Смотреть коллекцию
                </Button>
              }
            />
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={styles.body}
          >
            <motion.div className={styles.items} variants={staggerItem}>
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <CartItem key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}`} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div className={styles.summary} variants={staggerItem}>
              <div className={styles.promoCode}>
                <Input
                  placeholder="Промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={styles.promoInput}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleApplyPromo}
                  disabled={!promoCode.trim() || promoApplied}
                >
                  {promoApplied ? 'Применён' : 'Применить'}
                </Button>
              </div>

              {promoApplied && (
                <motion.div
                  className={styles.promoSuccess}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Скидка 10% применена
                </motion.div>
              )}

              <div className={styles.totalLines}>
                <div className={styles.totalLine}>
                  <span className={styles.totalLabel}>Подытог</span>
                  <span className={styles.totalValue}>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className={`${styles.totalLine} ${styles.discountLine}`}>
                    <span className={styles.discountLabel}>Скидка (10%)</span>
                    <span className={styles.discountValue}>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className={styles.totalLine}>
                  <span className={styles.totalLabel}>Доставка</span>
                  <span className={styles.freeShipping}>Бесплатно</span>
                </div>
                <div className={styles.divider} />
                <div className={`${styles.totalLine} ${styles.grandTotal}`}>
                  <span className={styles.grandTotalLabel}>Итого</span>
                  <span className={styles.grandTotalValue}>{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                variant="gold"
                fullWidth
                size="lg"
                onClick={handleCheckout}
              >
                Перейти к оформлению
              </Button>
            </motion.div>
          </motion.div>
        )}
      </main>
      <BottomNav />
    </div>
  );
});

export default CartPage;
