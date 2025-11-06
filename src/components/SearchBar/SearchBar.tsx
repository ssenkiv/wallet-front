'use client';

import { ChangeEvent, InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onSearch?: (value: string) => void;
}

export default function SearchBar({
  placeholder = 'Search...',
  onSearch,
  onChange,
  className = '',
  ...props
}: Readonly<SearchBarProps>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <Search className={styles.icon} size={20} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
