import { HTMLAttributes } from 'react';
import { User } from 'lucide-react';
import styles from './Avatar.module.css';
import Image from 'next/image';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

export default function Avatar({
  src,
  alt = 'User avatar',
  size = 'md',
  fallback,
  className = '',
}: Readonly<AvatarProps>) {
  const classes = [
    styles.avatar,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {src ? (
        <Image src={src} alt={alt} className={styles.image} width={20} height={20} />
      ) : fallback ? (
        <span className={styles.fallback}>{fallback}</span>
      ) : (
        <User className={styles.icon} />
      )}
    </div>
  );
}
