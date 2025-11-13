'use client';

import { useState } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import AccountDetails from '../AccountDetails/AccountDetails'
import styles from './AvatarWithDetails.module.css'
import { UserProfile } from '@/view-models/accounts/UserViewModel'

export interface AvatarWithDetailsProps {
  user: UserProfile;
  size?: 'sm' | 'md' | 'lg';
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export default function AvatarWithDetails({
  user,
  size = 'md',
  onProfileClick,
  onSettingsClick,
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
          src={user.avatar}
          alt={user.name}
          size={size}
          fallback={user.name.charAt(0)}
          className={styles.avatar}
        />
      </div>

      {isHovered && (
        <div className={styles.dropdown}>
          <AccountDetails
            user={user}
            onProfileClick={onProfileClick}
            onSettingsClick={onSettingsClick}
            onLogoutClick={onLogoutClick}
          />
        </div>
      )}
    </div>
  );
}
