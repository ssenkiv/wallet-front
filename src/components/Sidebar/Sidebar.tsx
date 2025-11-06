'use client';

import { ReactNode } from 'react';
import {
  Home,
  CreditCard,
  BarChart3,
  User,
  Settings as SettingsIcon,
  Wallet,
  ArrowUpDownIcon,
} from 'lucide-react';
import Badge from '@/components/Badge/Badge';
import styles from './Sidebar.module.css';

interface NavItem {
  id: string;
  icon: ReactNode;
  label: string;
  badge?: number;
  href?: string;
}

const topNavItems: NavItem[] = [
  { id: 'Overview', icon: <Home size={20} />, label: 'Overview' },
  { id: 'Wallets', icon: <Wallet size={20} />, label: 'Wallets', badge: 2 },
  { id: 'Transactions', icon: <ArrowUpDownIcon size={20} />, label: 'Transactions' },
  { id: 'Payments', icon: <CreditCard size={20} />, label: 'Payments' },
  { id: 'Statistics', icon: <BarChart3 size={20} />, label: 'Statistics' }
];

const bottomNavItems: NavItem[] = [
  { id: 'account', icon: <User size={20} />, label: 'Account' },
  { id: 'settings', icon: <SettingsIcon size={20} />, label: 'Settings' },
];

export interface SidebarProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export default function Sidebar({
  activeItem = 'overview',
  onItemClick,
}: Readonly<SidebarProps>) {
  const handleClick = (id: string) => {
    onItemClick?.(id);
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = activeItem === item.id;

    return (
      <button
        key={item.id}
        className={`${styles.navItem} ${isActive ? styles.active : ''}`}
        onClick={() => handleClick(item.id)}
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className={styles.icon}>{item.icon}</span>
        <span className={styles.label}>{item.label}</span>
        {item.badge && item.badge > 0 && (
          <Badge variant="number" position="top-right" className={styles.badge}>
            {item.badge}
          </Badge>
        )}
      </button>
    );
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles.topSection}>
        {topNavItems.map(renderNavItem)}
      </div>

      <div className={styles.bottomSection}>
        {bottomNavItems.map(renderNavItem)}
      </div>
    </nav>
  );
}
