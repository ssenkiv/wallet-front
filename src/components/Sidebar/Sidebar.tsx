'use client';

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Wallet } from 'lucide-react'
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
  {id: 'wallets', icon: <Wallet size={20}/>, label: 'Wallets', href: '/wallets'}
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
      </Link>
    );
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles.topSection}>
        {topNavItems.map(renderNavItem)}
      </div>
    </nav>
  );
}
