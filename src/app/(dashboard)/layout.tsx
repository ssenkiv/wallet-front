'use client';

import { ReactNode } from 'react';
import Logo from '@/components/Logo/Logo';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './layout.module.css';

import useAccountViewModel from '@/hooks/accounts/useAccountViewModel';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const {data, isLoading, error} = useAccountViewModel(1);

  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Something went wrong 😢</p>;
  if (!data) return <p>No user found.</p>;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebarWrapper}>
        <div className={styles.logoContainer}>
          <Logo/>
        </div>
        <Sidebar activeItem="overview" />
      </aside>

      <div className={styles.mainArea}>
        <Header
          userName={data.fullName}
          userEmail={data.email}
          userAvatar={data.avatarUrl}
          accountType="Premium"
          notificationCount={2}
          onProfileClick={() => console.log('Profile clicked')}
          onSettingsClick={() => console.log('Settings clicked')}
          onSecurityClick={() => console.log('Security clicked')}
          onBillingClick={() => console.log('Billing clicked')}
          onLogoutClick={() => console.log('Logout clicked')}
        />

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
