import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import { userStore, favoriteStore, cartStore } from '@store';
import { Header } from '@widgets/header';
import { BottomNav } from '@widgets/bottom-nav';
import { Footer } from '@widgets/footer';
import { Avatar } from '@shared/ui/avatar';
import { Button } from '@shared/ui/button';
import { staggerContainer, staggerItem } from '@shared/lib/motion';
import styles from './ProfilePage.module.scss';

const OrdersIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="9" y1="6" x2="15" y2="6" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="12" y2="14" />
  </svg>
);

const HeartIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SettingsIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const HelpIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const ChevronIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const LogoutIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, value, onClick }) => (
  <motion.button
    className={styles.menuItem}
    onClick={onClick}
    variants={staggerItem}
    whileTap={{ scale: 0.97 }}
  >
    <span className={styles.menuIcon}>{icon}</span>
    <span className={styles.menuLabel}>{label}</span>
    {value && <span className={styles.menuValue}>{value}</span>}
    <ChevronIcon />
  </motion.button>
);

export const ProfilePage: React.FC = observer(() => {
  const navigate = useNavigate();
  const user = userStore.user;
  const favoriteCount = favoriteStore.count;
  const cartTotalItems = cartStore.totalItems;

  const handleSignOut = (): void => {
    userStore.clearUser();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.content}>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Avatar src={user.avatar} name={user.name} size="lg" />
          <h1 className={styles.name}>{user.name}</h1>
          {user.email && <p className={styles.email}>{user.email}</p>}
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className={styles.stat}>
            <span className={styles.statValue}>{user.ordersCount}</span>
            <span className={styles.statLabel}>Orders</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{favoriteCount}</span>
            <span className={styles.statLabel}>Favorites</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{cartTotalItems}</span>
            <span className={styles.statLabel}>In Bag</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.menu}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <MenuItem
            icon={<OrdersIcon />}
            label="My Orders"
            onClick={() => navigate('/orders')}
          />
          <MenuItem
            icon={<HeartIcon />}
            label="Favorites"
            value={`${favoriteCount}`}
            onClick={() => navigate('/favorites')}
          />
          <MenuItem
            icon={<SettingsIcon />}
            label="Settings"
            onClick={() => navigate('/settings')}
          />
          <MenuItem
            icon={<HelpIcon />}
            label="Help & Support"
            onClick={() => navigate('/help')}
          />
          <MenuItem
            icon={<InfoIcon />}
            label="About"
            onClick={() => navigate('/about')}
          />
        </motion.div>

        <motion.div
          className={styles.logoutWrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="ghost"
            fullWidth
            className={styles.logout}
            onClick={handleSignOut}
            icon={<LogoutIcon />}
          >
            Sign Out
          </Button>
        </motion.div>

        <Footer />
      </main>
      <BottomNav />
    </div>
  );
});
