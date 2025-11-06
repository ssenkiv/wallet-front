'use client';

import { useState } from 'react';
import Avatar from '@/components/Avatar/Avatar';
import AccountDetails from './AccountDetails';
import styles from './AvatarWithDetails.module.css';

export interface AvatarWithDetailsProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  accountType: string;
  size?: 'sm' | 'md' | 'lg';
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSecurityClick?: () => void;
  onBillingClick?: () => void;
  onLogoutClick?: () => void;
}

export default function AvatarWithDetails({
  userName,
  userEmail,
  userAvatar,
  accountType,
  size = 'md',
  onProfileClick,
  onSettingsClick,
  onSecurityClick,
  onBillingClick,
  onLogoutClick,
}: Readonly<AvatarWithDetailsProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.avatarContainer}>
        <Avatar
          src={userAvatar}
          alt={userName}
          size={size}
          fallback={userName.charAt(0)}
          className={styles.avatar}
        />
      </div>

      {isHovered && (
        <div className={styles.dropdown}>
          <AccountDetails
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
            accountType={accountType}
            onProfileClick={onProfileClick}
            onSettingsClick={onSettingsClick}
            onSecurityClick={onSecurityClick}
            onBillingClick={onBillingClick}
            onLogoutClick={onLogoutClick}
          />
        </div>
      )}
    </div>
  );
}
