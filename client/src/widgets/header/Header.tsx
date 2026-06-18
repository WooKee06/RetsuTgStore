import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userStore } from "@store";
import { Avatar } from "@shared/ui/avatar";
import styles from "./Header.module.scss";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = observer(({ className }) => {
  const navigate = useNavigate();
  const user = userStore.user;

  return (
    <header className={`${styles.header} ${className || ""}`}>
      <div className={styles.inner}>
        <div className={styles.actions}>
          <button
            className={styles.searchBtn}
            onClick={() => navigate("/search")}
            aria-label="Поиск"
          >
            <svg viewBox="0 0 24 24" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
});
