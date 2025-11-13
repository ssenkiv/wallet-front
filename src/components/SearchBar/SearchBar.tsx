'use client';

import { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export default function SearchBar({
  placeholder = 'Search...',
  className = '',
  ...props
}: Readonly<SearchBarProps>) {

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <Search className={styles.icon} size={20} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
