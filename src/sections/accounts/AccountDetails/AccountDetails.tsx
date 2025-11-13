'use client';

import { LogOut, Settings, User } from 'lucide-react'
import styles from './AccountDetails.module.css'
import Avatar from '@/components/Avatar/Avatar'
import { UserProfile } from '@/view-models/accounts/UserViewModel'

export interface AccountDetailsProps {
  user: UserProfile;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export default function AccountDetails({
  user,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: Readonly<AccountDetailsProps>) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          size="lg"
          fallback={user.name.charAt(0)}
        />
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{user.name}</h3>
          <p className={styles.userEmail}>{user.email}</p>
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
