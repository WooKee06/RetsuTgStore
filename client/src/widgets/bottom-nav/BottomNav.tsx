import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { cartStore, favoriteStore } from "@store";
import { cn } from "@shared/lib/utils";
import styles from "./BottomNav.module.scss";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    path: "/",
    label: "Home",
    icon: (
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.92309 27.1254C6.40151 27.1254 5.16797 25.8595 5.16797 24.2966V12.9274C5.16797 12.0684 5.54901 11.2546 6.2013 10.7186L13.7795 4.49536C14.2637 4.0944 14.8726 3.875 15.5013 3.875C16.13 3.875 16.7389 4.0944 17.2231 4.49536L24.8 10.7186C25.4536 11.2546 25.8346 12.0684 25.8346 12.9274V24.2966C25.8346 25.8595 24.6011 27.1254 23.0795 27.1254H7.92309Z"
          stroke="white"
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.2734 27.125V20.0208C12.2734 19.3357 12.5456 18.6786 13.0301 18.1941C13.5145 17.7097 14.1716 17.4375 14.8568 17.4375H16.1484C16.8336 17.4375 17.4907 17.7097 17.9751 18.1941C18.4596 18.6786 18.7318 19.3357 18.7318 20.0208V27.125"
          stroke="white"
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    path: "/catalog",
    label: "Catalog",
    icon: (
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="1">
          <path
            d="M21.6354 3.22925L22.3071 4.818L23.8958 5.48966L22.3071 6.16133L21.6354 7.75008L20.9637 6.16133L19.375 5.48966L20.9637 4.818L21.6354 3.22925Z"
            stroke="white"
            stroke-width="1.5"
          />
          <path
            d="M20.4121 20.4135L27.2618 27.2632M23.2279 14.2083C23.0752 16.5504 22.0741 18.7564 20.4121 20.4135C19.3049 21.5206 17.9458 22.3428 16.4513 22.8097C14.9567 23.2766 13.3713 23.3743 11.8308 23.0944C10.2903 22.8145 8.84053 22.1654 7.60576 21.2026C6.37098 20.2398 5.38797 18.9921 4.74092 17.5663C4.09386 16.1405 3.80204 14.5791 3.89046 13.0159C3.97887 11.4526 4.44488 9.9341 5.24858 8.59036C6.05227 7.24661 7.1697 6.1177 8.50515 5.3003C9.8406 4.4829 11.3543 4.00137 12.9166 3.89697"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="square"
          />
        </g>
      </svg>
    ),
  },
  {
    path: "/favorites",
    label: "Favorites",
    icon: (
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.26303 5.7142C5.12016 6.69328 3.55078 9.02345 3.55078 11.8018C3.55078 14.6396 4.71328 16.8277 6.37695 18.7032C7.74999 20.248 9.41107 21.5294 11.0308 22.7771C11.4166 23.0742 11.7976 23.3704 12.1739 23.6658C12.8534 24.2018 13.4592 24.6707 14.0443 25.013C14.6294 25.3553 15.0983 25.5103 15.4987 25.5103C15.8991 25.5103 16.3693 25.3553 16.9531 25.013C17.5382 24.6707 18.144 24.2018 18.8235 23.6658C19.1998 23.3696 19.5808 23.0738 19.9666 22.7784C21.5863 21.5281 23.2474 20.248 24.6204 18.7032C26.2854 16.8277 27.4466 14.6396 27.4466 11.8018C27.4466 9.02474 25.8772 6.69328 23.7344 5.7142C21.6522 4.76224 18.8544 5.01412 16.1962 7.77699C16.1058 7.87075 15.9975 7.94532 15.8776 7.99626C15.7578 8.0472 15.6289 8.07345 15.4987 8.07345C15.3685 8.07345 15.2396 8.0472 15.1198 7.99626C14.9999 7.94532 14.8916 7.87075 14.8012 7.77699C12.1429 5.01412 9.3452 4.76224 7.26303 5.7142ZM15.4987 5.7607C12.5124 3.08695 9.16824 2.71237 6.45703 3.95107C3.59728 5.26212 1.61328 8.30012 1.61328 11.8031C1.61328 15.2454 3.04703 17.8727 4.92899 19.991C6.43507 21.6869 8.27828 23.1065 9.90707 24.3594C10.2774 24.6436 10.633 24.92 10.974 25.1887C11.6366 25.7105 12.347 26.2659 13.0665 26.687C13.7859 27.1081 14.6074 27.4491 15.4987 27.4491C16.3899 27.4491 17.2114 27.1068 17.9309 26.687C18.6517 26.2659 19.3608 25.7105 20.0234 25.1887C20.3644 24.92 20.72 24.6436 21.0903 24.3594C22.7178 23.1065 24.5623 21.6857 26.0684 19.991C27.9504 17.8727 29.3841 15.2454 29.3841 11.8031C29.3841 8.30012 27.4014 5.26212 24.5404 3.95366C21.8292 2.71366 18.485 3.08824 15.4987 5.7607Z"
          fill="white"
          fill-opacity="1"
        />
      </svg>
    ),
  },
  {
    path: "/cart",
    label: "Cart",
    icon: (
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.98912 21.2544C3.88087 16.8214 3.32674 14.6062 4.49054 13.1156C5.65433 11.625 7.93929 11.625 12.5079 11.625H18.4883C23.0582 11.625 25.3419 11.625 26.5057 13.1156C27.6695 14.6062 27.1154 16.8227 26.0071 21.2544C25.3019 24.0741 24.9505 25.4833 23.8991 26.3048C22.8477 27.125 21.3946 27.125 18.4883 27.125H12.5079C9.60166 27.125 8.14854 27.125 7.09712 26.3048C6.0457 25.4833 5.69308 24.0741 4.98912 21.2544Z"
          stroke="white"
          stroke-opacity="1"
          stroke-width="1.5"
        />
        <path
          d="M25.1875 12.2712L24.2704 8.90637C23.9165 7.60824 23.7395 6.95983 23.3766 6.47028C23.0147 5.98393 22.5232 5.60926 21.9583 5.38916C21.39 5.16699 20.7183 5.16699 19.375 5.16699M5.8125 12.2712L6.72958 8.90637C7.0835 7.60824 7.26046 6.95983 7.62342 6.47028C7.98531 5.98393 8.47681 5.60926 9.04167 5.38916C9.61 5.16699 10.2817 5.16699 11.625 5.16699"
          stroke="white"
          stroke-opacity="1"
          stroke-width="1.5"
        />
        <path
          d="M11.625 5.16667C11.625 4.8241 11.7611 4.49555 12.0033 4.25332C12.2456 4.01109 12.5741 3.875 12.9167 3.875H18.0833C18.4259 3.875 18.7544 4.01109 18.9967 4.25332C19.2389 4.49555 19.375 4.8241 19.375 5.16667C19.375 5.50924 19.2389 5.83778 18.9967 6.08001C18.7544 6.32225 18.4259 6.45833 18.0833 6.45833H12.9167C12.5741 6.45833 12.2456 6.32225 12.0033 6.08001C11.7611 5.83778 11.625 5.50924 11.625 5.16667Z"
          stroke="white"
          stroke-opacity="1"
          stroke-width="1.5"
        />
      </svg>
    ),
  },
];

export const BottomNav: React.FC = observer(() => {
  const cartCount = cartStore.totalItems;
  const favCount = favoriteStore.count;
  const user = false;
  const location = useLocation();

  const badges: Record<string, number> = {
    "/favorites": favCount,
    "/cart": cartCount,
  };

  const activeIndex = navItems.findIndex((item) => {
    if (item.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.path);
  });

  const indicatorLeft = `${(activeIndex / navItems.length) * 100}%`;
  const indicatorWidth = `${100 / navItems.length}%`;

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <motion.div
            className={styles.indicator}
            animate={{ left: indicatorLeft, width: 40 }}
            transition={{ type: "spring", duration: 2 }}
          />
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(styles.link, isActive && styles.active)
              }
            >
              {() => (
                <motion.div
                  className={styles.linkInner}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <div className={styles.iconWrap}>
                    {item.icon}
                    {badges[item.path] !== undefined &&
                      badges[item.path] > 0 && (
                        <span className={styles.badge}>
                          {badges[item.path] > 99 ? "99+" : badges[item.path]}
                        </span>
                      )}
                  </div>
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <button className={styles.profilebtn}>
        {!user ? (
          <svg
            width="30"
            height="30"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="1">
              <path
                d="M5.16602 23.2502C5.16602 21.8799 5.71036 20.5657 6.6793 19.5968C7.64824 18.6278 8.9624 18.0835 10.3327 18.0835H20.666C22.0363 18.0835 23.3505 18.6278 24.3194 19.5968C25.2883 20.5657 25.8327 21.8799 25.8327 23.2502C25.8327 23.9353 25.5605 24.5924 25.076 25.0769C24.5916 25.5613 23.9345 25.8335 23.2494 25.8335H7.74935C7.06421 25.8335 6.40713 25.5613 5.92266 25.0769C5.43819 24.5924 5.16602 23.9353 5.16602 23.2502Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M15.5 12.9167C17.6401 12.9167 19.375 11.1819 19.375 9.04175C19.375 6.90164 17.6401 5.16675 15.5 5.16675C13.3599 5.16675 11.625 6.90164 11.625 9.04175C11.625 11.1819 13.3599 12.9167 15.5 12.9167Z"
                stroke="white"
                stroke-width="1.5"
              />
            </g>
          </svg>
        ) : (
          <img src="https://i.pinimg.com/736x/ce/35/5f/ce355f590d723d4475539f7dde1935f3.jpg" />
        )}
      </button>
    </div>
  );
});
