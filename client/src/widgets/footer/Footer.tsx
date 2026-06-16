import React from 'react';
import { cn } from '@shared/lib/utils';
import styles from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Terms', href: '#terms' },
  { label: 'Privacy', href: '#privacy' },
];

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(styles.footer, className)}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>RETSU</h2>
          <p className={styles.tagline}>Premium Fashion Since 2024</p>
        </div>

        <nav className={styles.links}>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.socials}>
          <a href="#instagram" className={styles.socialLink} aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="#twitter" className={styles.socialLink} aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733-16z" />
              <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
            </svg>
          </a>
          <a href="#facebook" className={styles.socialLink} aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>

        <div className={styles.divider} />

        <p className={styles.copyright}>
          &copy; 2024 RETSU. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
