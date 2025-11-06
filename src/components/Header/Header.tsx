'use client';

import { Bell } from 'lucide-react';
import SearchBar from '@/components/SearchBar/SearchBar';
import AvatarWithDetails from '@/sections/accounts/AvatarWithDetails';
import Badge from '@/components/Badge/Badge';
import styles from './Header.module.css';

export interface HeaderProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  accountType?: string;
  notificationCount?: number;
  language?: string;
  onSearch?: (value: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSecurityClick?: () => void;
  onBillingClick?: () => void;
  onLogoutClick?: () => void;
  onLanguageClick?: () => void;
}

export default function Header({
  userName = 'User',
  userEmail = 'user@nerdypay.com',
  userAvatar,
  accountType = 'Basic',
  notificationCount = 0,
  language = 'EN',
  onSearch,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onSecurityClick,
  onBillingClick,
  onLogoutClick,
  onLanguageClick,
}: Readonly<HeaderProps>) {
  return (
    <header className={styles.header}>
      <div className={styles.searchWrapper}>
        <SearchBar onSearch={onSearch} placeholder="Search" />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.languageButton}
          onClick={onLanguageClick}
          aria-label="Change language"
        >
          {language}
        </button>

        <button
          className={styles.notificationButton}
          onClick={onNotificationClick}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {notificationCount > 0 && (
              <Badge variant={'number'}>{notificationCount}</Badge>
          )}
        </button>

        <div className={styles.avatarWrapper}>
          <AvatarWithDetails
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
            accountType={accountType}
            size="md"
            onProfileClick={onProfileClick}
            onSettingsClick={onSettingsClick}
            onSecurityClick={onSecurityClick}
            onBillingClick={onBillingClick}
            onLogoutClick={onLogoutClick}
          />
        </div>
      </div>
    </header>
  );
}
