'use client';

import SearchBar from '@/components/SearchBar/SearchBar'
import AvatarWithDetails from '@/sections/accounts/AvatarWithDetails/AvatarWithDetails'
import styles from './Header.module.css'
import { UserProfile } from '@/view-models/accounts/UserViewModel'

export interface HeaderProps {
  user?: UserProfile;
  notificationCount?: number;
  language?: string;
  onSearch?: (value: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  onLanguageClick?: () => void;
}

export default function Header({
  user = { name: 'User', email: 'user@nerdypay.com', accountType: 'Basic' },
  language = 'EN',
  onSearch,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  onLanguageClick,
}: Readonly<HeaderProps>) {
  return (
    <header className={styles.header}>
      <div className={styles.searchWrapper}>
        <SearchBar
          placeholder="Search"
          onChange={onSearch ? (e) => onSearch(e.target.value) : undefined}
        />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.languageButton}
          onClick={onLanguageClick}
          aria-label="Change language"
        >
          {language}
        </button>
        <div className={styles.avatarWrapper}>
          <AvatarWithDetails
            user={user}
            size="md"
            onProfileClick={onProfileClick}
            onSettingsClick={onSettingsClick}
            onLogoutClick={onLogoutClick}
          />
        </div>
      </div>
    </header>
  );
}
