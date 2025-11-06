'use client';

import { User, Settings, Shield, LogOut, CreditCard } from 'lucide-react';
import styles from './AccountDetails.module.css';
import Avatar from '@/components/Avatar/Avatar';

export interface AccountDetailsProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  accountType: string;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSecurityClick?: () => void;
  onBillingClick?: () => void;
  onLogoutClick?: () => void;
}

export default function AccountDetails({
  userName,
  userEmail,
  userAvatar,
  accountType,
  onProfileClick,
  onSettingsClick,
  onSecurityClick,
  onBillingClick,
  onLogoutClick,
}: Readonly<AccountDetailsProps>) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Avatar
          src={userAvatar}
          alt={userName}
          size="lg"
          fallback={userName.charAt(0)}
        />
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{userName}</h3>
          <p className={styles.userEmail}>{userEmail}</p>
          <span className={styles.accountBadge}>{accountType} Account</span>
        </div>
      </div>

      <div className={styles.divider} />

      <nav className={styles.menu}>
        <button
          className={styles.menuItem}
          onClick={onProfileClick}
          aria-label="View profile"
        >
          <User size={20} className={styles.menuIcon} />
          <span>Profile</span>
        </button>

        <button
          className={styles.menuItem}
          onClick={onSettingsClick}
          aria-label="Account settings"
        >
          <Settings size={20} className={styles.menuIcon} />
          <span>Account Settings</span>
        </button>

        <button
          className={styles.menuItem}
          onClick={onSecurityClick}
          aria-label="Security settings"
        >
          <Shield size={20} className={styles.menuIcon} />
          <span>Security</span>
        </button>

        <button
          className={styles.menuItem}
          onClick={onBillingClick}
          aria-label="Billing & payments"
        >
          <CreditCard size={20} className={styles.menuIcon} />
          <span>Billing & Payments</span>
        </button>
      </nav>

      <div className={styles.divider} />

      <button
        className={`${styles.menuItem} ${styles.logoutItem}`}
        onClick={onLogoutClick}
        aria-label="Log out"
      >
        <LogOut size={20} className={styles.menuIcon} />
        <span>Log Out</span>
      </button>
    </div>
  );
}
