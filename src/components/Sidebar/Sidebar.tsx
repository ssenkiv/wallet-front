'use client';

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowUpDownIcon,
  BarChart3,
  CreditCard,
  Home,
  Settings as SettingsIcon,
  User,
  Wallet,
} from 'lucide-react'
import Badge from '@/components/Badge/Badge'
import styles from './Sidebar.module.css'

interface NavItem {
  id: string;
  icon: ReactNode;
  label: string;
  badge?: number;
  href: string;
}

const topNavItems: NavItem[] = [
  { id: 'accounts', icon: <Home size={20}/>, label: 'Accounts', href: '/accounts' },
  { id: 'wallets', icon: <Wallet size={20} />, label: 'Wallets', badge: 2, href: '/wallets' },
  { id: 'transactions', icon: <ArrowUpDownIcon size={20} />, label: 'Transactions', href: '/transactions' },
  { id: 'payments', icon: <CreditCard size={20} />, label: 'Payments', href: '/payments' },
  { id: 'statistics', icon: <BarChart3 size={20} />, label: 'Statistics', href: '/statistics' }
];

const bottomNavItems: NavItem[] = [
  { id: 'account', icon: <User size={20} />, label: 'Account', href: '/account' },
  { id: 'settings', icon: <SettingsIcon size={20} />, label: 'Settings', href: '/settings' },
];

export interface SidebarProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export default function Sidebar({
  activeItem,
  onItemClick,
}: Readonly<SidebarProps>) {
  const pathname = usePathname();

  const handleClick = (id: string) => {
    onItemClick?.(id);
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = activeItem ? activeItem === item.id : pathname === item.href;

    return (
      <Link
        key={item.id}
        href={item.href}
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
      </Link>
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
