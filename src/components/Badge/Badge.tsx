import { HTMLAttributes, ReactNode } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  variant?: 'dot' | 'number';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  show?: boolean;
}

export default function Badge({
  children,
  variant = 'dot',
  position = 'top-right',
  show = true,
  className = '',
  ...props
}: Readonly<BadgeProps>) {
  if (!show) return null;

  const classes = [
    styles.badge,
    styles[variant],
    styles[position],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {variant === 'number' && children}
    </span>
  );
}
